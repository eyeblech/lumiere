import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Aperture, Maximize, Sliders, Film } from 'lucide-react';
import { AspectRatioSpec } from '../data/types';

interface OpticalLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ASPECT_SPECS: {
  ratio: AspectRatioSpec;
  name: string;
  era: string;
  widthPct: number;
  heightPct: number;
  notes: string;
}[] = [
  {
    ratio: '1.33:1',
    name: 'Silent Full Aperture (4:3)',
    era: '1895–1928 (Edison / Lumière Standard)',
    widthPct: 56,
    heightPct: 76,
    notes: 'Used the entire 24mm × 18mm 4-perforation 35mm negative area from sprocket to sprocket before optical soundtracks existed.',
  },
  {
    ratio: '1.37:1',
    name: 'Academy Standard Ratio',
    era: '1932–1952 (Classical Golden Age)',
    widthPct: 58,
    heightPct: 76,
    notes: 'Standardized by AMPAS in 1932 to reserve a strip on the left side of the 35mm print for the optical soundtrack while restoring balanced proportions.',
  },
  {
    ratio: '1.85:1',
    name: 'American Widescreen Flat',
    era: '1953–Present (New Hollywood & Drama Standard)',
    widthPct: 78,
    heightPct: 76,
    notes: 'Achieved with spherical lenses by masking the top and bottom of the 35mm gate—the preferred canvas of Coppola, Spielberg (Jurassic Park), and Miyazaki.',
  },
  {
    ratio: '2.39:1',
    name: 'Panavision / CinemaScope Anamorphic',
    era: '1953–Present (Widescreen Epics)',
    widthPct: 96,
    heightPct: 72,
    notes: 'Uses a cylindrical anamorphic lens element to squeeze a 2x wider horizontal field of view onto standard 4-perf 35mm film, then desqueezes it on projection.',
  },
  {
    ratio: '1.43:1',
    name: '15-Perforation 70mm IMAX',
    era: '2008–Present (Nolan / Villeneuve Large Format)',
    widthPct: 76,
    heightPct: 96,
    notes: 'Runs 65mm film horizontally across 15 perforations per frame—yielding 10x the negative area of 35mm and towering vertical immersion.',
  },
];

export const OpticalLabModal: React.FC<OpticalLabModalProps> = ({ isOpen, onClose }) => {
  const [fps, setFps] = useState<number>(16);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [shutterEnabled, setShutterEnabled] = useState<boolean>(true);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioSpec>('2.39:1');
  const [showAnamorphicSqueeze, setShowAnamorphicSqueeze] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const intervalMs = Math.max(16, Math.round(1000 / fps));
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 12);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, fps]);

  if (!isOpen) return null;

  const currentSpec = ASPECT_SPECS.find((s) => s.ratio === selectedRatio) || ASPECT_SPECS[3];

  // Procedural 12-phase galloping horse leg angles based on Eadweard Muybridge Plate 38
  const phase = (frameIndex / 12) * Math.PI * 2;
  const frontLeg1 = Math.sin(phase) * 38;
  const frontLeg2 = Math.sin(phase + 1.1) * 38;
  const backLeg1 = Math.cos(phase) * 40;
  const backLeg2 = Math.cos(phase + 1.1) * 40;
  const bodyBob = Math.abs(Math.sin(phase)) * 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050507]/85 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#121318] border border-[#D4AF37]/40 shadow-[0_25px_90px_rgba(0,0,0,0.95)] text-[#F4F0EA]">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121318]/95 backdrop-blur-md border-b border-[#F4F0EA]/10">
          <div className="flex items-center gap-2.5">
            <Aperture className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-display text-2xl font-bold text-[#F4F0EA]">
                The Optical Laboratory // Mechanics of Motion &amp; Aspect Ratio
              </h2>
              <p className="text-xs font-mono-tech text-[#A39E93]">
                INTERACTIVE PERSISTENCE OF VISION ZOETROPE &amp; 35MM/70MM GATE COMPARATOR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#181A22] hover:bg-[#D4AF37]/20 text-[#A39E93] hover:text-[#F4F0EA] border border-[#F4F0EA]/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT MODULE: 1878 Zoetrope & Persistence of Vision Simulator */}
          <div className="p-5 rounded-lg bg-[#181A22] border border-[#F4F0EA]/10 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37]">
                  Exhibit A · 1878 Chronophotography
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0A0A0C] text-xs font-mono-tech text-[#D4AF37] border border-[#D4AF37]/30">
                  {fps} FPS · FRAME {(frameIndex + 1).toString().padStart(2, '0')}/12
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F4F0EA]">
                Persistence of Vision &amp; Rotary Shutter
              </h3>
              <p className="text-xs text-[#A39E93] mt-1 leading-relaxed">
                Below ~10 frames per second, the human brain perceives separate still photographs. At 16–24 FPS with a dark rotary shutter blade interrupting the light between pull-downs, discrete images fuse into continuous motion (Phi phenomenon).
              </p>
            </div>

            {/* Live Animated Zoetrope Viewport */}
            <div className="relative h-56 rounded bg-[#0A0A0C] border border-[#F4F0EA]/15 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 360 180" className="w-full h-full">
                {/* Palo Alto Grid Backdrop */}
                <rect x="0" y="20" width="360" height="125" fill="#E6CCB2" opacity="0.92" />
                {Array.from({ length: 15 }).map((_, i) => (
                  <line
                    key={i}
                    x1={((i * 26 - frameIndex * 6 + 360) % 360)}
                    y1="20"
                    x2={((i * 26 - frameIndex * 6 + 360) % 360)}
                    y2="145"
                    stroke="#2B2118"
                    strokeWidth="0.8"
                    opacity="0.3"
                  />
                ))}
                <line x1="0" y1="132" x2="360" y2="132" stroke="#2B2118" strokeWidth="2.5" />

                {/* Animated Galloping Horse (with optional vertical blur if shutter is disabled!) */}
                <g
                  transform={`translate(155, ${68 - bodyBob})`}
                  opacity={shutterEnabled ? 1 : 0.55}
                >
                  {/* Torso */}
                  <ellipse cx="25" cy="18" rx="34" ry="14" fill="#1E1610" />
                  {/* Neck & Head */}
                  <path d="M52 12 L76 -4 L88 4 L82 12 L56 22 Z" fill="#1E1610" />
                  {/* Jockey */}
                  <circle cx="34" cy="-8" r="5.5" fill="#1E1610" />
                  <path d="M20 8 Q30 -4 40 4 L30 16 Z" fill="#1E1610" />
                  {/* Animated Front Legs */}
                  <line
                    x1="48"
                    y1="24"
                    x2={48 + Math.sin((frontLeg1 * Math.PI) / 180) * 32}
                    y2={24 + Math.cos((frontLeg1 * Math.PI) / 180) * 32}
                    stroke="#1E1610"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="44"
                    y1="24"
                    x2={44 + Math.sin((frontLeg2 * Math.PI) / 180) * 30}
                    y2={24 + Math.cos((frontLeg2 * Math.PI) / 180) * 30}
                    stroke="#1E1610"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Animated Hind Legs */}
                  <line
                    x1="0"
                    y1="22"
                    x2={Math.sin((backLeg1 * Math.PI) / 180) * 32}
                    y2={22 + Math.cos((backLeg1 * Math.PI) / 180) * 32}
                    stroke="#1E1610"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-4"
                    y1="22"
                    x2={-4 + Math.sin((backLeg2 * Math.PI) / 180) * 30}
                    y2={22 + Math.cos((backLeg2 * Math.PI) / 180) * 30}
                    stroke="#1E1610"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>

                {/* If Rotary Shutter is OFF, show vertical celluloid pull-down smear! */}
                {!shutterEnabled && (
                  <rect x="110" y="20" width="140" height="125" fill="#1E1610" opacity="0.22" />
                )}

                {/* Spinning Rotary Shutter Indicator in Bottom-Right */}
                <g transform="translate(320, 152)">
                  <circle cx="0" cy="0" r="18" fill="#0A0A0C" stroke="#D4AF37" strokeWidth="1.5" />
                  <path
                    d="M0,0 L16,0 A16,16 0 0,1 0,16 Z M0,0 L-16,0 A16,16 0 0,1 0,-16 Z"
                    fill="#D4AF37"
                    transform={`rotate(${frameIndex * 30})`}
                  />
                </g>
              </svg>
            </div>

            {/* Interactive Zoetrope Controls */}
            <div className="space-y-3 pt-2 border-t border-[#F4F0EA]/10">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-1.5 rounded bg-[#D4AF37] text-[#0A0A0C] font-mono-tech text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause Drum' : 'Spin Drum'}
                </button>

                <button
                  onClick={() => setShutterEnabled(!shutterEnabled)}
                  className={`px-3 py-1.5 rounded text-xs font-mono-tech border transition cursor-pointer ${
                    shutterEnabled
                      ? 'bg-[#121318] border-[#10B981]/50 text-[#10B981]'
                      : 'bg-[#C83E31]/20 border-[#C83E31] text-[#F4F0EA]'
                  }`}
                >
                  Rotary Shutter: {shutterEnabled ? 'ENGAGED (Clean)' : 'BYPASSED (Vertical Smear)'}
                </button>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono-tech text-[#A39E93] mb-1">
                  <span>Frame Rate Cadence</span>
                  <div className="flex gap-2">
                    {[2, 12, 16, 24, 48].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setFps(preset)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          fps === preset
                            ? 'bg-[#D4AF37] text-[#0A0A0C] font-bold'
                            : 'bg-[#0A0A0C] text-[#A39E93]'
                        }`}
                      >
                        {preset}fps
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={48}
                  value={fps}
                  onChange={(e) => setFps(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* RIGHT MODULE: Interactive Aspect Ratio & Anamorphic Desqueeze Comparator */}
          <div className="p-5 rounded-lg bg-[#181A22] border border-[#F4F0EA]/10 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37]">
                  Exhibit B · Evolution of the Frame Gate
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0A0A0C] text-xs font-mono-tech text-[#D4AF37] border border-[#D4AF37]/30">
                  ACTIVE GATE: {currentSpec.ratio}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F4F0EA]">
                Aspect Ratio &amp; Anamorphic Optics
              </h3>
              <p className="text-xs text-[#A39E93] mt-1 leading-relaxed">
                Compare how the geometry of the motion picture screen evolved from Edison’s 1.33:1 silent aperture to 2.39:1 Panavision anamorphic widescreen and towering 1.43:1 70mm IMAX.
              </p>
            </div>

            {/* Interactive Frame Gate Stage */}
            <div className="relative h-56 rounded bg-[#07080B] border border-[#F4F0EA]/15 flex items-center justify-center overflow-hidden p-3">
              <div
                style={{
                  width: `${showAnamorphicSqueeze && selectedRatio === '2.39:1' ? 48 : currentSpec.widthPct}%`,
                  height: `${currentSpec.heightPct}%`,
                }}
                className="relative transition-all duration-500 ease-out border-2 border-[#D4AF37] rounded-xs overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-[#0F172A]"
              >
                <svg
                  viewBox="0 0 400 225"
                  preserveAspectRatio="none"
                  className="w-full h-full block"
                >
                  <rect width="400" height="225" fill="#0F172A" />
                  {/* Monument Valley / Arrakis Horizon Scene */}
                  <circle cx="280" cy="70" r="32" fill="#F59E0B" opacity="0.85" />
                  <polygon points="40,165 95,85 150,165" fill="#1E293B" />
                  <polygon points="240,165 310,65 375,165" fill="#1E293B" />
                  <rect x="0" y="162" width="400" height="63" fill="#1C130C" />
                  {/* Lone Rider in Center */}
                  <circle cx="195" cy="135" r="7" fill="#F4F0EA" />
                  <path d="M183 144 L207 144 L212 182 L178 182 Z" fill="#D4AF37" />
                  {/* Horizontal Blue Anamorphic Lens Flare when 2.39:1 is active */}
                  {selectedRatio === '2.39:1' && (
                    <ellipse cx="200" cy="70" rx="190" ry="3.5" fill="#38BDF8" opacity="0.75" />
                  )}
                </svg>

                <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-[#0A0A0C]/85 text-[10px] font-mono-tech text-[#D4AF37]">
                  {currentSpec.ratio} · {currentSpec.name}
                </div>
              </div>
            </div>

            {/* Ratio Selector Pills & Notes */}
            <div className="space-y-3 pt-2 border-t border-[#F4F0EA]/10">
              <div className="flex flex-wrap gap-1.5">
                {ASPECT_SPECS.map((spec) => (
                  <button
                    key={spec.ratio}
                    onClick={() => {
                      setSelectedRatio(spec.ratio);
                      if (spec.ratio !== '2.39:1') setShowAnamorphicSqueeze(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono-tech border transition cursor-pointer ${
                      selectedRatio === spec.ratio
                        ? 'bg-[#D4AF37] text-[#0A0A0C] border-[#D4AF37] font-bold'
                        : 'bg-[#0A0A0C] text-[#A39E93] border-[#F4F0EA]/10 hover:text-[#F4F0EA]'
                    }`}
                  >
                    {spec.ratio}
                  </button>
                ))}

                {selectedRatio === '2.39:1' && (
                  <button
                    onClick={() => setShowAnamorphicSqueeze(!showAnamorphicSqueeze)}
                    className="ml-auto px-2.5 py-1 rounded text-[11px] font-mono-tech bg-[#38BDF8]/15 border border-[#38BDF8]/50 text-[#38BDF8] cursor-pointer"
                  >
                    {showAnamorphicSqueeze ? 'Desqueeze 2x (Projector)' : 'Show 2x Squeeze on Negative'}
                  </button>
                )}
              </div>

              <div className="p-2.5 rounded bg-[#0A0A0C] border border-[#F4F0EA]/10 text-xs text-[#A39E93]">
                <span className="text-[#D4AF37] font-mono-tech font-semibold mr-1.5">
                  {currentSpec.era}:
                </span>
                {currentSpec.notes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
