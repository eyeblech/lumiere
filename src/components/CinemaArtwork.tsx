import React, { useState } from 'react';
import { CinemaMilestone } from '../data/types';

interface CinemaArtworkProps {
  milestone: CinemaMilestone;
  className?: string;
  overlayMode?: 'clean' | 'thirds' | 'spiral' | 'gate';
  enforceAspectRatio?: boolean;
  interactiveHover?: boolean;
  preferSchematic?: boolean;
  lightweight3D?: boolean;
}

export const CinemaArtwork: React.FC<CinemaArtworkProps> = ({
  milestone,
  className = '',
  overlayMode = 'clean',
  enforceAspectRatio = true,
  interactiveHover = false,
  preferSchematic = false,
  lightweight3D = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [c1, c2, c3] = milestone.colorPalette;
  const uid = `art-${milestone.id}`;
  const showRealPoster = Boolean(milestone.posterUrl && !imgError && !preferSchematic);

  // Map historical aspect ratio to CSS aspect-ratio string for authentic framing
  const getAspectClass = () => {
    if (!enforceAspectRatio) return 'w-full h-full';
    switch (milestone.aspectRatio) {
      case '1.33:1':
        return 'aspect-[4/3]';
      case '1.37:1':
        return 'aspect-[11/8]';
      case '1.43:1':
        return 'aspect-[143/100]';
      case '1.66:1':
        return 'aspect-[5/3]';
      case '1.85:1':
        return 'aspect-[37/20]';
      case '2.20:1':
        return 'aspect-[11/5]';
      case '2.39:1':
        return 'aspect-[239/100]';
      default:
        return 'aspect-[16/10]';
    }
  };

  const renderSceneArtwork = () => {
    switch (milestone.artSceneKey) {
      case 'horse-in-motion':
        return (
          <g>
            {/* Palo Alto Numbered Measurement Wall */}
            <rect x="0" y="30" width="400" height="150" fill="#E6CCB2" opacity="0.9" />
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i}>
                <line x1={i * 25} y1="30" x2={i * 25} y2="180" stroke="#2B2118" strokeWidth="0.8" opacity="0.35" />
                <text x={i * 25 + 4} y="44" fill="#2B2118" fontSize="6" fontFamily="monospace" opacity="0.6">
                  {i + 1}
                </text>
              </g>
            ))}
            <line x1="0" y1="158" x2="400" y2="158" stroke="#2B2118" strokeWidth="2" />
            {/* Airborne Galloping Horse & Jockey Silhouette (Frame 3 Suspension Phase) */}
            <g transform="translate(120, 68)">
              {/* Horse torso */}
              <ellipse cx="75" cy="40" rx="44" ry="17" fill="#1E1610" />
              {/* Neck & Head */}
              <path d="M108 32 L138 14 L152 22 L145 30 L116 44 Z" fill="#1E1610" />
              {/* Tucked airborne legs (all four off the ground!) */}
              <path d="M98 50 L82 68 L64 62" stroke="#1E1610" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path d="M106 52 L95 72 L78 69" stroke="#1E1610" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M44 48 L66 69 L80 62" stroke="#1E1610" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path d="M36 44 L55 66 L70 65" stroke="#1E1610" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Streaming Tail */}
              <path d="M33 34 Q8 28 2 45 Q18 46 34 42 Z" fill="#1E1610" />
              {/* Jockey leaning forward */}
              <circle cx="88" cy="10" r="6.5" fill="#1E1610" />
              <path d="M72 28 Q82 14 94 22 L84 36 Z" fill="#1E1610" />
            </g>
            {/* Ghosted Multi-Frame Contact Sheet Strip at Bottom */}
            <rect x="0" y="180" width="400" height="45" fill="#18120D" />
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <g key={idx} transform={`translate(${14 + idx * 64}, 186)`}>
                <rect x="0" y="0" width="54" height="32" fill="#D8BC9C" rx="1" />
                <ellipse cx="27" cy="16" rx="13" ry="5" fill="#2B2118" />
                <circle cx="32" cy="9" r="2.5" fill="#2B2118" />
              </g>
            ))}
          </g>
        );

      case 'lumiere-train':
        return (
          <g>
            {/* Diagonal Station Platform & Mediterranean Sky */}
            <polygon points="0,225 400,225 400,85 110,95" fill="#26201B" />
            {/* Perspective Railway Tracks */}
            <line x1="115" y1="95" x2="10" y2="225" stroke="#D4A373" strokeWidth="2.5" />
            <line x1="125" y1="95" x2="195" y2="225" stroke="#D4A373" strokeWidth="3.5" />
            {/* Steam Locomotive Hurtling Down Z-Axis */}
            <g transform="translate(55, 58)">
              {/* Billowing White Steam Cloud */}
              <circle cx="80" cy="18" r="24" fill="#FAEDCD" opacity="0.65" />
              <circle cx="110" cy="10" r="32" fill="#FAEDCD" opacity="0.45" />
              <circle cx="145" cy="15" r="26" fill="#FAEDCD" opacity="0.3" />
              {/* Boiler & Smokestack */}
              <polygon points="35,45 135,52 135,105 25,115" fill="#161311" stroke="#D4A373" strokeWidth="1.2" />
              <rect x="48" y="22" width="14" height="28" fill="#161311" stroke="#D4A373" strokeWidth="1" />
              {/* Bright Brass Boiler Front & Headlamp */}
              <circle cx="48" cy="80" r="28" fill="#231F1C" stroke="#D4A373" strokeWidth="2.5" />
              <circle cx="48" cy="80" r="9" fill="#FAEDCD" />
              <circle cx="48" cy="80" r="18" fill="#D4A373" opacity="0.25" />
              {/* Iron Wheels */}
              <circle cx="52" cy="120" r="14" fill="#161311" stroke="#D4A373" strokeWidth="2" />
              <circle cx="92" cy="116" r="13" fill="#161311" stroke="#D4A373" strokeWidth="2" />
              <circle cx="126" cy="112" r="11" fill="#161311" stroke="#D4A373" strokeWidth="1.5" />
            </g>
            {/* Waiting Passengers on Right Platform */}
            <g fill="#FAEDCD" opacity="0.82">
              <ellipse cx="290" cy="112" rx="11" ry="4" />
              <path d="M282 120 L298 120 L304 185 L276 185 Z" fill="#3D312A" stroke="#D4A373" strokeWidth="0.8" />
              <ellipse cx="335" cy="122" rx="9" ry="3.5" />
              <path d="M328 128 L342 128 L346 190 L324 190 Z" fill="#2B221C" stroke="#D4A373" strokeWidth="0.8" />
            </g>
          </g>
        );

      case 'trip-to-the-moon':
        return (
          <g>
            {/* Star-Strewn Painted Velvet Night Sky */}
            {[
              [45, 38], [92, 75], [320, 42], [355, 95], [68, 165], [330, 175], [140, 28], [270, 30],
            ].map(([sx, sy], i) => (
              <polygon
                key={i}
                points={`${sx},${sy - 7} ${sx + 2},${sy - 2} ${sx + 7},${sy} ${sx + 2},${sy + 2} ${sx},${sy + 7} ${sx - 2},${sy + 2} ${sx - 7},${sy} ${sx - 2},${sy - 2}`}
                fill="#E9C46A"
                opacity="0.85"
              />
            ))}
            {/* Decorative Clouds */}
            <path d="M20 190 Q70 165 130 188 Q195 168 265 190 Q335 168 390 195 L400 225 L0 225 Z" fill="#264653" opacity="0.7" />
            {/* Iconic Man in the Moon */}
            <circle cx="200" cy="110" r="68" fill="#F4E2B8" stroke="#E9C46A" strokeWidth="3" />
            <circle cx="200" cy="110" r="58" fill="none" stroke="#D4A373" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Left Eye */}
            <circle cx="174" cy="94" r="9" fill="#1D3557" />
            <circle cx="176" cy="92" r="3" fill="#F4F0EA" />
            {/* Grimacing Mouth & Nose */}
            <path d="M196 96 L188 120 L204 122" stroke="#5C4738" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M168 142 Q200 126 232 144 Q202 158 168 142 Z" fill="#5C4738" />
            {/* Hand-Colored Artillery Capsule Piercing the Right Eye! */}
            <g transform="translate(222, 88) rotate(-22)">
              <path d="M-24 0 L18 -13 L58 -13 L58 13 L18 13 Z" fill="#E76F51" stroke="#F4F0EA" strokeWidth="1.5" />
              <circle cx="26" cy="0" r="5" fill="#E9C46A" />
              <circle cx="42" cy="0" r="5" fill="#E9C46A" />
              {/* Impact Cream Drops */}
              <path d="M-15 8 Q-20 24 -12 32" stroke="#E76F51" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          </g>
        );

      case 'caligari':
        return (
          <g>
            {/* Jagged Expressionist Tilted Architecture & Painted Shadows */}
            <polygon points="0,0 165,0 115,225 0,225" fill="#1B202B" />
            <polygon points="400,0 245,0 295,225 400,225" fill="#171B24" />
            {/* Harsh White Calcimine Light Shards Painted onto Floor & Walls */}
            <polygon points="165,0 245,0 310,225 85,225" fill="#D4A373" opacity="0.22" />
            <polygon points="185,15 225,35 265,225 135,225" fill="#E2E8F0" opacity="0.78" />
            {/* Skewed Expressionist Window Frame */}
            <polygon points="45,45 105,65 90,135 35,115" fill="#D4A373" opacity="0.7" />
            <line x1="75" y1="55" x2="62" y2="125" stroke="#14171F" strokeWidth="4" />
            <line x1="40" y1="80" x2="98" y2="100" stroke="#14171F" strokeWidth="4" />
            {/* Cesare the Somnambulist Gliding Silhouette */}
            <path d="M188 72 L205 64 L222 105 L245 88 L215 135 L230 205 L208 205 L198 155 L182 205 L168 205 L184 135 L155 102 Z" fill="#0B0D12" />
            <circle cx="198" cy="58" r="10" fill="#E2E8F0" />
            <circle cx="194" cy="57" r="2.8" fill="#0B0D12" />
            <circle cx="202" cy="57" r="2.8" fill="#0B0D12" />
          </g>
        );

      case 'sherlock-jr':
        return (
          <g>
            {/* Outer Theater Proscenium Arch & Seated Audience Silhouettes */}
            <rect x="0" y="0" width="400" height="225" fill="#121215" />
            {/* Curtain Swags */}
            <path d="M0 0 L80 0 Q65 95 40 185 L0 185 Z" fill="#2A2725" />
            <path d="M400 0 L320 0 Q335 95 360 185 L400 185 Z" fill="#2A2725" />
            {/* Projector Beam Cone from Back of Theater */}
            <polygon points="0,0 400,25 305,165 95,165" fill="#F4F0EA" opacity="0.09" />
            {/* Inner Silver Screen (Movie Within a Movie) */}
            <rect x="95" y="25" width="210" height="140" fill="#D6CCC2" stroke="#F4F0EA" strokeWidth="3" />
            <rect x="103" y="33" width="194" height="124" fill="#2B2A29" />
            {/* Buster Keaton in Porkpie Hat Crossing the Threshold Into the Screen */}
            <g transform="translate(182, 65)">
              {/* Porkpie Hat */}
              <ellipse cx="18" cy="8" rx="16" ry="3.5" fill="#E5E5E5" />
              <rect x="7" y="1" width="22" height="7" fill="#D4D4D4" />
              {/* Head & Suit */}
              <circle cx="18" cy="17" r="8" fill="#F4F0EA" />
              <path d="M6 28 L30 28 L34 72 L2 72 Z" fill="#E5E5E5" />
              <path d="M12 72 L12 105 M24 72 L24 105" stroke="#E5E5E5" strokeWidth="6" />
            </g>
            {/* Audience Heads in Foreground */}
            {[55, 105, 155, 205, 255, 305, 345].map((ax, i) => (
              <circle key={i} cx={ax} cy="212" r="14" fill="#08080A" />
            ))}
          </g>
        );

      case 'battleship-potemkin':
        return (
          <g>
            {/* Rhythmic Diagonal Odessa Stone Steps */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={35 + i * 16}
                x2="400"
                y2={10 + i * 18}
                stroke="#CBD5E1"
                strokeWidth="3.5"
                opacity={0.35 + i * 0.05}
              />
            ))}
            {/* Diagonal Shadow of Marching Cossack Rifles */}
            {[30, 65, 100, 135, 170].map((rx, i) => (
              <line key={i} x1={rx} y1="0" x2={rx + 95} y2="115" stroke="#94A3B8" strokeWidth="2.5" opacity="0.65" />
            ))}
            {/* The Runaway Baby Carriage Hurtling Down the Steps */}
            <g transform="translate(210, 95) rotate(14)">
              {/* Pram Hood & Basket */}
              <path d="M0 28 L52 28 L44 52 L8 52 Z" fill="#0F172A" stroke="#F4F0EA" strokeWidth="1.5" />
              <path d="M2 28 Q6 -4 34 4 L28 28 Z" fill="#1E293B" stroke="#F4F0EA" strokeWidth="1.5" />
              {/* Spoked Pram Wheels */}
              <circle cx="12" cy="60" r="11" fill="none" stroke="#F4F0EA" strokeWidth="2" />
              <circle cx="42" cy="60" r="11" fill="none" stroke="#F4F0EA" strokeWidth="2" />
            </g>
            {/* Hand-Stenciled Revolutionary Red Flag Accent */}
            <polygon points="285,18 375,12 365,52 285,48" fill="#C83E31" />
            <line x1="285" y1="12" x2="285" y2="85" stroke="#F4F0EA" strokeWidth="2.5" />
          </g>
        );

      case 'metropolis':
        return (
          <g>
            {/* Art Deco Skyscraper Canyons & Skybridges */}
            <rect x="20" y="25" width="55" height="200" fill="#1E293B" />
            <rect x="325" y="25" width="55" height="200" fill="#1E293B" />
            <polygon points="135,225 170,25 230,25 265,225" fill="#334155" opacity="0.7" />
            {/* Radial Sunburst & Searchlight Beams Behind the Tower of Babel */}
            {[-40, -20, 0, 20, 40].map((angle, i) => (
              <polygon
                key={i}
                points="200,115 165,0 235,0"
                fill="#D4AF37"
                opacity="0.16"
                transform={`rotate(${angle}, 200, 115)`}
              />
            ))}
            {/* Glowing Transformation Rings Around the Maschinenmensch (Robot Maria) */}
            <ellipse cx="200" cy="82" rx="58" ry="12" fill="none" stroke="#F4F0EA" strokeWidth="2.5" opacity="0.9" />
            <ellipse cx="200" cy="115" rx="64" ry="14" fill="none" stroke="#D4AF37" strokeWidth="3" />
            <ellipse cx="200" cy="148" rx="58" ry="12" fill="none" stroke="#F4F0EA" strokeWidth="2.5" opacity="0.9" />
            {/* Metallic Art Deco Gynoid Silhouette */}
            <circle cx="200" cy="68" r="13" fill="#D4AF37" stroke="#F4F0EA" strokeWidth="1.5" />
            <path d="M180 88 L220 88 L212 138 L224 195 L176 195 L188 138 Z" fill="#D4AF37" stroke="#F4F0EA" strokeWidth="1.2" />
          </g>
        );

      case 'city-lights':
        return (
          <g>
            {/* Warm Nocturnal Streetlamp Halo */}
            <circle cx="135" cy="65" r="55" fill="#E5C358" opacity="0.22" />
            <circle cx="135" cy="65" r="24" fill="#F4F0EA" opacity="0.85" />
            <line x1="135" y1="88" x2="135" y2="215" stroke="#94A3B8" strokeWidth="4" />
            {/* The Little Tramp Silhouette & Single Red Rose */}
            <g transform="translate(185, 72)">
              {/* Bowler Hat */}
              <ellipse cx="28" cy="18" rx="22" ry="4" fill="#090A0F" />
              <path d="M12 18 Q12 0 28 0 Q44 0 44 18 Z" fill="#090A0F" />
              {/* Head & Mustache */}
              <circle cx="28" cy="30" r="12" fill="#E2E8F0" />
              <rect x="24" y="33" width="8" height="3" fill="#090A0F" />
              {/* Coat & Baggy Trousers */}
              <path d="M10 44 L46 44 L52 102 L4 102 Z" fill="#090A0F" />
              {/* Bamboo Cane */}
              <path d="M52 75 L64 135" stroke="#D4AF37" strokeWidth="2.5" />
              {/* Single Glowing Rose Held in Hand */}
              <circle cx="0" cy="64" r="6" fill="#E11D48" />
              <line x1="0" y1="70" x2="12" y2="84" stroke="#10B981" strokeWidth="2" />
            </g>
          </g>
        );

      case 'wizard-of-oz':
        return (
          <g>
            {/* Left Side: Sepia Kansas Farmhouse Frame */}
            <rect x="0" y="0" width="115" height="225" fill="#3D2B1F" />
            <rect x="18" y="20" width="82" height="185" fill="#5C4033" stroke="#8B654E" strokeWidth="2" />
            {/* Right Side: Blazing Three-Strip Technicolor Oz */}
            <rect x="115" y="0" width="285" height="225" fill="#0EA5E9" opacity="0.28" />
            {/* Distant Emerald City Spires */}
            <g fill="#10B981" transform="translate(245, 32)">
              <rect x="18" y="20" width="12" height="55" />
              <polygon points="18,20 24,0 30,20" />
              <rect x="34" y="10" width="16" height="65" />
              <polygon points="34,10 42,-12 50,10" />
              <rect x="54" y="25" width="12" height="50" />
            </g>
            {/* Spiral Golden Yellow Brick Road */}
            <path
              d="M275 105 C210 115, 345 145, 245 175 C180 195, 290 215, 385 225 L145 225 C140 185, 220 140, 275 105 Z"
              fill="#F59E0B"
              stroke="#FEF08A"
              strokeWidth="1.5"
            />
            {/* Ruby Slippers & Poppy Accent */}
            <circle cx="170" cy="188" r="7" fill="#E11D48" />
            <circle cx="188" cy="192" r="7" fill="#E11D48" />
          </g>
        );

      case 'citizen-kane':
        return (
          <g>
            {/* Towering Volumetric Projector & Skylight Shafts inside Xanadu */}
            <polygon points="65,0 135,0 340,225 180,225" fill="#F4F0EA" opacity="0.18" />
            <polygon points="155,0 205,0 395,225 295,225" fill="#D4AF37" opacity="0.14" />
            {/* Giant Wrought-Iron 'K' Gate & Rosebud Snowglobe */}
            <circle cx="195" cy="112" r="56" fill="#182232" stroke="#D4AF37" strokeWidth="2.5" />
            {/* Falling Snowflakes inside the Globe */}
            {[
              [175, 85], [215, 78], [165, 110], [225, 105], [190, 95], [208, 122], [180, 128],
            ].map(([sx, sy], i) => (
              <circle key={i} cx={sx} cy={sy} r="2" fill="#F4F0EA" opacity="0.85" />
            ))}
            {/* Tiny Colorado Cabin Inside Globe */}
            <polygon points="178,132 195,116 212,132" fill="#D4AF37" />
            <rect x="182" y="132" width="26" height="16" fill="#0F141C" stroke="#F4F0EA" strokeWidth="1" />
            {/* Base of Snowglobe & Low-Angle Kane Podium Silhouette */}
            <path d="M155 162 L235 162 L248 188 L142 188 Z" fill="#D4AF37" />
            <text x="195" y="180" textAnchor="middle" fill="#0F141C" fontSize="9" fontWeight="bold" fontFamily="serif" letterSpacing="3">
              ROSEBUD
            </text>
          </g>
        );

      case 'bicycle-thieves':
        return (
          <g>
            {/* Long Post-War Roman Evening Street Perspective */}
            <polygon points="0,40 165,115 165,155 0,225" fill="#272A30" />
            <polygon points="400,40 235,115 235,155 400,225" fill="#202328" />
            <polygon points="165,145 235,145 400,225 0,225" fill="#32363E" />
            {/* Distant Warm Sunset Horizon */}
            <circle cx="200" cy="128" r="38" fill="#D4A373" opacity="0.4" />
            {/* Father (Antonio) & Little Son (Bruno) Holding Hands Walking Down the Street */}
            <g transform="translate(172, 115)">
              {/* Father */}
              <circle cx="14" cy="10" r="6" fill="#0F1115" />
              <path d="M4 18 L24 18 L22 54 L6 54 Z" fill="#0F1115" />
              <line x1="10" y1="54" x2="8" y2="85" stroke="#0F1115" strokeWidth="4.5" />
              <line x1="18" y1="54" x2="20" y2="85" stroke="#0F1115" strokeWidth="4.5" />
              {/* Son Bruno */}
              <circle cx="42" cy="32" r="4.5" fill="#0F1115" />
              <path d="M35 38 L49 38 L47 62 L37 62 Z" fill="#0F1115" />
              <line x1="39" y1="62" x2="38" y2="85" stroke="#0F1115" strokeWidth="3.5" />
              <line x1="45" y1="62" x2="46" y2="85" stroke="#0F1115" strokeWidth="3.5" />
              {/* Clasped Hands */}
              <line x1="23" y1="36" x2="36" y2="45" stroke="#D4A373" strokeWidth="2.5" />
            </g>
            {/* Ghosted Fides Bicycle Silhouette in Sky */}
            <g opacity="0.28" transform="translate(155, 34)">
              <circle cx="22" cy="28" r="15" fill="none" stroke="#F4F0EA" strokeWidth="2" />
              <circle cx="68" cy="28" r="15" fill="none" stroke="#F4F0EA" strokeWidth="2" />
              <polygon points="22,28 42,12 68,28 45,28" fill="none" stroke="#F4F0EA" strokeWidth="2" />
            </g>
          </g>
        );

      case 'singin-in-the-rain':
        return (
          <g>
            {/*Diagonal Silver Backlit Rain Streaks */}
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1={i * 18}
                y1="0"
                x2={i * 18 - 35}
                y2="225"
                stroke="#93C5FD"
                strokeWidth="1"
                opacity="0.35"
              />
            ))}
            {/* Wet Shimmering Cobblestone Reflection */}
            <ellipse cx="185" cy="195" rx="95" ry="16" fill="#F59E0B" opacity="0.25" />
            {/* Glowing Cast-Iron Streetlamp */}
            <line x1="175" y1="55" x2="175" y2="198" stroke="#F4F0EA" strokeWidth="4" />
            <circle cx="175" cy="48" r="28" fill="#F59E0B" opacity="0.35" />
            <circle cx="175" cy="48" r="11" fill="#FEF08A" />
            {/* Gene Kelly Leaping Outward from the Lamppost */}
            <g transform="translate(175, 92)">
              <line x1="0" y1="12" x2="32" y2="-4" stroke="#F4F0EA" strokeWidth="3.5" />
              <circle cx="38" cy="-14" r="8" fill="#F4F0EA" />
              <path d="M24 -4 L50 4 L38 42 L18 35 Z" fill="#3B82F6" />
              <line x1="22" y1="36" x2="2" y2="62" stroke="#F4F0EA" strokeWidth="4" />
              <line x1="36" y1="38" x2="58" y2="55" stroke="#F4F0EA" strokeWidth="4" />
              {/* Folded Umbrella Extended in Right Hand */}
              <line x1="48" y1="2" x2="88" y2="-18" stroke="#F59E0B" strokeWidth="3" />
            </g>
          </g>
        );

      case 'seven-samurai':
        return (
          <g>
            {/* Driving Torrential Sengoku Rain & Mist */}
            {Array.from({ length: 28 }).map((_, i) => (
              <line
                key={i}
                x1={i * 16}
                y1="0"
                x2={i * 16 - 45}
                y2="225"
                stroke="#CBD5E1"
                strokeWidth="1.2"
                opacity="0.32"
              />
            ))}
            {/* Burial Mound Hill Horizon */}
            <path d="M0 175 Q200 120 400 180 L400 225 L0 225 Z" fill="#0B0F17" />
            {/* The Seven Katana Blades & The Iconic Six-Circle Village War Banner */}
            {[75, 110, 145, 180, 215, 250, 285].map((kx, i) => (
              <g key={i}>
                <line x1={kx} y1={155 - (i === 3 ? 25 : 10)} x2={kx + 8} y2="65" stroke="#E2E8F0" strokeWidth="2.5" />
                <rect x={kx - 4} y="120" width="12" height="3" fill="#D4AF37" />
              </g>
            ))}
            {/* Kikuchiyo's Tall Bamboo War Banner */}
            <g transform="translate(305, 25)">
              <line x1="0" y1="0" x2="0" y2="160" stroke="#D4AF37" strokeWidth="3" />
              <rect x="3" y="8" width="42" height="105" fill="#F4F0EA" opacity="0.9" />
              {/* Six Circles (Six Samurai) + Triangle (Kikuchiyo) */}
              {[22, 38, 54].map((cy, idx) => (
                <React.Fragment key={idx}>
                  <circle cx="16" cy={cy} r="4.5" fill="#C83E31" />
                  <circle cx="32" cy={cy} r="4.5" fill="#C83E31" />
                </React.Fragment>
              ))}
              <polygon points="24,68 15,82 33,82" fill="#0F172A" />
            </g>
          </g>
        );

      case 'vertigo':
        return (
          <g>
            {/* Saul Bass Inspired Hypnotic Lissajous Spiral & Emerald Neon Glow */}
            <g transform="translate(200, 112)">
              {[95, 78, 62, 48, 35, 24, 15, 8].map((r, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="0"
                  rx={r * 1.35}
                  ry={r * 0.85}
                  fill="none"
                  stroke={i % 2 === 0 ? '#10B981' : '#C83E31'}
                  strokeWidth={2.2 - i * 0.15}
                  transform={`rotate(${i * 18})`}
                  opacity={0.85}
                />
              ))}
              {/* Falling Silhouette in the Bell Tower Vortex */}
              <path d="M-8 -12 L8 -12 L14 14 L-14 14 Z" fill="#F4F0EA" />
              <circle cx="0" cy="-18" r="5" fill="#F4F0EA" />
            </g>
          </g>
        );

      case 'breathless':
        return (
          <g>
            {/* Parisian Boulevard Perspective & Striped Nouvelle Vague Aesthetic */}
            <rect x="0" y="0" width="400" height="225" fill="#0F172A" />
            {/* Breton Stripes & High-Contrast Ilford HPS Grain Bars */}
            {[25, 55, 85, 115, 145, 175].map((y, i) => (
              <rect key={i} x="0" y={y} width="400" height="12" fill="#F8FAFC" opacity="0.08" />
            ))}
            {/* Arc de Triomphe Silhouette at Vanishing Point */}
            <path d="M170 55 L230 55 L230 115 L212 115 L212 80 Q200 70 188 80 L188 115 L170 115 Z" fill="#60A5FA" opacity="0.45" />
            {/* New York Herald Tribune Newspaper & Dark Sunglasses */}
            <g transform="translate(115, 95)">
              <rect x="0" y="0" width="170" height="72" rx="4" fill="#F8FAFC" />
              <text x="85" y="24" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="serif">
                NEW YORK
              </text>
              <text x="85" y="42" textAnchor="middle" fill="#2563EB" fontSize="13" fontWeight="900" fontFamily="serif" letterSpacing="1">
                HERALD TRIBUNE
              </text>
              <line x1="20" y1="54" x2="150" y2="54" stroke="#0F172A" strokeWidth="2" />
            </g>
          </g>
        );

      case 'good-bad-ugly':
        return (
          <g>
            {/* 2.39:1 Techniscope Extreme Close-Up Strip of squinting Eyes */}
            <rect x="0" y="0" width="400" height="225" fill="#2A1E17" />
            {/* Sad Hill Circular Stone Graveyard Rings */}
            <ellipse cx="200" cy="175" rx="165" ry="32" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.55" />
            <ellipse cx="200" cy="175" rx="110" ry="20" fill="none" stroke="#C68B59" strokeWidth="1.5" opacity="0.7" />
            {/* Horizontal Letterbox Extreme Close-Up Band Across Top */}
            <rect x="0" y="38" width="400" height="68" fill="#140E0A" stroke="#D4AF37" strokeWidth="2" />
            {/* Squinting Gunfighter Eyes */}
            <g transform="translate(85, 58)">
              <path d="M0 14 Q38 -4 76 14 Q38 28 0 14 Z" fill="#F4F0EA" />
              <circle cx="38" cy="14" r="10" fill="#38BDF8" />
              <circle cx="38" cy="14" r="4.5" fill="#090D16" />
            </g>
            <g transform="translate(235, 58)">
              <path d="M0 14 Q38 -4 76 14 Q38 28 0 14 Z" fill="#F4F0EA" />
              <circle cx="38" cy="14" r="10" fill="#38BDF8" />
              <circle cx="38" cy="14" r="4.5" fill="#090D16" />
            </g>
            {/* Three Tiny Silhouettes in the Sad Hill Circle */}
            <rect x="95" y="152" width="6" height="22" fill="#090D16" />
            <rect x="200" y="142" width="6" height="22" fill="#090D16" />
            <rect x="305" y="152" width="6" height="22" fill="#090D16" />
          </g>
        );

      case '2001-space-odyssey':
        return (
          <g>
            {/* Cosmic Alignment: Sun, Moon, Earth & The 1:4:9 Black Monolith */}
            <circle cx="200" cy="185" r="130" fill="#1E3A8A" opacity="0.45" />
            <circle cx="200" cy="48" r="24" fill="#38BDF8" opacity="0.35" />
            <circle cx="200" cy="20" r="9" fill="#F4F0EA" />
            {/* The Black Monolith Rising Dead-Center */}
            <rect x="172" y="42" width="56" height="135" fill="#050507" stroke="#60A5FA" strokeWidth="1.2" />
            {/* HAL 9000 Red Optical Lens Glowing in Center */}
            <circle cx="200" cy="110" r="24" fill="#EF4444" opacity="0.25" />
            <circle cx="200" cy="110" r="14" fill="#DC2626" stroke="#CBD5E1" strokeWidth="2.5" />
            <circle cx="200" cy="110" r="5" fill="#FEF08A" />
            <circle cx="195" cy="105" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case 'the-godfather':
        return (
          <g>
            {/* Pitch-Black Gordon Willis Chiaroscuro & Puppeteer Strings */}
            <rect x="0" y="0" width="400" height="225" fill="#0A0908" />
            {/* Overhead Amber Soft-Box Cone */}
            <polygon points="150,0 250,0 320,225 80,225" fill="#D4AF37" opacity="0.12" />
            {/* Puppeteer Control Crossbar & Strings */}
            <g stroke="#F4F0EA" strokeWidth="1.5" opacity="0.88">
              <line x1="135" y1="36" x2="265" y2="24" strokeWidth="4" stroke="#D4AF37" />
              <line x1="155" y1="20" x2="245" y2="42" strokeWidth="4" stroke="#D4AF37" />
              <line x1="145" y1="35" x2="145" y2="115" strokeDasharray="2 2" />
              <line x1="180" y1="32" x2="180" y2="125" strokeDasharray="2 2" />
              <line x1="220" y1="28" x2="220" y2="125" strokeDasharray="2 2" />
              <line x1="255" y1="25" x2="255" y2="115" strokeDasharray="2 2" />
            </g>
            {/* Don Vito Tuxedo Shoulders & Crimson Rose on Lapel */}
            <path d="M115 225 L145 142 L255 142 L285 225 Z" fill="#141210" stroke="#D4AF37" strokeWidth="1" />
            <polygon points="182,142 218,142 200,188" fill="#F4F0EA" />
            {/* Black Bowtie */}
            <polygon points="186,144 214,154 214,144 186,154" fill="#0A0908" />
            {/* Red Lapel Rose */}
            <circle cx="232" cy="168" r="8" fill="#DC2626" />
            <circle cx="232" cy="168" r="4" fill="#991B1B" />
          </g>
        );

      case 'jaws':
        return (
          <g>
            {/* Split Waterline Ocean Depth */}
            <rect x="0" y="0" width="400" height="58" fill="#38BDF8" opacity="0.25" />
            <path d="M0 58 Q100 50 200 58 T400 58 L400 225 L0 225 Z" fill="#07192E" />
            {/* Tiny Swimmer Silhouette on the Surface */}
            <ellipse cx="200" cy="56" rx="18" ry="4" fill="#F4F0EA" />
            <circle cx="218" cy="54" r="4.5" fill="#F4F0EA" />
            {/* Colossal Great White Shark Rising Vertically from the Abyss */}
            <path
              d="M142 225 C145 140, 172 95, 200 82 C228 95, 255 140, 258 225 Z"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="1.5"
            />
            {/* Cavernous Jaws & Serrated Teeth */}
            <path d="M164 148 Q200 112 236 148 Q200 164 164 148 Z" fill="#991B1B" />
            {[-24, -16, -8, 0, 8, 16, 24].map((tx, i) => (
              <polygon key={i} points={`${198 + tx},132 ${202 + tx},132 ${200 + tx},142`} fill="#F8FAFC" />
            ))}
          </g>
        );

      case 'star-wars':
        return (
          <g>
            {/* Tatooine Desert Horizon & Iconic Binary Sunset */}
            <rect x="0" y="0" width="400" height="158" fill="#1E1B4B" opacity="0.45" />
            {/* Upper Golden Sun */}
            <circle cx="135" cy="78" r="28" fill="#FDE047" />
            <circle cx="135" cy="78" r="38" fill="#F59E0B" opacity="0.3" />
            {/* Lower Crimson-Orange Sun */}
            <circle cx="215" cy="116" r="34" fill="#F97316" />
            <circle cx="215" cy="116" r="46" fill="#EF4444" opacity="0.25" />
            {/* Desert Dune Horizon & Moisture Vaporator */}
            <path d="M0 155 Q160 142 400 158 L400 225 L0 225 Z" fill="#1C130C" />
            <line x1="72" y1="118" x2="72" y2="155" stroke="#D4AF37" strokeWidth="2" />
            {/* Luke Skywalker Silhouette Gazing at the Horizon */}
            <circle cx="310" cy="134" r="5.5" fill="#090D16" />
            <path d="M300 141 L320 141 L324 176 L296 176 Z" fill="#090D16" />
          </g>
        );

      case 'blade-runner':
        return (
          <g>
            {/* Cyberpunk 2019 Tyrell Pyramid & Neon Rain Shafts */}
            <polygon points="75,225 155,48 245,48 325,225" fill="#0F172A" stroke="#06B6D4" strokeWidth="1" />
            {/* Horizontal Tyrell Window Lights */}
            {[75, 95, 115, 135, 155, 175].map((py, i) => (
              <line key={i} x1={155 - i * 8} y1={py} x2={245 + i * 8} y2={py} stroke="#F97316" strokeWidth="1.5" opacity="0.55" />
            ))}
            {/* Diagonal Xenon Searchlight Beams Cutting Through Rain */}
            <polygon points="0,0 90,0 380,225 220,225" fill="#06B6D4" opacity="0.16" />
            <polygon points="400,0 310,0 40,225 180,225" fill="#F97316" opacity="0.14" />
            {/* Origami Unicorn in Foreground */}
            <polygon points="182,145 202,115 212,135 232,128 215,158 190,162" fill="#F4F0EA" opacity="0.9" />
            <polygon points="202,115 212,92 208,125" fill="#06B6D4" />
          </g>
        );

      case 'jurassic-park':
        return (
          <g>
            {/* Concentric Impact Tremor Ripples in Water Glass + Amber Mosquito */}
            <circle cx="200" cy="112" r="88" fill="none" stroke="#EAB308" strokeWidth="1.2" opacity="0.3" />
            <circle cx="200" cy="112" r="64" fill="none" stroke="#EAB308" strokeWidth="1.8" opacity="0.55" />
            <circle cx="200" cy="112" r="42" fill="#F59E0B" opacity="0.85" />
            {/* Torch-Lit Jungle Gates & T-Rex Silhouette */}
            <polygon points="75,45 95,45 105,225 65,225" fill="#1C1917" />
            <polygon points="325,45 305,45 295,225 335,225" fill="#1C1917" />
            <path d="M168 135 L182 95 L224 92 L228 106 L204 108 L220 116 L196 122 L205 155 L168 155 Z" fill="#090A0F" />
          </g>
        );

      case 'pulp-fiction':
        return (
          <g>
            {/* Retro Sunburst & The Mysterious 666 Glowing Golden Briefcase */}
            <polygon points="200,145 45,0 355,0" fill="#F59E0B" opacity="0.28" />
            <polygon points="200,145 110,0 290,0" fill="#FEF08A" opacity="0.35" />
            {/* Open Briefcase on Diner Table */}
            <rect x="135" y="135" width="130" height="24" rx="2" fill="#18181B" stroke="#D4AF37" strokeWidth="2" />
            <polygon points="135,135 115,68 285,68 265,135" fill="#09090B" stroke="#F59E0B" strokeWidth="2" />
            {/* Blazing Golden Aura */}
            <ellipse cx="200" cy="135" rx="56" ry="14" fill="#FEF08A" />
          </g>
        );

      case 'the-matrix':
        return (
          <g>
            {/* Falling Phosphor-Green Digital Katakana Rain */}
            {[28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308, 336, 364].map((mx, i) => (
              <g key={i} opacity={0.35 + (i % 3) * 0.2}>
                <line
                  x1={mx}
                  y1="0"
                  x2={mx}
                  y2={90 + ((i * 37) % 120)}
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeDasharray="4 6"
                />
                <circle cx={mx} cy={90 + ((i * 37) % 120)} r="2.5" fill="#A7F3D0" />
              </g>
            ))}
            {/* Bullet-Time Sonic Ripple Rings */}
            <ellipse cx="145" cy="112" rx="12" ry="26" fill="none" stroke="#A7F3D0" strokeWidth="2" />
            <ellipse cx="195" cy="112" rx="18" ry="36" fill="none" stroke="#10B981" strokeWidth="2" />
            <ellipse cx="255" cy="112" rx="24" ry="48" fill="none" stroke="#059669" strokeWidth="1.5" />
            {/* Speeding Brass Bullet */}
            <path d="M95 108 L115 108 L124 112 L115 116 L95 116 Z" fill="#F59E0B" />
          </g>
        );

      case 'in-the-mood-for-love':
        return (
          <g>
            {/* Frame-Within-Frame Crimson Corridor & Swirling Cigarette Smoke */}
            <rect x="0" y="0" width="68" height="225" fill="#140A0C" />
            <rect x="332" y="0" width="68" height="225" fill="#140A0C" />
            <rect x="68" y="0" width="264" height="225" fill="#7F1D1D" opacity="0.65" />
            {/* Warm Amber Pendant Lamp & Vintage Clock */}
            <circle cx="200" cy="52" r="22" fill="#F59E0B" opacity="0.85" />
            <line x1="200" y1="52" x2="200" y2="38" stroke="#1F1216" strokeWidth="2" />
            <line x1="200" y1="52" x2="210" y2="56" stroke="#1F1216" strokeWidth="2" />
            {/* Rising Silk-Like Smoke Ribbon */}
            <path
              d="M165 185 C145 145, 225 125, 195 85 C175 55, 235 45, 215 15"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="2.5"
              opacity="0.55"
            />
            {/* Two Silhouettes Passing in the Narrow Doorway */}
            <path d="M135 225 L145 128 Q158 118 168 128 L175 225 Z" fill="#DC2626" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="156" cy="108" r="11" fill="#0F080A" />
            <path d="M222 225 L230 118 L268 118 L275 225 Z" fill="#0F080A" />
            <circle cx="248" cy="98" r="12" fill="#0F080A" />
          </g>
        );

      case 'spirited-away':
        return (
          <g>
            {/* Flooded Twilight Sea & The Red Spirit Train */}
            <rect x="0" y="0" width="400" height="145" fill="#1E1B4B" />
            <rect x="0" y="145" width="400" height="80" fill="#0F172A" />
            {/* Glowing Red Bathhouse Bridge & Lanterns */}
            <rect x="45" y="108" width="310" height="28" rx="3" fill="#E11D48" stroke="#FDE047" strokeWidth="1.5" />
            {[70, 115, 160, 205, 250, 295, 330].map((wx, i) => (
              <rect key={i} x={wx} y="114" width="22" height="12" fill="#FEF08A" />
            ))}
            {/* Shimmering Water Reflection of the Train */}
            <rect x="45" y="152" width="310" height="18" fill="#F59E0B" opacity="0.28" />
            {/* Paper Spirit Lanterns Floating in Night Sky */}
            <circle cx="85" cy="48" r="9" fill="#FB7185" />
            <circle cx="315" cy="56" r="11" fill="#FB7185" />
          </g>
        );

      case 'lord-of-the-rings':
        return (
          <g>
            {/* The Golden One Ring & Bridge of Khazad-dûm Flame */}
            <circle cx="200" cy="112" r="68" fill="none" stroke="#D4AF37" strokeWidth="12" />
            <circle cx="200" cy="112" r="68" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="8 6" />
            {/* Fiery Balrog Glow & Narrow Stone Span */}
            <circle cx="200" cy="112" r="46" fill="#EA580C" opacity="0.35" />
            <path d="M95 155 Q200 132 305 155 L305 168 Q200 145 95 168 Z" fill="#0F172A" stroke="#D4AF37" strokeWidth="1" />
            {/* Gandalf Staff Light Pinpoint */}
            <circle cx="200" cy="118" r="6" fill="#FFFFFF" />
            <line x1="200" y1="118" x2="200" y2="145" stroke="#F4F0EA" strokeWidth="2.5" />
          </g>
        );

      case 'avatar':
        return (
          <g>
            {/* Bioluminescent Pandora Night Forest & Floating Hallelujah Mountains */}
            <rect x="0" y="0" width="400" height="225" fill="#061020" />
            {/* Tree of Souls Glowing Tendrils */}
            {[-70, -45, -20, 0, 20, 45, 70].map((dx, i) => (
              <path
                key={i}
                d={`M200,45 Q${200 + dx * 1.4},115 ${200 + dx},195`}
                fill="none"
                stroke={i % 2 === 0 ? '#A855F7' : '#06B6D4'}
                strokeWidth="2.5"
                opacity="0.8"
              />
            ))}
            {/* Floating Woodsprite Seeds (Atokirina') */}
            {[
              [85, 65], [125, 135], [285, 75], [320, 145], [200, 32],
            ].map(([wx, wy], i) => (
              <g key={i}>
                <circle cx={wx} cy={wy} r="10" fill="#22D3EE" opacity="0.25" />
                <circle cx={wx} cy={wy} r="3" fill="#F8FAFC" />
              </g>
            ))}
          </g>
        );

      case 'mad-max-fury-road':
        return (
          <g>
            {/* Blazing Orange Haboob Sandstorm & Dead-Center Crosshair Framing */}
            <rect x="0" y="0" width="400" height="225" fill="#431407" />
            <circle cx="200" cy="112" r="95" fill="#F97316" opacity="0.45" />
            <circle cx="200" cy="112" r="48" fill="#FDE047" opacity="0.65" />
            {/* Swaying Polecat Warriors on Carbon Poles */}
            <path d="M85 225 Q115 110 145 48" fill="none" stroke="#090A0F" strokeWidth="2.5" />
            <circle cx="145" cy="48" r="6" fill="#090A0F" />
            <path d="M315 225 Q285 110 255 56" fill="none" stroke="#090A0F" strokeWidth="2.5" />
            <circle cx="255" cy="56" r="6" fill="#090A0F" />
            {/* War Rig Barrel Dead-Center */}
            <rect x="168" y="132" width="64" height="52" rx="4" fill="#090A0F" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="176" cy="184" r="14" fill="#090A0F" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="224" cy="184" r="14" fill="#090A0F" stroke="#94A3B8" strokeWidth="2" />
          </g>
        );

      case 'parasite':
        return (
          <g>
            {/* Architectural Class Cross-Section: Sunlit Lawn, Semi-Basement & Bunker Staircase */}
            {/* Top Level: Sunlit Emerald Park Mansion Lawn */}
            <rect x="0" y="0" width="400" height="82" fill="#065F46" opacity="0.55" />
            <rect x="45" y="16" width="310" height="66" fill="#10B981" opacity="0.3" stroke="#A7F3D0" strokeWidth="1" />
            {/* Middle Level: Street-Level Semi-Basement Window */}
            <rect x="0" y="82" width="400" height="68" fill="#1E293B" />
            <rect x="95" y="92" width="210" height="32" fill="#38BDF8" opacity="0.25" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Bottom Level: Deep Subterranean Concrete Bunker Staircase */}
            <rect x="0" y="150" width="400" height="75" fill="#090D16" />
            {Array.from({ length: 7 }).map((_, i) => (
              <rect
                key={i}
                x={140 + i * 16}
                y={152 + i * 10}
                width="18"
                height="10"
                fill="#D4AF37"
                opacity={0.9 - i * 0.1}
              />
            ))}
            {/* Iconic Black Eye-Censor Bars From Poster */}
            <rect x="182" y="42" width="36" height="8" fill="#090D16" />
          </g>
        );

      case 'oppenheimer':
        return (
          <g>
            {/* 1.43:1 IMAX Trinity Fireball & J. Robert Oppenheimer Porkpie Silhouette */}
            <rect x="0" y="0" width="400" height="225" fill="#090A0F" />
            {/* Blinding Plasma Fireball Sphere */}
            <circle cx="200" cy="105" r="88" fill="#EA580C" opacity="0.4" />
            <circle cx="200" cy="105" r="58" fill="#F97316" opacity="0.75" />
            <circle cx="200" cy="105" r="32" fill="#FEF08A" />
            {/* Quantum Orbitals & Spark Embers */}
            <ellipse cx="200" cy="105" rx="115" ry="28" fill="none" stroke="#FDBA74" strokeWidth="1" transform="rotate(28, 200, 105)" opacity="0.6" />
            <ellipse cx="200" cy="105" rx="115" ry="28" fill="none" stroke="#FDBA74" strokeWidth="1" transform="rotate(-28, 200, 105)" opacity="0.6" />
            {/* Iconic Oppenheimer Fedora Silhouette in Foreground */}
            <g transform="translate(155, 132)" fill="#050507">
              <ellipse cx="45" cy="24" rx="42" ry="6" />
              <path d="M22 24 L28 4 L62 4 L68 24 Z" />
              <path d="M26 26 L64 26 L58 55 L32 55 Z" />
              <path d="M5 93 L22 54 L68 54 L85 93 Z" />
            </g>
          </g>
        );

      case 'dune-part-two':
        return (
          <g>
            {/* Colossal Shai-Hulud Sandworm Maw & Giedi Prime Black-Sun Eclipse */}
            <rect x="0" y="0" width="400" height="225" fill="#181109" />
            {/* Arrakis Twin Moons / Eclipse */}
            <circle cx="200" cy="112" r="82" fill="#F59E0B" opacity="0.35" />
            {/* Hundreds of Crystalline Baleen Teeth of Shai-Hulud */}
            <circle cx="200" cy="112" r="64" fill="#291D12" stroke="#D97706" strokeWidth="3" />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = i * 10;
              return (
                <line
                  key={i}
                  x1="200"
                  y1="50"
                  x2="200"
                  y2="86"
                  stroke="#FDE68A"
                  strokeWidth="1.2"
                  opacity="0.7"
                  transform={`rotate(${angle}, 200, 112)`}
                />
              );
            })}
            <circle cx="200" cy="112" r="24" fill="#070503" />
            {/* Tiny Fremen Rider Figure on the Dune Ridge */}
            <path d="M0 195 Q200 165 400 202 L400 225 L0 225 Z" fill="#0D0905" />
            <rect x="197" y="162" width="6" height="18" fill="#F4F0EA" />
          </g>
        );

      default:
        return (
          <g>
            <circle cx="200" cy="112" r="55" fill={c1} opacity="0.5" />
            <circle cx="200" cy="112" r="28" fill={c2} opacity="0.8" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#08090C] select-none border border-[#F4F0EA]/12 rounded-sm ${getAspectClass()} ${
        interactiveHover ? 'group' : ''
      } ${className}`}
    >
      {showRealPoster ? (
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#07080B]"
          style={
            lightweight3D
              ? {
                  background: `radial-gradient(circle at 50% 45%, ${c1}30 0%, #07080B 80%)`,
                }
              : undefined
          }
        >
          {/* Ambient Blurred Theatrical Poster Backdrop (skipped in 3D tunnel for 60fps GPU speed) */}
          {!lightweight3D && (
            <img
              src={milestone.posterUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-45 pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/85 via-transparent to-[#08090C]/35 pointer-events-none" />
          {/* Foreground Sharp Theatrical Poster / Archival Frame */}
          <img
            src={milestone.posterUrl}
            alt={`${milestone.title} (${milestone.year})`}
            onError={() => setImgError(true)}
            loading={lightweight3D ? 'eager' : 'lazy'}
            decoding="async"
            className={`relative z-10 max-h-full max-w-full object-contain shadow-[0_8px_30px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out ${
              interactiveHover ? 'group-hover:scale-105' : ''
            }`}
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 400 225"
          preserveAspectRatio="xMidYMid slice"
          className={`w-full h-full block transition-transform duration-700 ease-out ${
            interactiveHover ? 'group-hover:scale-105' : ''
          }`}
        >
          <defs>
            <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c3} />
              <stop offset="60%" stopColor="#0E1017" />
              <stop offset="100%" stopColor={c1} stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id={`${uid}-glow`} cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor={c1} stopOpacity="0.32" />
              <stop offset="55%" stopColor={c2} stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
            </radialGradient>
          </defs>

          {/* Base Archival Backdrop */}
          <rect width="400" height="225" fill={`url(#${uid}-bg)`} />
          <rect width="400" height="225" fill={`url(#${uid}-glow)`} />

          {/* Film-Specific Iconic Composition */}
          {renderSceneArtwork()}

          {/* Subtle Anamorphic Vignette & Silver-Halide Frame Border */}
          <rect
            x="1"
            y="1"
            width="398"
            height="223"
            fill="none"
            stroke="#F4F0EA"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        </svg>
      )}

      {/* Optional Cinematographer's Loupe Overlays (works over both Real Poster & Scene Schematic!) */}
      {overlayMode !== 'clean' && (
        <svg
          viewBox="0 0 400 225"
          preserveAspectRatio="none"
          className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        >
          {overlayMode === 'thirds' && (
            <g stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.9">
              <line x1="133.3" y1="0" x2="133.3" y2="225" />
              <line x1="266.6" y1="0" x2="266.6" y2="225" />
              <line x1="0" y1="75" x2="400" y2="75" />
              <line x1="0" y1="150" x2="400" y2="150" />
              <circle cx="133.3" cy="75" r="4" fill="none" />
              <circle cx="266.6" cy="75" r="4" fill="none" />
              <circle cx="133.3" cy="150" r="4" fill="none" />
              <circle cx="266.6" cy="150" r="4" fill="none" />
            </g>
          )}

          {overlayMode === 'spiral' && (
            <g stroke="#38BDF8" strokeWidth="1.2" fill="none" opacity="0.9">
              <rect x="16" y="12" width="368" height="201" strokeOpacity="0.4" />
              <line x1="244" y1="12" x2="244" y2="213" strokeOpacity="0.4" />
              <line x1="244" y1="136" x2="384" y2="136" strokeOpacity="0.4" />
              <path d="M16 213 A 201 201 0 0 1 244 12 A 124 124 0 0 1 384 136 A 77 77 0 0 1 296 213 A 48 48 0 0 1 244 165" />
              <circle cx="200" cy="112.5" r="18" stroke="#D4AF37" strokeDasharray="2 2" />
            </g>
          )}

          {overlayMode === 'gate' && (
            <g stroke="#F4F0EA" strokeWidth="0.9" fill="none" opacity="0.85">
              <rect x="20" y="11.25" width="360" height="202.5" strokeDasharray="6 3" />
              <rect x="40" y="22.5" width="320" height="180" stroke="#D4AF37" strokeOpacity="0.7" />
              <line x1="192" y1="112.5" x2="208" y2="112.5" stroke="#EF4444" strokeWidth="1.2" />
              <line x1="200" y1="104.5" x2="200" y2="120.5" stroke="#EF4444" strokeWidth="1.2" />
            </g>
          )}
        </svg>
      )}

      {/* Top-Right Aspect Ratio Badge */}
      <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5 rounded bg-[#0A0A0C]/90 border border-[#F4F0EA]/15 text-[10px] font-mono-tech text-[#F4F0EA]/85 tracking-wider">
        {milestone.aspectRatio}
      </div>
    </div>
  );
};
