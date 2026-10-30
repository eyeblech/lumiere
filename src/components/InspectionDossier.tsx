import React, { useState } from 'react';
import { CinemaMilestone } from '../data/types';
import { getEraById, getMilestoneById } from '../data/cinemaData';
import { CinemaArtwork } from './CinemaArtwork';
import {
  X,
  Film,
  Camera,
  Sparkles,
  Quote,
  ArrowRight,
  ArrowLeft,
  Award,
  Grid,
  Maximize2,
  Compass,
  Users,
  Clock,
  Globe,
} from 'lucide-react';

interface InspectionDossierProps {
  milestone: CinemaMilestone | null;
  onClose: () => void;
  onSelectMilestone: (milestone: CinemaMilestone) => void;
}

export const InspectionDossier: React.FC<InspectionDossierProps> = ({
  milestone,
  onClose,
  onSelectMilestone,
}) => {
  const [overlayMode, setOverlayMode] = useState<'clean' | 'thirds' | 'spiral' | 'gate'>('clean');
  const [preferSchematic, setPreferSchematic] = useState<boolean>(false);

  if (!milestone) return null;

  const era = getEraById(milestone.eraId);
  const influencedByNodes = milestone.influencedBy
    .map((id) => getMilestoneById(id))
    .filter((m): m is CinemaMilestone => Boolean(m));
  const pavedWayForNodes = milestone.pavedWayFor
    .map((id) => getMilestoneById(id))
    .filter((m): m is CinemaMilestone => Boolean(m));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Darkened Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050507]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Archival Dossier Panel */}
      <aside
        className="relative z-10 w-full max-w-2xl bg-[#121318] border-l border-[#F4F0EA]/12 h-full overflow-y-auto shadow-[0_0_90px_rgba(0,0,0,0.95)] text-[#F4F0EA]"
        aria-label="Archival Film Dossier"
      >
        {/* Sticky Top Archival Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121318]/90 backdrop-blur-md border-b border-[#F4F0EA]/10">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold"
              style={{
                backgroundColor: `${era.accentColor}22`,
                color: era.accentColor,
                border: `1px solid ${era.accentColor}55`,
              }}
            >
              {milestone.year}
            </span>
            <span className="text-xs font-mono-tech text-[#A39E93] tracking-widest uppercase">
              ARCHIVE REEL #{milestone.frameCode} · {era.shortName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#181A22] hover:bg-[#D4AF37]/20 text-[#A39E93] hover:text-[#F4F0EA] border border-[#F4F0EA]/10 transition cursor-pointer"
            aria-label="Close Dossier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Director Header */}
          <div>
            <div className="text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-1.5">
              {milestone.primaryTag}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F0EA] leading-tight">
              {milestone.title}
            </h2>
            {milestone.originalTitle && (
              <div className="font-display italic text-lg text-[#A39E93] mt-0.5">
                {milestone.originalTitle}
              </div>
            )}
            <p className="mt-3 text-sm sm:text-base text-[#A39E93] leading-relaxed">
              {milestone.logline}
            </p>
          </div>

          {/* Interactive Cinematographer's Frame Inspector */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-[#0A0A0C] p-1 rounded border border-[#F4F0EA]/10">
                <button
                  onClick={() => setPreferSchematic(false)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono-tech transition cursor-pointer ${
                    !preferSchematic
                      ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold'
                      : 'text-[#A39E93] hover:text-[#F4F0EA]'
                  }`}
                >
                  Original Poster
                </button>
                <button
                  onClick={() => setPreferSchematic(true)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono-tech transition cursor-pointer ${
                    preferSchematic
                      ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold'
                      : 'text-[#A39E93] hover:text-[#F4F0EA]'
                  }`}
                >
                  Scene Diagram
                </button>
              </div>

              {/* Overlay Toggle Buttons */}
              <div className="flex items-center gap-1 bg-[#0A0A0C] p-1 rounded border border-[#F4F0EA]/10">
                {[
                  { id: 'clean', label: 'Clean', icon: Maximize2 },
                  { id: 'thirds', label: '3rds', icon: Grid },
                  { id: 'spiral', label: 'Spiral', icon: Compass },
                  { id: 'gate', label: 'Gate', icon: Film },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const active = overlayMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setOverlayMode(mode.id as any)}
                      className={`px-2 py-1 rounded text-[10px] font-mono-tech flex items-center gap-1 transition cursor-pointer ${
                        active
                          ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold'
                          : 'text-[#A39E93] hover:text-[#F4F0EA]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-md bg-[#0A0A0C] border border-[#F4F0EA]/10 flex flex-col items-center">
              <CinemaArtwork
                milestone={milestone}
                overlayMode={overlayMode}
                preferSchematic={preferSchematic}
                enforceAspectRatio={false}
                className="w-full h-80 sm:h-96 shadow-2xl"
              />

              {/* Color Timing Swatch Strip */}
              <div className="w-full flex items-center justify-between mt-3 pt-2.5 border-t border-[#F4F0EA]/10 text-[11px] font-mono-tech text-[#68645D]">
                <span>COLOR TIMING PALETTE</span>
                <div className="flex items-center gap-2">
                  {milestone.colorPalette.map((hex, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#F4F0EA]/20"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[#A39E93]">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#181A22] p-4 rounded-md border border-[#F4F0EA]/10">
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D]">Director</div>
              <div className="text-xs font-medium text-[#F4F0EA] mt-0.5">{milestone.director}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D]">Cinematographer</div>
              <div className="text-xs font-medium text-[#F4F0EA] mt-0.5">{milestone.cinematographer}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D]">Aspect Ratio</div>
              <div className="text-xs font-mono-tech text-[#D4AF37] mt-0.5">{milestone.aspectRatio}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D]">Film Stock / Optical Process</div>
              <div className="text-xs font-mono-tech text-[#A39E93] mt-0.5">{milestone.filmStock}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D] flex items-center gap-1">
                <Clock className="w-3 h-3" /> Runtime & Origin
              </div>
              <div className="text-xs font-mono-tech text-[#F4F0EA] mt-0.5">
                {milestone.runtime} · {milestone.country}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-[#F4F0EA]/10">
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D] flex items-center gap-1">
                <Users className="w-3 h-3 text-[#D4AF37]" /> Key Screen Performers
              </div>
              <div className="text-xs text-[#F4F0EA] mt-1 flex flex-wrap gap-1.5">
                {milestone.starring.map((actor, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#F4F0EA]/10 text-[#F4F0EA]/90"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Breakthrough Callout Box */}
          <div
            className="p-4 rounded-md border"
            style={{
              backgroundColor: `${era.accentColor}12`,
              borderColor: `${era.accentColor}45`,
            }}
          >
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#D4AF37] mb-1">
              <Sparkles className="w-4 h-4" />
              Technical & Formal Breakthrough
            </div>
            <h4 className="font-display text-xl font-bold text-[#F4F0EA] mb-1">
              {milestone.technicalBreakthrough.headline}
            </h4>
            <p className="text-sm text-[#F4F0EA]/85 leading-relaxed">
              {milestone.technicalBreakthrough.detail}
            </p>
          </div>

          {/* Curatorial Historical Essay (Constrained to comfortable 60ch–70ch reading width) */}
          <div className="space-y-4 max-w-[65ch]">
            <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#A39E93] border-b border-[#F4F0EA]/10 pb-2">
              Curatorial Essay & Historical Impact
            </h3>
            {milestone.historicalEssay.map((paragraph, i) => (
              <p key={i} className="text-sm sm:text-[15px] text-[#F4F0EA]/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Iconic Scene Anatomy */}
          <div className="p-4 rounded-md bg-[#181A22] border border-[#F4F0EA]/10 space-y-1.5">
            <div className="text-[11px] font-mono-tech uppercase tracking-wider text-[#D4AF37]">
              Key Sequence Anatomy // {milestone.iconicScene.title}
            </div>
            <p className="text-sm text-[#A39E93] leading-relaxed">
              {milestone.iconicScene.description}
            </p>
          </div>

          {/* Famous Quote */}
          <blockquote className="p-5 rounded-md bg-[#0A0A0C] border-l-2 border-[#D4AF37] space-y-2">
            <Quote className="w-5 h-5 text-[#D4AF37]/60" />
            <p className="font-display italic text-xl sm:text-2xl text-[#F4F0EA] leading-snug">
              “{milestone.famousQuote.text}”
            </p>
            <footer className="text-xs font-mono-tech text-[#A39E93]">
              — {milestone.famousQuote.attribution}
            </footer>
          </blockquote>

          {/* Accolades & Canon Standing */}
          <div className="flex items-start gap-3 p-3.5 rounded bg-[#181A22]/60 border border-[#F4F0EA]/10">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-[#68645D]">
                Archival Standing & Honors
              </div>
              <div className="text-xs text-[#F4F0EA] mt-0.5">{milestone.accolades}</div>
            </div>
          </div>

          {/* Interactive Cinema Lineage ("Influenced By" & "Paved the Way For") */}
          <div className="pt-4 border-t border-[#F4F0EA]/10 space-y-4">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              Interactive Cinema DNA & Lineage
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Influenced By */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-tech text-[#A39E93] flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 text-[#D4AF37]" /> INFLUENCED BY
                </div>
                {influencedByNodes.length === 0 ? (
                  <div className="text-xs text-[#68645D] italic">
                    Foundational origin point of motion pictures
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {influencedByNodes.map((node) => (
                      <button
                        key={node.id}
                        onClick={() => onSelectMilestone(node)}
                        className="text-left px-3 py-2 rounded bg-[#181A22] hover:bg-[#D4AF37]/15 border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-mono-tech text-[#D4AF37] mr-2">
                            {node.year}
                          </span>
                          <span className="text-xs font-medium text-[#F4F0EA] group-hover:text-[#D4AF37]">
                            {node.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#68645D] group-hover:text-[#D4AF37]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Paved the Way For */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-tech text-[#A39E93] flex items-center gap-1">
                  PAVED THE WAY FOR <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                </div>
                {pavedWayForNodes.length === 0 ? (
                  <div className="text-xs text-[#68645D] italic">
                    Contemporary frontier of 2020s cinema
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {pavedWayForNodes.map((node) => (
                      <button
                        key={node.id}
                        onClick={() => onSelectMilestone(node)}
                        className="text-left px-3 py-2 rounded bg-[#181A22] hover:bg-[#D4AF37]/15 border border-[#F4F0EA]/10 hover:border-[#D4AF37]/50 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-mono-tech text-[#D4AF37] mr-2">
                            {node.year}
                          </span>
                          <span className="text-xs font-medium text-[#F4F0EA] group-hover:text-[#D4AF37]">
                            {node.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#68645D] group-hover:text-[#D4AF37]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
