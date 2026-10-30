import React, { useState } from 'react';
import { CANNES_MILESTONES, getMilestoneById } from '../data/cinemaData';
import { CinemaMilestone } from '../data/types';
import { Award, Flame, Sparkles, ArrowUpRight } from 'lucide-react';

interface CannesSectionProps {
  onJumpToMilestone: (milestone: CinemaMilestone) => void;
}

export const CannesSection: React.FC<CannesSectionProps> = ({ onJumpToMilestone }) => {
  const [filterType, setFilterType] = useState<'all' | 'palme' | 'scandal'>('all');

  const filteredCannes = CANNES_MILESTONES.filter((c) => {
    if (filterType === 'palme') return c.award.toLowerCase().includes('palme');
    if (filterType === 'scandal')
      return (
        c.id.includes('irreversible') ||
        c.id.includes('possession') ||
        c.id.includes('pulp') ||
        c.id.includes('taxi') ||
        c.id.includes('titane') ||
        c.id.includes('la-haine')
      );
    return true;
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-6 pb-20 space-y-7">
      {/* Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-1">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            Palais des Festivals · La Croisette (1946–Present)
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F4F0EA]">
            Festival de Cannes &amp; <span className="italic font-normal text-[#D4AF37]">Palme d’Or</span>
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-[#121318] p-1.5 rounded-lg border border-[#F4F0EA]/10 self-start lg:self-auto">
          {[
            { id: 'all', label: `All Cannes Legends (${CANNES_MILESTONES.length})`, icon: Sparkles },
            { id: 'palme', label: 'Palme d’Or Winners', icon: Award },
            { id: 'scandal', label: 'Walkouts, Shocks & Ovations', icon: Flame },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono-tech flex items-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-[#D4AF37] text-[#0A0A0C] font-bold'
                    : 'text-[#A39E93] hover:text-[#F4F0EA] hover:bg-[#181A22]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fluent Cannes Poster & Story Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCannes.map((item) => {
          const linked = item.linkedMilestoneId
            ? getMilestoneById(item.linkedMilestoneId)
            : undefined;

          return (
            <article
              key={item.id}
              onClick={() => linked && onJumpToMilestone(linked)}
              className={`rounded-lg bg-[#14161D]/95 border border-[#D4AF37]/25 hover:border-[#D4AF37] overflow-hidden flex flex-col justify-between transition duration-300 group shadow-xl ${
                linked ? 'cursor-pointer hover:-translate-y-1' : ''
              }`}
            >
              <div>
                {/* Poster Showcase with Palme d'Or / Award Ribbon */}
                <div className="relative h-64 w-full bg-[#07080B] overflow-hidden flex items-center justify-center">
                  <img
                    src={item.posterUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-40"
                  />
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    loading="lazy"
                    className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 shadow-2xl"
                  />
                  <span className="absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#0A0A0C] text-xs font-mono-tech font-bold">
                    CANNES {item.year}
                  </span>
                  <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded bg-[#0A0A0C]/85 border border-[#D4AF37]/40 text-[10px] font-mono-tech text-[#D4AF37]">
                    {item.country}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#D4AF37] uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    {item.award}
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] transition leading-snug">
                    {item.title}
                  </h2>

                  <div className="text-xs font-mono-tech text-[#C83E31] bg-[#C83E31]/12 border border-[#C83E31]/30 px-2.5 py-1 rounded">
                    {item.ovationsOrWalkouts}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
                    {item.cannesStory}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-[#F4F0EA]/10 flex items-center justify-between text-xs text-[#A39E93]">
                <span>Dir. {item.director}</span>
                {linked && (
                  <span className="inline-flex items-center gap-1 font-mono-tech text-[11px] text-[#D4AF37]">
                    Open Full Dossier <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
