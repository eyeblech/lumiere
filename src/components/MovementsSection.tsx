import React, { useState } from 'react';
import { CINEMA_MOVEMENTS, getMilestoneById } from '../data/cinemaData';
import { CinemaMilestone } from '../data/types';
import { Flame, Sparkles, ArrowUpRight, Film } from 'lucide-react';

interface MovementsSectionProps {
  onJumpToMilestone: (milestone: CinemaMilestone) => void;
}

export const MovementsSection: React.FC<MovementsSectionProps> = ({ onJumpToMilestone }) => {
  const [activeMovementId, setActiveMovementId] = useState<string>('all');

  const visibleMovements =
    activeMovementId === 'all'
      ? CINEMA_MOVEMENTS
      : CINEMA_MOVEMENTS.filter((m) => m.id === activeMovementId);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-6 pb-20 space-y-7">
      {/* Header & Movement Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-1">
            <Flame className="w-3.5 h-3.5 text-[#C83E31]" />
            Manifestos &amp; Revolutions
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F4F0EA]">
            World Cinema <span className="italic font-normal text-[#D4AF37]">Movements</span>
          </h1>
        </div>

        {/* Movement Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveMovementId('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono-tech transition cursor-pointer ${
              activeMovementId === 'all'
                ? 'bg-[#D4AF37] text-[#0A0A0C] font-bold'
                : 'bg-[#121318] text-[#A39E93] hover:text-[#F4F0EA] border border-[#F4F0EA]/10'
            }`}
          >
            All Movements ({CINEMA_MOVEMENTS.length})
          </button>
          {CINEMA_MOVEMENTS.map((mov) => (
            <button
              key={mov.id}
              onClick={() => setActiveMovementId(mov.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono-tech flex items-center gap-1.5 transition cursor-pointer ${
                activeMovementId === mov.id
                  ? 'bg-[#181A22] text-[#F4F0EA] border border-[#D4AF37] font-semibold'
                  : 'bg-[#121318] text-[#A39E93] hover:text-[#F4F0EA] border border-[#F4F0EA]/10'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: mov.accentColor }}
              />
              {mov.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Fluent Movement Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleMovements.map((mov) => (
          <article
            key={mov.id}
            className="rounded-lg bg-[#121318]/95 border border-[#F4F0EA]/12 p-6 flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/45 transition shadow-xl"
          >
            <div className="space-y-3">
              {/* Top Origin & Year Pill */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold"
                  style={{
                    backgroundColor: `${mov.accentColor}22`,
                    color: mov.accentColor,
                    border: `1px solid ${mov.accentColor}55`,
                  }}
                >
                  {mov.years} · {mov.origin}
                </span>
                <span className="text-[11px] font-mono-tech text-[#A39E93]">
                  {mov.keyFigures.slice(0, 3).join(' · ')}
                </span>
              </div>

              <h2 className="font-display text-3xl font-bold text-[#F4F0EA] leading-tight">
                {mov.name}
              </h2>
              <div className="text-xs font-mono-tech text-[#D4AF37]">{mov.subtitle}</div>

              <p className="text-sm text-[#A39E93] leading-relaxed">{mov.manifesto}</p>

              {/* Hallmarks */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {mov.hallmarks.map((h, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#0A0A0C] border border-[#F4F0EA]/10 text-[11px] font-mono-tech text-[#F4F0EA]/85"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37] inline mr-1" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Real Movie Posters Strip for This Movement */}
            <div className="pt-4 border-t border-[#F4F0EA]/10">
              <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#68645D] mb-2.5 flex items-center gap-1.5">
                <Film className="w-3 h-3 text-[#D4AF37]" />
                Essential Films of the Movement
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mov.signatureFilms.map((sf) => {
                  const linked = getMilestoneById(sf.id);
                  return (
                    <div
                      key={sf.id}
                      onClick={() => linked && onJumpToMilestone(linked)}
                      className={`group rounded bg-[#0A0A0C] border border-[#F4F0EA]/10 overflow-hidden flex flex-col justify-between transition ${
                        linked
                          ? 'cursor-pointer hover:border-[#D4AF37]'
                          : ''
                      }`}
                    >
                      <div className="relative h-40 w-full bg-[#07080B] overflow-hidden flex items-center justify-center">
                        <img
                          src={sf.posterUrl}
                          alt={sf.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0A0A0C]/85 text-[10px] font-mono-tech text-[#D4AF37]">
                          {sf.year}
                        </span>
                      </div>
                      <div className="p-2.5 flex items-center justify-between gap-1">
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#F4F0EA] truncate group-hover:text-[#D4AF37]">
                            {sf.title}
                          </div>
                          <div className="text-[10px] text-[#A39E93] truncate">{sf.director}</div>
                        </div>
                        {linked && (
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
