import React, { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });
  const wheelAccumRef = useRef(0);
  const lastStepTimeRef = useRef(0);

  const activeMilestone = milestones[activeIndex] || milestones[0];
  const activeEra: Era = getEraById(activeMilestone.eraId);

  // 60fps GPU-direct mouse parallax loop (zero React re-renders on mousemove)
  useEffect(() => {
    let rafId: number;
    const animateTilt = () => {
      const curr = currentTiltRef.current;
      const target = targetTiltRef.current;
      curr.x += (target.x - curr.x) * 0.12;
      curr.y += (target.y - curr.y) * 0.12;
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateY(${curr.x.toFixed(2)}deg) rotateX(${curr.y.toFixed(2)}deg)`;
      }
      rafId = requestAnimationFrame(animateTilt);
    };
    rafId = requestAnimationFrame(animateTilt);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Smooth debounced wheel & trackpad flight navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastStepTimeRef.current < 130) {
        return;
      }
      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) >= 28) {
        const dir = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current = 0;
        lastStepTimeRef.current = now;
        const next = Math.min(milestones.length - 1, Math.max(0, activeIndex + dir));
        if (next !== activeIndex) {
          onSelectIndex(next);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [activeIndex, milestones.length, onSelectIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetTiltRef.current = { x: nx * 4.5, y: -ny * 3 };
  };

  const handleMouseLeave = () => {
    targetTiltRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      id="cinema-3d-tunnel"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${activeEra.accentColor}22 0%, #07080B 68%)`,
      }}
      className="relative w-full h-[calc(100vh-280px)] min-h-[520px] max-h-[820px] overflow-hidden rounded-lg border border-[#F4F0EA]/12 perspective-stage select-none"
    >
      {/* Perspective Guide Rails (Pure SVG, zero filter cost) */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      >
        <line x1="0" y1="0" x2="500" y2="300" stroke={activeEra.accentColor} strokeWidth="0.7" />
        <line x1="1000" y1="0" x2="500" y2="300" stroke={activeEra.accentColor} strokeWidth="0.7" />
        <line x1="0" y1="600" x2="500" y2="300" stroke={activeEra.accentColor} strokeWidth="0.7" />
        <line x1="1000" y1="600" x2="500" y2="300" stroke={activeEra.accentColor} strokeWidth="0.7" />
        <rect x="360" y="190" width="280" height="220" fill="none" stroke={activeEra.accentColor} strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      {/* Hardware-Accelerated 3D Stage */}
      <div
        ref={stageRef}
        className="w-full h-full preserve-3d"
        style={{ willChange: 'transform' }}
      >
        {milestones.map((m, idx) => {
          const offset = idx - activeIndex;
          // Render tight depth window for 60fps performance
          if (offset < -1 || offset > 6) return null;

          const zPos = offset < 0 ? 220 : -offset * 290;
          const lane = idx % 3 === 0 ? -1 : idx % 3 === 1 ? 1 : 0;
          const xPos =
            offset === 0
              ? 0
              : offset < 0
              ? lane * 340
              : lane * 270 + (offset % 2 === 0 ? -40 : 40);
          const yPos = offset === 0 ? -10 : idx % 2 === 0 ? -28 : 28;
          const scale =
            offset === 0
              ? 1
              : offset < 0
              ? 1.08
              : Math.max(0.42, 1 - offset * 0.085);
          const opacity =
            offset < 0
              ? 0
              : offset === 0
              ? 1
              : Math.max(0.15, 1 - offset * 0.14);

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
                transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px) scale3d(${scale}, ${scale}, 1)`,
                opacity,
                zIndex: 100 - Math.abs(offset),
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                pointerEvents: offset < 0 ? 'none' : 'auto',
              }}
              className={`absolute left-1/2 top-1/2 -ml-[155px] sm:-ml-[185px] -mt-[195px] w-[310px] sm:w-[370px] transition-[transform,opacity,border-color] duration-500 ease-out cursor-pointer rounded-md p-4 border ${
                offset === 0
                  ? 'bg-[#161821] border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                  : 'bg-[#121318] border-[#F4F0EA]/15 hover:border-[#D4AF37]/50'
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
                  <span className="text-[11px] font-mono-tech text-[#A39E93] truncate max-w-[150px]">
                    {m.country}
                  </span>
                )}
              </div>

              <div className="h-64 w-full">
                <CinemaArtwork
                  milestone={m}
                  enforceAspectRatio={false}
                  interactiveHover={offset === 0}
                  lightweight3D={true}
                  className="w-full h-full"
                />
              </div>

              <div className="mt-3">
                <h3 className="font-display text-2xl font-bold text-[#F4F0EA] leading-tight truncate">
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
        <div className="px-3 py-1 rounded bg-[#0A0A0C]/90 border border-[#F4F0EA]/15 flex items-center gap-2 text-xs font-mono-tech text-[#A39E93]">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>3D Z-TUNNEL · SCROLL WHEEL, ARROWS, OR CLICK DEPTH FRAMES</span>
        </div>

        <div className="px-3 py-1 rounded bg-[#0A0A0C]/90 border border-[#F4F0EA]/15 text-xs font-mono-tech text-[#D4AF37]">
          {activeIndex + 1} / {milestones.length} · {activeMilestone.year}
        </div>
      </div>

      {/* Bottom 3D Flight Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0E0F14]/95 border border-[#F4F0EA]/15 shadow-xl">
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
