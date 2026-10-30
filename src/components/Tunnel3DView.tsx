import React, { useState, useEffect } from 'react';
import { CinemaMilestone, Era } from '../data/types';
import { getEraById } from '../data/cinemaData';
import { CinemaArtwork } from './CinemaArtwork';
import { ChevronLeft, ChevronRight, Sparkles, Eye, Compass, Flame } from 'lucide-react';

interface Tunnel3DViewProps {
  milestones: CinemaMilestone[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDossier: (milestone: CinemaMilestone) => void;
}

export const Tunnel3DView: React.FC<Tunnel3DViewProps> = ({
  milestones,
  activeIndex,
  onSelectIndex,
  onOpenDossier,
}) => {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const activeMilestone = milestones[activeIndex] || milestones[0];
  const activeEra: Era = getEraById(activeMilestone.eraId);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#cinema-3d-tunnel')) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) > 12) {
        const dir = e.deltaY > 0 ? 1 : -1;
        const next = Math.min(milestones.length - 1, Math.max(0, activeIndex + dir));
        if (next !== activeIndex) {
          onSelectIndex(next);
        }
      }
    };

    const el = document.getElementById('cinema-3d-tunnel');
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, milestones.length, onSelectIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: nx * 6, y: -ny * 4 });
  };

  return (
    <div
      id="cinema-3d-tunnel"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseTilt({ x: 0, y: 0 })}
      className="relative w-full h-[calc(100vh-280px)] min-h-[520px] max-h-[820px] overflow-hidden rounded-lg border border-[#F4F0EA]/10 bg-[#07080B]/85 perspective-stage select-none"
    >
      <div
        className="w-full h-full preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[130px] pointer-events-none transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${activeEra.accentColor}33 0%, transparent 70%)`,
          }}
        />

        {milestones.map((m, idx) => {
          const offset = idx - activeIndex;
          if (offset < -2 || offset > 8) return null;

          const zPos = -offset * 340;
          const lane = idx % 3 === 0 ? -1 : idx % 3 === 1 ? 1 : 0;
          const xPos = offset === 0 ? 0 : lane * 260 + (offset % 2 === 0 ? -50 : 50);
          const yPos = offset === 0 ? -12 : idx % 2 === 0 ? -35 : 35;
          const scale = offset === 0 ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.08);
          const opacity =
            offset < 0
              ? Math.max(0, 0.25 + offset * 0.15)
              : offset === 0
              ? 1
              : Math.max(0.12, 1 - offset * 0.12);

          const mEra = getEraById(m.eraId);

          return (
            <div
              key={m.id}
              onClick={() => {
                if (offset === 0) {
                  onOpenDossier(m);
                } else {
                  onSelectIndex(idx);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px), ${zPos}px) scale(${scale})`,
                opacity,
                zIndex: 100 - Math.abs(offset),
              }}
              className={`absolute left-1/2 top-1/2 w-[310px] sm:w-[370px] transition-all duration-700 ease-out cursor-pointer rounded-md p-4 border ${
                offset === 0
                  ? 'bg-[#161821]/95 border-[#D4AF37]/70 shadow-[0_25px_70px_rgba(0,0,0,0.92)] ring-1 ring-[#D4AF37]/30'
                  : 'bg-[#121318]/85 border-[#F4F0EA]/12 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className="px-2 py-0.5 text-xs font-mono-tech font-semibold rounded"
                  style={{
                    backgroundColor: `${mEra.accentColor}22`,
                    color: mEra.accentColor,
                    border: `1px solid ${mEra.accentColor}55`,
                  }}
                >
                  {m.year}
                </span>
                {m.isUndergroundGem ? (
                  <span className="px-2 py-0.5 rounded bg-[#C83E31]/90 text-[#F4F0EA] text-[10px] font-mono-tech uppercase flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5" /> Cult
                  </span>
                ) : (
                  <span className="text-[11px] font-mono-tech text-[#A39E93]">{m.country}</span>
                )}
              </div>

              <div className="h-64 w-full">
                <CinemaArtwork
                  milestone={m}
                  enforceAspectRatio={false}
                  interactiveHover={offset === 0}
                  className="w-full h-full"
                />
              </div>

              <div className="mt-3">
                <h3 className="font-display text-2xl font-bold text-[#F4F0EA] leading-tight">
                  {m.title}
                </h3>
                <div className="flex items-center justify-between mt-1 text-xs text-[#A39E93]">
                  <span className="truncate">Dir. {m.director}</span>
                  {offset === 0 && (
                    <span className="inline-flex items-center gap-1 text-[#D4AF37] font-mono-tech text-[11px] shrink-0">
                      <Eye className="w-3.5 h-3.5" /> Dossier
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded bg-[#0A0A0C]/85 border border-[#F4F0EA]/15 backdrop-blur-md flex items-center gap-2 text-xs font-mono-tech text-[#A39E93]">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>3D Z-TUNNEL · SCROLL OR CLICK DEPTH FRAMES</span>
        </div>

        <div className="px-3 py-1 rounded bg-[#0A0A0C]/85 border border-[#F4F0EA]/15 backdrop-blur-md text-xs font-mono-tech text-[#D4AF37]">
          {activeIndex + 1} / {milestones.length} · {activeMilestone.year}
        </div>
      </div>

      {/* Bottom 3D Flight Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0E0F14]/90 border border-[#F4F0EA]/15 backdrop-blur-md shadow-xl">
        <button
          onClick={() => onSelectIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="p-1.5 rounded-full hover:bg-[#F4F0EA]/10 disabled:opacity-30 text-[#F4F0EA] transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => onOpenDossier(activeMilestone)}
          className="px-3.5 py-1 rounded-full bg-[#D4AF37] text-[#0A0A0C] font-mono-tech text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-[#E5C358] transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Open {activeMilestone.year} Dossier
        </button>

        <button
          onClick={() => onSelectIndex(Math.min(milestones.length - 1, activeIndex + 1))}
          disabled={activeIndex === milestones.length - 1}
          className="p-1.5 rounded-full hover:bg-[#F4F0EA]/10 disabled:opacity-30 text-[#F4F0EA] transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
