import React, { useState } from 'react';
import { LUMINARIES, getEraById, getMilestoneById } from '../data/cinemaData';
import { CinemaMilestone, Luminary } from '../data/types';
import {
  Film,
  Sparkles,
  Clapperboard,
  Star,
  ArrowUpRight,
  Eye,
  Flame,
  X,
} from 'lucide-react';

interface LuminariesSectionProps {
  onJumpToMilestone: (milestone: CinemaMilestone) => void;
}

export const LuminariesSection: React.FC<LuminariesSectionProps> = ({ onJumpToMilestone }) => {
  const [roleFilter, setRoleFilter] = useState<
    'all' | 'Underground / Cult Auteur' | 'Director' | 'Actor / Screen Legend'
  >('all');
  const [activeLuminaryModal, setActiveLuminaryModal] = useState<Luminary | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const filteredLuminaries = LUMINARIES.filter((l) => {
    if (roleFilter === 'all') return true;
    if (roleFilter === 'Underground / Cult Auteur') {
      return l.isUndergroundIcon || l.role === 'Underground / Cult Auteur';
    }
    if (roleFilter === 'Director') {
      return l.role === 'Director' || l.role === 'Director & Actor';
    }
    return l.role === roleFilter;
  });

  const renderPortrait = (lum: Luminary, tall = false) => {
    const [c1, , c3] = lum.palette;
    const hasPhoto = Boolean(lum.photoUrl && !failedPhotos[lum.id]);

    if (hasPhoto) {
      return (
        <div className="relative w-full h-full bg-[#090A0E] overflow-hidden">
          <img
            src={lum.photoUrl}
            alt={lum.name}
            loading="lazy"
            onError={() => setFailedPhotos((prev) => ({ ...prev, [lum.id]: true }))}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ${
              tall ? '' : 'group-hover:scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-80" />
        </div>
      );
    }

    const initials = lum.name
      .split(' ')
      .filter((w) => w[0] && w[0] === w[0].toUpperCase() && w !== '&')
      .slice(0, 2)
      .map((w) => w[0])
      .join('');

    return (
      <svg viewBox="0 0 240 280" className="w-full h-full block">
        <rect width="240" height="280" fill={c3} />
        <circle cx="120" cy="120" r="54" fill={c1} opacity="0.2" />
        <text
          x="120"
          y="132"
          textAnchor="middle"
          fill={c1}
          fontSize="28"
          fontWeight="bold"
          fontFamily="serif"
        >
          {initials}
        </text>
      </svg>
    );
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-6 pb-20 space-y-7">
      {/* Clean Header + Filter Tabs (Zero Sticky Elements!) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-1">
            <Star className="w-3.5 h-3.5" />
            Auteurs, Provocateurs &amp; Screen Legends
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F4F0EA] tracking-tight">
            Directors &amp; <span className="italic font-normal text-[#D4AF37]">Screen Icons</span>
          </h1>
        </div>

        {/* Role Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#121318] p-1.5 rounded-lg border border-[#F4F0EA]/10 self-start md:self-auto">
          {[
            { id: 'all', label: `All (${LUMINARIES.length})`, icon: Sparkles },
            { id: 'Underground / Cult Auteur', label: 'Cult & Underground Visionaries', icon: Flame },
            { id: 'Director', label: 'Canon Directors', icon: Clapperboard },
            { id: 'Actor / Screen Legend', label: 'Screen Actors', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono-tech flex items-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-[#D4AF37] text-[#0A0A0C] font-semibold shadow'
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

      {/* Fluent Full-Width Portrait Grid (No Sticky Sidebars!) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {filteredLuminaries.map((lum) => {
          const era = getEraById(lum.eraId);
          return (
            <article
              key={lum.id}
              onClick={() => setActiveLuminaryModal(lum)}
              className="rounded-lg overflow-hidden bg-[#121318]/95 border border-[#F4F0EA]/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 shadow-lg"
            >
              <div className="relative h-56 w-full overflow-hidden">
                {renderPortrait(lum)}
                {lum.isUndergroundIcon && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#C83E31]/90 text-[#F4F0EA] text-[9px] font-mono-tech uppercase tracking-wider">
                    Cult
                  </span>
                )}
                <span
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono-tech font-semibold backdrop-blur-md"
                  style={{
                    backgroundColor: '#0A0A0CCC',
                    color: era.accentColor,
                    border: `1px solid ${era.accentColor}55`,
                  }}
                >
                  {lum.nationality}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#F4F0EA] group-hover:text-[#D4AF37] transition leading-tight">
                    {lum.name}
                  </h2>
                  <div className="text-[11px] font-mono-tech text-[#A39E93] line-clamp-1 mt-0.5">
                    {lum.titleBadge}
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-[#F4F0EA]/10 flex items-center justify-between text-[11px] font-mono-tech text-[#D4AF37]">
                  <span className="truncate text-[#A39E93]">{lum.essentialFilms[0]?.title}</span>
                  <span className="shrink-0 ml-1">Profile →</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Clean Modal Dossier When a Director/Actor Card is Clicked */}
      {activeLuminaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveLuminaryModal(null)}
            className="fixed inset-0 bg-[#050507]/85 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-lg bg-[#161821] border border-[#D4AF37]/45 shadow-[0_25px_90px_rgba(0,0,0,0.95)] text-[#F4F0EA]">
            <div className="relative h-64 w-full bg-[#090A0E]">
              {renderPortrait(activeLuminaryModal, true)}
              <button
                onClick={() => setActiveLuminaryModal(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0A0A0C]/80 hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0A0A0C] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#0A0A0C]/85 border border-[#D4AF37]/40 text-[10px] font-mono-tech uppercase tracking-widest text-[#D4AF37] mb-1">
                  <span>{activeLuminaryModal.role}</span>
                  <span>·</span>
                  <span>{activeLuminaryModal.nationality}</span>
                  <span>·</span>
                  <span>{activeLuminaryModal.birthDeath}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F0EA] leading-tight">
                  {activeLuminaryModal.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="text-xs font-mono-tech text-[#D4AF37]">
                {activeLuminaryModal.signatureStyle}
              </div>

              <p className="text-sm text-[#F4F0EA]/90 leading-relaxed">
                {activeLuminaryModal.biography}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {activeLuminaryModal.keyTechniques.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#0A0A0C] border border-[#F4F0EA]/12 text-xs font-mono-tech text-[#D4AF37]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#F4F0EA]/10">
                <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#A39E93] mb-2 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Essential Works
                </div>
                <div className="space-y-2">
                  {activeLuminaryModal.essentialFilms.map((ef, i) => {
                    const linkedMilestone = ef.milestoneId
                      ? getMilestoneById(ef.milestoneId)
                      : undefined;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 p-3 rounded bg-[#121318] border border-[#F4F0EA]/10"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#F4F0EA]">
                            {ef.title}{' '}
                            <span className="font-mono-tech text-xs text-[#D4AF37]">
                              ({ef.year})
                            </span>
                          </div>
                          <div className="text-xs text-[#A39E93]">{ef.roleNote}</div>
                        </div>

                        {linkedMilestone && (
                          <button
                            onClick={() => {
                              setActiveLuminaryModal(null);
                              onJumpToMilestone(linkedMilestone);
                            }}
                            className="px-3 py-1.5 rounded bg-[#D4AF37] text-[#0A0A0C] text-xs font-mono-tech font-bold flex items-center gap-1 transition shrink-0 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Inspect Film
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <blockquote className="p-4 rounded bg-[#0A0A0C] border-l-2 border-[#D4AF37]">
                <p className="font-display italic text-lg text-[#F4F0EA]">
                  “{activeLuminaryModal.quote}”
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
