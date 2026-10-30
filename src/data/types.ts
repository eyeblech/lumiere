export type EraId =
  | 'pre-cinema-silent'
  | 'expressionism-montage-sound'
  | 'golden-age-technicolor'
  | 'postwar-new-waves'
  | 'new-hollywood-blockbuster'
  | 'indie-digital-dawn'
  | 'contemporary-global-imax';

export type MilestoneCategory = 'masterpiece' | 'underground' | 'technology' | 'movement' | 'auteur';

export type AspectRatioSpec =
  | '1.33:1'
  | '1.37:1'
  | '1.66:1'
  | '1.85:1'
  | '2.20:1'
  | '2.39:1'
  | '1.43:1';

export interface Era {
  id: EraId;
  number: string;
  name: string;
  shortName: string;
  years: string;
  startYear: number;
  endYear: number;
  tagline: string;
  accentColor: string;
  secondaryGlow: string;
  dominantRatio: AspectRatioSpec;
  filmStockSummary: string;
  description: string;
  definingMovements: string[];
}

export interface CinemaMilestone {
  id: string;
  year: number;
  smpteCode: string;
  frameCode: string;
  eraId: EraId;
  category: MilestoneCategory;
  isUndergroundGem?: boolean;
  title: string;
  originalTitle?: string;
  director: string;
  cinematographer: string;
  starring: string[];
  country: string;
  runtime: string;
  aspectRatio: AspectRatioSpec;
  filmStock: string;
  primaryTag: string;
  posterUrl?: string;
  logline: string;
  historicalEssay: string[];
  technicalBreakthrough: {
    headline: string;
    detail: string;
  };
  iconicScene: {
    title: string;
    description: string;
  };
  famousQuote: {
    text: string;
    attribution: string;
  };
  accolades: string;
  influencedBy: string[];
  pavedWayFor: string[];
  colorPalette: [string, string, string];
  artSceneKey: string;
  zDepthOffset?: number;
}

export interface Luminary {
  id: string;
  name: string;
  role: 'Director' | 'Actor / Screen Legend' | 'Director & Actor' | 'Underground / Cult Auteur';
  isUndergroundIcon?: boolean;
  photoUrl?: string;
  birthDeath: string;
  nationality: string;
  eraId: EraId;
  titleBadge: string;
  signatureStyle: string;
  biography: string;
  keyTechniques: string[];
  essentialFilms: {
    title: string;
    year: number;
    milestoneId?: string;
    roleNote: string;
  }[];
  quote: string;
  palette: [string, string, string];
  portraitMotif: string;
}
