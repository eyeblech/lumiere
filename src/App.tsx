import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ERAS,
  MILESTONES,
  LUMINARIES,
  CINEMA_MOVEMENTS,
  CANNES_MILESTONES,
  getEraById,
} from './data/cinemaData';
import { CinemaMilestone, EraId, MilestoneCategory } from './data/types';
import { CinemaArtwork } from './components/CinemaArtwork';
import { ProjectionCanvas3D } from './components/ProjectionCanvas3D';
import { Tunnel3DView } from './components/Tunnel3DView';
import { InspectionDossier } from './components/InspectionDossier';
import { LuminariesSection } from './components/LuminariesSection';
import { MovementsSection } from './components/MovementsSection';
import { CannesSection } from './components/CannesSection';
import { OpticalLabModal } from './components/OpticalLabModal';
import {
  Film,
  Aperture,
  Compass,
  Columns,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';

type ActiveSection = 'timeline' | 'movements' | 'cannes' | 'luminaries';

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('timeline');
  const [selectedEraFilter, setSelectedEraFilter] = useState<EraId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'ribbon' | 'tunnel3d' | 'grid'>('ribbon');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredScrubberIndex, setHoveredScrubberIndex] = useState<number | null>(null);
  const [dossierMilestone, setDossierMilestone] = useState<CinemaMilestone | null>(null);
  const [isOpticalLabOpen, setIsOpticalLabOpen] = useState<boolean>(false);

  const ribbonScrollRef = useRef<HTMLDivElement | null>(null);
  const scrubberTrackRef = useRef<HTMLDivElement | null>(null);
  const isScrubbingRef = useRef<boolean>(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  // Filtered milestones based on Era, Category, and Search query
  const filteredMilestones = useMemo(() => {
    return MILESTONES.filter((m) => {
      if (selectedEraFilter !== 'all' && m.eraId !== selectedEraFilter) return false;
      if (selectedCategory === 'underground') {
        if (!m.isUndergroundGem && m.category !== 'underground') return false;
      } else if (selectedCategory !== 'all' && m.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDir = m.director.toLowerCase().includes(q);
        const matchTag = m.primaryTag.toLowerCase().includes(q);
        const matchCast = m.starring.some((s) => s.toLowerCase().includes(q));
        const matchYear = String(m.year).includes(q);
        return matchTitle || matchDir || matchTag || matchCast || matchYear;
      }
      return true;
    });
  }, [selectedEraFilter, selectedCategory, searchQuery]);

  useEffect(() => {
    if (activeIndex >= filteredMilestones.length) {
      setActiveIndex(0);
    }
  }, [filteredMilestones.length, activeIndex]);

  const activeMilestone: CinemaMilestone =
    filteredMilestones[activeIndex] || filteredMilestones[0] || MILESTONES[0];
  const activeEra = getEraById(activeMilestone.eraId);

  const scrollRibbonToMilestone = useCallback((milestoneId: string) => {
    const container = ribbonScrollRef.current;
    const cardEl = cardRefs.current[milestoneId];
    if (container && cardEl) {
      const targetLeft =
        cardEl.offsetLeft - container.clientWidth / 2 + cardEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, []);

  const focusMilestoneAtIndex = useCallback(
    (index: number, openDrawer = false) => {
      if (filteredMilestones.length === 0) return;
      const clamped = Math.max(0, Math.min(filteredMilestones.length - 1, index));
      setActiveIndex(clamped);
      const target = filteredMilestones[clamped];
      if (target) {
        if (viewMode === 'ribbon') {
          requestAnimationFrame(() => scrollRibbonToMilestone(target.id));
        }
        if (openDrawer) {
          setDossierMilestone(target);
        }
      }
    },
    [filteredMilestones, viewMode, scrollRibbonToMilestone]
  );

  // Mouse pointer position -> index on the full-width 1878-2024 bottom scrubber track
  const pickIndexFromClientX = useCallback(
    (clientX: number) => {
      const track = scrubberTrackRef.current;
      if (!track || filteredMilestones.length === 0) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const idx = Math.round(ratio * (filteredMilestones.length - 1));
      focusMilestoneAtIndex(idx);
    },
    [filteredMilestones.length, focusMilestoneAtIndex]
  );

  useEffect(() => {
    const handleWindowMouseUp = () => {
      isScrubbingRef.current = false;
    };
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isScrubbingRef.current) {
        pickIndexFromClientX(e.clientX);
      }
    };
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [pickIndexFromClientX]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.key === 'Escape') {
        setDossierMilestone(null);
        setIsOpticalLabOpen(false);
      } else if (
        e.key === 'ArrowRight' &&
        activeSection === 'timeline' &&
        !dossierMilestone &&
        !isOpticalLabOpen
      ) {
        e.preventDefault();
        focusMilestoneAtIndex(activeIndex + 1);
      } else if (
        e.key === 'ArrowLeft' &&
        activeSection === 'timeline' &&
        !dossierMilestone &&
        !isOpticalLabOpen
      ) {
        e.preventDefault();
        focusMilestoneAtIndex(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, dossierMilestone, isOpticalLabOpen, activeSection, focusMilestoneAtIndex]);

  const handleJumpToMilestone = (milestone: CinemaMilestone) => {
    const idx = MILESTONES.findIndex((m) => m.id === milestone.id);
    if (idx !== -1) {
      setSelectedEraFilter('all');
      setSelectedCategory('all');
      setSearchQuery('');
      setActiveIndex(idx);
    }
    setDossierMilestone(milestone);
  };

  const scrollProgress =
    filteredMilestones.length > 1 ? activeIndex / (filteredMilestones.length - 1) : 0;

  const labelInterval = Math.max(1, Math.floor(filteredMilestones.length / 12));
  const previewMilestone =
    hoveredScrubberIndex !== null && filteredMilestones[hoveredScrubberIndex]
      ? filteredMilestones[hoveredScrubberIndex]
      : activeMilestone;

  return (
    <div className="min-h-screen w-full bg-[#0A0A0C] text-[#F4F0EA] relative flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#F4F0EA] overflow-x-hidden">
      {/* 60fps Era-Reactive Volumetric Projector Light-Cone & Silver-Halide Dust Canvas */}
      <ProjectionCanvas3D
        accentColor={activeEra.accentColor}
        secondaryGlow={activeEra.secondaryGlow}
        scrollProgress={scrollProgress}
      />

      {/* Subtle Analog Film Grain Overlay */}
      <div className="fixed inset-0 film-grain-overlay pointer-events-none z-[1]" />

      {/* FLUENT FULL-BLEED TOP EXHIBITION NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#0E0F14]/90 backdrop-blur-xl border-b border-[#F4F0EA]/10">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-14 flex items-center justify-between gap-3">
          {/* Brand Title */}
          <button
            onClick={() => {
              setActiveSection('timeline');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#181A22] border border-[#D4AF37]/60 flex items-center justify-center group-hover:scale-105 transition">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <span className="font-display text-lg font-bold tracking-wider text-[#F4F0EA]">
              LUMIÈRE
            </span>
          </button>

          {/* 4 Focused Exhibition Views (Only One Section Shown at a Time) */}
          <nav
            aria-label="Cinema Exhibition Rooms"
            className="flex items-center gap-1 sm:gap-1.5 bg-[#121318] p-1 rounded-full border border-[#F4F0EA]/12 overflow-x-auto no-scrollbar"
          >
            {[
              {
                id: 'timeline',
                label: 'Timeline',
                badge: `${MILESTONES.length}`,
                icon: Film,
              },
              {
                id: 'movements',
                label: 'Cinema Movements',
                badge: `${CINEMA_MOVEMENTS.length}`,
                icon: Flame,
              },
              {
                id: 'cannes',
                label: 'Cannes Festival',
                badge: 'Palme d’Or',
                icon: Award,
              },
              {
                id: 'luminaries',
                label: 'Directors & Actors',
                badge: `${LUMINARIES.length}`,
                icon: Star,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id as ActiveSection);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono-tech transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#0A0A0C] font-bold shadow'
                      : 'text-[#A39E93] hover:text-[#F4F0EA] hover:bg-[#181A22]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`hidden md:inline-block px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-[#0A0A0C]/20 text-[#0A0A0C]'
                        : 'bg-[#181A22] text-[#D4AF37]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Quick Action: Optical Lab */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOpticalLabOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A0A0C] border border-[#D4AF37]/40 text-xs font-mono-tech font-semibold transition cursor-pointer"
            >
              <Aperture className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Optical Lab</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT STAGE — FULL-BLEED 16:9 WIDESCREEN & ALL-DEVICE RESPONSIVE */}
      <main id="top" className="relative z-10 flex-1 w-full pb-28">
        {activeSection === 'timeline' && (
          <>
            {/* STREAMLINED HERO + STAGE SWITCHER */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-5 pb-4">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-mono-tech font-bold uppercase"
                      style={{
                        backgroundColor: `${activeEra.accentColor}22`,
                        color: activeEra.accentColor,
                        border: `1px solid ${activeEra.accentColor}55`,
                      }}
                    >
                      Era {activeEra.number} · {activeEra.years}
                    </span>
                    <span className="text-xs font-mono-tech text-[#A39E93]">
                      {activeEra.name}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#F4F0EA] leading-none tracking-tight">
                    The Chronicle of{' '}
                    <span className="italic font-normal text-[#D4AF37]">World Cinema</span>
                  </h1>
                </div>

                {/* Interactive View Switcher (35mm Ribbon / 3D Z-Tunnel / Poster Vault) */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#121318] p-1.5 rounded-lg border border-[#F4F0EA]/12 self-start lg:self-auto">
                  {[
                    { id: 'ribbon', label: '35mm Ribbon', icon: Columns },
                    { id: 'tunnel3d', label: '3D Spatial Tunnel', icon: Compass },
                    { id: 'grid', label: 'Poster Vault', icon: LayoutGrid },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const active = viewMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id as any)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono-tech flex items-center gap-1.5 transition cursor-pointer ${
                          active
                            ? 'bg-[#D4AF37] text-[#0A0A0C] font-bold shadow'
                            : 'text-[#A39E93] hover:text-[#F4F0EA] hover:bg-[#181A22]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compact Era Pills + Category Filter + Search Bar */}
              <div className="mt-3.5 bg-[#121318]/90 p-3 rounded-lg border border-[#F4F0EA]/10 space-y-2.5">
                {/* Row 1: Historical Era Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#68645D] mr-1 shrink-0">
                    Era:
                  </span>
                  <button
                    onClick={() => {
                      setSelectedEraFilter('all');
                      setActiveIndex(0);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono-tech transition shrink-0 cursor-pointer ${
                      selectedEraFilter === 'all'
                        ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold'
                        : 'bg-[#181A22] text-[#A39E93] hover:text-[#F4F0EA]'
                    }`}
                  >
                    All Eras (1878–Now)
                  </button>
                  {ERAS.map((era) => {
                    const isSelected = selectedEraFilter === era.id;
                    return (
                      <button
                        key={era.id}
                        onClick={() => {
                          setSelectedEraFilter(era.id);
                          setActiveIndex(0);
                        }}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-mono-tech transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#181A22] text-[#F4F0EA] border border-[#D4AF37] font-semibold'
                            : 'bg-[#0A0A0C]/60 text-[#A39E93] hover:text-[#F4F0EA] border border-[#F4F0EA]/10'
                        }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: era.accentColor }}
                        />
                        <span>{era.years}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Row 2: Category Pills + Search */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#F4F0EA]/10">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all', label: `All Films (${MILESTONES.length})` },
                      { id: 'underground', label: 'Cult & Underground', highlight: true },
                      { id: 'masterpiece', label: 'Canon Masterpieces' },
                      { id: 'movement', label: 'Movements & Extremity' },
                      { id: 'technology', label: 'Camera & VFX' },
                    ].map((cat) => {
                      const active = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id as any);
                            setActiveIndex(0);
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-mono-tech flex items-center gap-1 transition cursor-pointer ${
                            active
                              ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold'
                              : cat.highlight
                              ? 'bg-[#C83E31]/20 text-[#F4F0EA] border border-[#C83E31]/50 hover:bg-[#C83E31]/35'
                              : 'bg-[#181A22] text-[#A39E93] hover:text-[#F4F0EA]'
                          }`}
                        >
                          {cat.highlight && <Flame className="w-3 h-3 text-[#C83E31]" />}
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 text-[#68645D] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setActiveIndex(0);
                        }}
                        placeholder="Search film, director, actor, year..."
                        className="w-full pl-8 pr-3 py-1 rounded bg-[#0A0A0C] border border-[#F4F0EA]/15 focus:border-[#D4AF37] focus:outline-none text-xs text-[#F4F0EA] placeholder-[#68645D]"
                      />
                    </div>
                    <span className="text-xs font-mono-tech text-[#D4AF37] shrink-0">
                      {filteredMilestones.length} FILMS
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* EXHIBITION STAGE: 35MM RIBBON TRACK, 3D SPATIAL TUNNEL, OR POSTER VAULT GRID */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
              {filteredMilestones.length === 0 ? (
                <div className="p-12 text-center rounded-lg bg-[#121318] border border-[#F4F0EA]/10 space-y-3">
                  <p className="font-display text-2xl text-[#F4F0EA]">
                    No films match your current filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedEraFilter('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded bg-[#D4AF37] text-[#0A0A0C] font-mono-tech text-xs font-semibold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'tunnel3d' ? (
                <Tunnel3DView
                  milestones={filteredMilestones}
                  activeIndex={activeIndex}
                  onSelectIndex={(idx) => setActiveIndex(idx)}
                  onOpenDossier={(m) => setDossierMilestone(m)}
                />
              ) : viewMode === 'ribbon' ? (
                /* 35MM HORIZONTAL FILM-STRIP RIBBON WITH REAL MOVIE POSTERS */
                <div className="relative w-full rounded-lg bg-[#0D0E12]/90 border border-[#F4F0EA]/12 overflow-hidden shadow-2xl">
                  {/* Top 35mm Sprocket Perforation Rail + Prev/Next Controls */}
                  <div className="h-9 bg-[#07080A] border-b border-[#F4F0EA]/10 flex items-center justify-between px-4 gap-4">
                    <div className="flex-1 h-3 sprocket-holes-row opacity-75" />
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] font-mono-tech text-[#A39E93] mr-2 hidden sm:inline">
                        {activeIndex + 1} / {filteredMilestones.length} · {activeMilestone.year}
                      </span>
                      <button
                        onClick={() => focusMilestoneAtIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        className="px-2.5 py-0.5 rounded bg-[#181A22] hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0A0A0C] disabled:opacity-30 border border-[#F4F0EA]/15 text-[11px] font-mono-tech flex items-center gap-1 transition cursor-pointer"
                      >
                        <ChevronLeft className="w-3 h-3" /> Prev
                      </button>
                      <button
                        onClick={() => focusMilestoneAtIndex(activeIndex + 1)}
                        disabled={activeIndex === filteredMilestones.length - 1}
                        className="px-2.5 py-0.5 rounded bg-[#181A22] hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0A0A0C] disabled:opacity-30 border border-[#F4F0EA]/15 text-[11px] font-mono-tech flex items-center gap-1 transition cursor-pointer"
                      >
                        Next <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Poster Track */}
                  <div
                    ref={ribbonScrollRef}
                    className="flex items-stretch gap-5 overflow-x-auto px-6 py-6 scroll-smooth"
                  >
                    {filteredMilestones.map((milestone, idx) => {
                      const isActive = idx === activeIndex;
                      const mEra = getEraById(milestone.eraId);

                      return (
                        <article
                          key={milestone.id}
                          ref={(el) => {
                            cardRefs.current[milestone.id] = el;
                          }}
                          onClick={() => {
                            setActiveIndex(idx);
                            setDossierMilestone(milestone);
                          }}
                          className={`w-[270px] sm:w-[300px] xl:w-[320px] shrink-0 rounded-md p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                            isActive
                              ? 'bg-[#181A22] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.85)] -translate-y-1'
                              : 'bg-[#14161D]/90 border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 hover:bg-[#181A22] hover:-translate-y-1'
                          }`}
                        >
                          <div>
                            {/* Year Badge + Cult Badge */}
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span
                                className="px-2 py-0.5 rounded text-xs font-mono-tech font-bold"
                                style={{
                                  backgroundColor: `${mEra.accentColor}20`,
                                  color: mEra.accentColor,
                                  border: `1px solid ${mEra.accentColor}50`,
                                }}
                              >
                                {milestone.year}
                              </span>

                              {milestone.isUndergroundGem ? (
                                <span className="px-2 py-0.5 rounded bg-[#C83E31]/90 text-[#F4F0EA] text-[10px] font-mono-tech uppercase tracking-wider flex items-center gap-1">
                                  <Flame className="w-2.5 h-2.5" /> Cult
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono-tech text-[#A39E93] truncate max-w-[140px]">
                                  {milestone.country}
                                </span>
                              )}
                            </div>

                            {/* Large Real Movie Poster Showcase */}
                            <div className="h-64 xl:h-72 w-full mb-3.5">
                              <CinemaArtwork
                                milestone={milestone}
                                enforceAspectRatio={false}
                                interactiveHover={true}
                                className="w-full h-full"
                              />
                            </div>

                            {/* Film Title & Concise Tag */}
                            <h3 className="font-display text-2xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] transition leading-tight">
                              {milestone.title}
                            </h3>
                            <div className="text-[11px] font-mono-tech text-[#D4AF37] mt-1 line-clamp-1">
                              {milestone.primaryTag}
                            </div>
                          </div>

                          {/* Director Footer */}
                          <div className="pt-2.5 mt-3 border-t border-[#F4F0EA]/10 flex items-center justify-between text-xs text-[#A39E93]">
                            <span className="truncate">Dir. {milestone.director}</span>
                            <span className="font-mono-tech text-[10px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition shrink-0 ml-2">
                              Open →
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Bottom 35mm Celluloid Sprocket Perforation Rail */}
                  <div className="h-6 bg-[#07080A] border-t border-[#F4F0EA]/10 flex items-center px-4">
                    <div className="w-full h-2.5 sprocket-holes-row opacity-75" />
                  </div>
                </div>
              ) : (
                /* POSTER VAULT GRID MODE — FULL WIDESCREEN 16:9 SUPPORT */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                  {filteredMilestones.map((milestone, idx) => {
                    const mEra = getEraById(milestone.eraId);
                    return (
                      <article
                        key={milestone.id}
                        onClick={() => {
                          setActiveIndex(idx);
                          setDossierMilestone(milestone);
                        }}
                        className="rounded-md p-4 bg-[#161821]/90 border border-[#F4F0EA]/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 shadow-lg"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span
                              className="px-2 py-0.5 rounded text-xs font-mono-tech font-bold"
                              style={{
                                backgroundColor: `${mEra.accentColor}20`,
                                color: mEra.accentColor,
                                border: `1px solid ${mEra.accentColor}50`,
                              }}
                            >
                              {milestone.year}
                            </span>
                            {milestone.isUndergroundGem && (
                              <span className="px-2 py-0.5 rounded bg-[#C83E31]/90 text-[#F4F0EA] text-[10px] font-mono-tech uppercase flex items-center gap-1">
                                <Flame className="w-2.5 h-2.5" /> Cult
                              </span>
                            )}
                          </div>

                          <div className="h-64 w-full mb-3">
                            <CinemaArtwork
                              milestone={milestone}
                              enforceAspectRatio={false}
                              interactiveHover={true}
                              className="w-full h-full"
                            />
                          </div>

                          <h3 className="font-display text-xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] transition leading-snug">
                            {milestone.title}
                          </h3>
                        </div>

                        <div className="pt-2.5 mt-3 border-t border-[#F4F0EA]/10 flex items-center justify-between text-xs text-[#A39E93]">
                          <span className="truncate">Dir. {milestone.director}</span>
                          <span className="font-mono-tech text-[10px] text-[#68645D] truncate max-w-[90px]">
                            {milestone.country}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Quick Navigation Cards to Other Exhibition Rooms */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setActiveSection('movements');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-lg bg-[#121318]/90 hover:bg-[#181A22] border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 text-left flex items-center justify-between group transition cursor-pointer"
                >
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C83E31] flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {CINEMA_MOVEMENTS.length} Movements
                    </div>
                    <div className="font-display text-xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] mt-0.5">
                      French New Wave &amp; Extremity →
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => {
                    setActiveSection('cannes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-lg bg-[#121318]/90 hover:bg-[#181A22] border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 text-left flex items-center justify-between group transition cursor-pointer"
                >
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                      <Award className="w-3 h-3" /> {CANNES_MILESTONES.length} Croisette Icons
                    </div>
                    <div className="font-display text-xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] mt-0.5">
                      Cannes &amp; Palme d’Or Hall →
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => {
                    setActiveSection('luminaries');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-lg bg-[#121318]/90 hover:bg-[#181A22] border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 text-left flex items-center justify-between group transition cursor-pointer"
                >
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                      <Star className="w-3 h-3" /> {LUMINARIES.length} Portraits
                    </div>
                    <div className="font-display text-xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] mt-0.5">
                      Directors, Cult Auteurs &amp; Actors →
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>
              </div>
            </section>
          </>
        )}

        {activeSection === 'movements' && (
          <MovementsSection onJumpToMilestone={handleJumpToMilestone} />
        )}

        {activeSection === 'cannes' && (
          <CannesSection onJumpToMilestone={handleJumpToMilestone} />
        )}

        {activeSection === 'luminaries' && (
          <LuminariesSection onJumpToMilestone={handleJumpToMilestone} />
        )}
      </main>

      {/* PERSISTENT BOTTOM 1878–2024 FULL-SPAN INTERACTIVE SCRUBBER DOCK */}
      {activeSection === 'timeline' && filteredMilestones.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0E0F14]/95 backdrop-blur-xl border-t border-[#F4F0EA]/15 px-4 sm:px-6 lg:px-10 xl:px-14 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
          <div className="w-full flex items-center gap-3 sm:gap-5">
            {/* Active / Hovered Film Readout */}
            <div className="hidden md:flex flex-col shrink-0 w-52">
              <span className="text-[11px] font-mono-tech uppercase tracking-wider text-[#D4AF37] font-bold truncate">
                {previewMilestone.year} · {previewMilestone.title}
              </span>
              <span className="text-[10px] font-mono-tech text-[#A39E93] truncate">
                Dir. {previewMilestone.director}
              </span>
            </div>

            {/* Step Left Button */}
            <button
              type="button"
              onClick={() => focusMilestoneAtIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="p-1.5 rounded bg-[#181A22] hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0A0A0C] disabled:opacity-30 border border-[#F4F0EA]/15 transition shrink-0 cursor-pointer"
              title="Previous Film (Left Arrow)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Full-Width 1878 -> 2024 Proportional Interactive Scrubber Track (All Dates Fit!) */}
            <div
              ref={scrubberTrackRef}
              onMouseDown={(e) => {
                isScrubbingRef.current = true;
                pickIndexFromClientX(e.clientX);
              }}
              onMouseLeave={() => setHoveredScrubberIndex(null)}
              className="flex-1 flex items-end h-11 select-none cursor-pointer relative pt-2 pb-4"
              title="Click or drag anywhere across 1878–2024 to scrub through cinema history"
            >
              {filteredMilestones.map((m, idx) => {
                const isSelected = idx === activeIndex;
                const isHovered = idx === hoveredScrubberIndex;
                const mEra = getEraById(m.eraId);
                const showYearLabel =
                  idx === 0 ||
                  idx === filteredMilestones.length - 1 ||
                  isSelected ||
                  isHovered ||
                  (idx % labelInterval === 0 &&
                    Math.abs(idx - activeIndex) > 2 &&
                    idx < filteredMilestones.length - 2);

                return (
                  <button
                    key={m.id}
                    type="button"
                    onMouseEnter={() => setHoveredScrubberIndex(idx)}
                    onClick={(e) => {
                      e.stopPropagation();
                      focusMilestoneAtIndex(idx);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      focusMilestoneAtIndex(idx, true);
                    }}
                    className="flex-1 h-full flex flex-col items-center justify-end relative group focus:outline-none cursor-pointer"
                    aria-label={`${m.year} ${m.title}`}
                  >
                    {/* Hover Tooltip Above Tick */}
                    {isHovered && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#D4AF37] text-[#0A0A0C] text-[10px] font-mono-tech font-bold whitespace-nowrap shadow-lg pointer-events-none z-40">
                        {m.year} · {m.title}
                      </div>
                    )}

                    {/* Vertical Tick Bar */}
                    <div
                      className={`w-[3px] sm:w-[4px] rounded-full transition-all duration-150 ${
                        isSelected
                          ? 'h-5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                          : isHovered
                          ? 'h-4 bg-[#F4F0EA]'
                          : 'h-2.5 opacity-70 group-hover:h-4 group-hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? '#D4AF37'
                          : isHovered
                          ? '#F4F0EA'
                          : m.isUndergroundGem
                          ? '#C83E31'
                          : mEra.accentColor,
                      }}
                    />

                    {/* Non-Overlapping Year Label Spanning Entire 1878-2024 Range */}
                    {showYearLabel && (
                      <span
                        className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[9px] font-mono-tech whitespace-nowrap pointer-events-none ${
                          isSelected
                            ? 'text-[#D4AF37] font-bold scale-110 z-20 bg-[#0E0F14] px-1 rounded'
                            : isHovered
                            ? 'text-[#F4F0EA] font-bold z-20 bg-[#0E0F14] px-1 rounded'
                            : 'text-[#A39E93]'
                        }`}
                      >
                        {m.year}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Step Right Button */}
            <button
              type="button"
              onClick={() => focusMilestoneAtIndex(activeIndex + 1)}
              disabled={activeIndex === filteredMilestones.length - 1}
              className="p-1.5 rounded bg-[#181A22] hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0A0A0C] disabled:opacity-30 border border-[#F4F0EA]/15 transition shrink-0 cursor-pointer"
              title="Next Film (Right Arrow)"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setDossierMilestone(activeMilestone)}
              className="shrink-0 px-3 py-1.5 rounded bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            >
              Inspect {activeMilestone.year}
            </button>
          </div>
        </div>
      )}

      {/* SLIDE-OVER ARCHIVAL INSPECTION DOSSIER DRAWER */}
      <InspectionDossier
        milestone={dossierMilestone}
        onClose={() => setDossierMilestone(null)}
        onSelectMilestone={(m) => {
          const idx = filteredMilestones.findIndex((item) => item.id === m.id);
          if (idx !== -1) focusMilestoneAtIndex(idx);
          setDossierMilestone(m);
        }}
      />

      {/* INTERACTIVE OPTICAL TOY & ASPECT RATIO LABORATORY MODAL */}
      <OpticalLabModal
        isOpen={isOpticalLabOpen}
        onClose={() => setIsOpticalLabOpen(false)}
      />
    </div>
  );
}

export default App;
