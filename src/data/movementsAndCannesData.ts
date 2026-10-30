export interface CinemaMovement {
  id: string;
  name: string;
  subtitle: string;
  years: string;
  origin: string;
  accentColor: string;
  manifesto: string;
  hallmarks: string[];
  keyFigures: string[];
  signatureFilms: {
    id: string;
    title: string;
    year: number;
    director: string;
    posterUrl: string;
  }[];
}

export interface CannesMilestone {
  id: string;
  year: number;
  title: string;
  director: string;
  country: string;
  award: string;
  ovationsOrWalkouts: string;
  cannesStory: string;
  posterUrl: string;
  linkedMilestoneId?: string;
}

export const CINEMA_MOVEMENTS: CinemaMovement[] = [
  {
    id: 'french-new-wave',
    name: 'La Nouvelle Vague (French New Wave)',
    subtitle: 'Critics-Turned-Rebels, Jump Cuts & Handheld Liberation',
    years: '1958–1968',
    origin: 'Paris, France',
    accentColor: '#3B82F6',
    manifesto:
      'Born at the Cinémathèque Française and the pages of Cahiers du Cinéma, young critics led by Jean-Luc Godard, François Truffaut, Agnès Varda, and Chris Marker took lightweight Éclair cameras into the streets of Paris—shattering studio continuity with jump cuts, improvised café dialogue, and existential cool.',
    hallmarks: [
      'La Politique des Auteurs (Director as Sole Author)',
      'Rhythmic Jump Cuts & Direct-to-Lens Address',
      'Lightweight Handheld 35mm Street Shooting',
    ],
    keyFigures: ['Jean-Luc Godard', 'François Truffaut', 'Agnès Varda', 'Chris Marker', 'Anna Karina'],
    signatureFilms: [
      { id: '400-blows-1959', title: 'The 400 Blows', year: 1959, director: 'François Truffaut', posterUrl: '/posters/400-blows-1959.jpg' },
      { id: 'breathless-1960', title: 'Breathless', year: 1960, director: 'Jean-Luc Godard', posterUrl: '/posters/breathless-1960.jpg' },
      { id: 'la-jetee-1962', title: 'La Jetée', year: 1962, director: 'Chris Marker', posterUrl: '/posters/la-jetee-1962.jpg' },
    ],
  },
  {
    id: 'new-french-extremity',
    name: 'New French Extremity (Cinéma du Corps)',
    subtitle: 'Transgressive Visceral Shock, Body Horror & Strobe Formalism',
    years: '1999–Present',
    origin: 'France',
    accentColor: '#EF4444',
    manifesto:
      'Coined by Artforum critic James Quandt, New French Extremity united fearless provocateurs who pushed physical intimacy, corporeal transformation, and sensory trauma to the absolute limit—culminating in Julia Ducournau’s Titane winning the Cannes Palme d’Or.',
    hallmarks: [
      'Unflinching Corporeal & Psychological Extremity',
      'Spinning 360° Tunnel Cameras & 28Hz Infrasound (Noé)',
      'Biomechanical & Visceral Metamorphosis (Ducournau)',
    ],
    keyFigures: ['Gaspar Noé', 'Julia Ducournau', 'Claire Denis', 'Michael Haneke', 'Isabelle Huppert'],
    signatureFilms: [
      { id: 'irreversible-2002', title: 'Irréversible', year: 2002, director: 'Gaspar Noé', posterUrl: '/posters/irreversible-2002.jpg' },
      { id: 'raw-2016', title: 'Raw (Grave)', year: 2016, director: 'Julia Ducournau', posterUrl: '/posters/raw-2016.png' },
      { id: 'titane-2021', title: 'Titane', year: 2021, director: 'Julia Ducournau', posterUrl: '/posters/titane-2021.jpg' },
    ],
  },
  {
    id: 'dogme-95',
    name: 'Dogme 95 & The Vow of Chastity',
    subtitle: 'Anti-Illusionist Handheld Rawness & Stripped-Down Truth',
    years: '1995–2005',
    origin: 'Copenhagen, Denmark',
    accentColor: '#F59E0B',
    manifesto:
      'At a 1995 Paris conference celebrating cinema’s centenary, Danish directors Lars von Trier and Thomas Vinterberg threw red pamphlets into the audience anunciar Dogme 95: ten strict rules forbidding tripods, artificial lighting, optical filters, added music, and genre artifice.',
    hallmarks: [
      'Handheld Camcorders Only (Follow the Actor, Not the Mark)',
      'Zero Non-Diegetic Music or Artificial Movie Lighting',
      'Raw Emotional Eruptions in Real Locations',
    ],
    keyFigures: ['Thomas Vinterberg', 'Lars von Trier', 'Mads Mikkelsen', 'Björk'],
    signatureFilms: [
      { id: 'festen-1998', title: 'Festen (The Celebration)', year: 1998, director: 'Thomas Vinterberg', posterUrl: '/posters/festen-1998.jpg' },
      { id: 'dancer-in-the-dark-2000', title: 'Dancer in the Dark', year: 2000, director: 'Lars von Trier', posterUrl: '/posters/dancer-in-the-dark-2000.png' },
    ],
  },
  {
    id: 'german-expressionism',
    name: 'German Expressionism & Weimar Shadow',
    subtitle: 'Painted Chiaroscuro Shards, Madness & Architectural Dystopia',
    years: '1919–1931',
    origin: 'Weimar Germany',
    accentColor: '#94A3B8',
    manifesto:
      'Rejecting photographic realism in the aftermath of World War I, Weimar Germany’s UFA studios distorted streets, staircases, and shadows into jagged geometric projections of madness and authoritarian dread—laying the visual foundation for Horror and Film Noir.',
    hallmarks: [
      'Chiaroscuro Light & Shadow Painted Directly on Sets',
      'Non-Orthogonal Skewed Architecture',
      'Automata, Somnambulists & The Double (Doppelgänger)',
    ],
    keyFigures: ['Fritz Lang', 'Robert Wiene', 'F.W. Murnau', 'Conrad Veidt', 'Karl Freund'],
    signatureFilms: [
      { id: 'caligari-1920', title: 'The Cabinet of Dr. Caligari', year: 1920, director: 'Robert Wiene', posterUrl: '/posters/caligari-1920.jpg' },
      { id: 'metropolis-1927', title: 'Metropolis', year: 1927, director: 'Fritz Lang', posterUrl: '/posters/metropolis-1927.jpg' },
    ],
  },
  {
    id: 'soviet-montage-poetics',
    name: 'Soviet Montage & Mystic Poetics',
    subtitle: 'From Dialectical Collision Cutting to "Sculpting in Time"',
    years: '1924–1985',
    origin: 'Soviet Union (Russia, Ukraine, Armenia, Belarus)',
    accentColor: '#DC2626',
    manifesto:
      'Two revolutionary poles defined Soviet cinema: the 1920s theorists (Eisenstein, Vertov) who proved meaning erupts from the collision of two rapid cuts, and the post-war poetic rebels (Tarkovsky, Parajanov, Klimov) who defied censorship with 6-minute unbroken spiritual takes.',
    hallmarks: [
      'Dialectical Collision Editing (Eisenstein)',
      '6-Minute Meditative Dolly Takes (Tarkovsky)',
      'Byzantine Living Tableaux (Parajanov)',
    ],
    keyFigures: ['Sergei Eisenstein', 'Andrei Tarkovsky', 'Sergei Parajanov', 'Elem Klimov'],
    signatureFilms: [
      { id: 'battleship-potemkin-1925', title: 'Battleship Potemkin', year: 1925, director: 'Sergei Eisenstein', posterUrl: '/posters/battleship-potemkin-1925.jpg' },
      { id: 'color-of-pomegranates-1969', title: 'The Color of Pomegranates', year: 1969, director: 'Sergei Parajanov', posterUrl: '/posters/color-of-pomegranates-1969.jpg' },
      { id: 'stalker-1979', title: 'Stalker', year: 1979, director: 'Andrei Tarkovsky', posterUrl: '/posters/stalker-1979.jpg' },
    ],
  },
  {
    id: 'taiwan-hk-new-wave',
    name: 'Taiwanese & Hong Kong Second Wave',
    subtitle: 'Skyscraper Reflections, Step-Printed Neon & Urban Melancholy',
    years: '1982–2004',
    origin: 'Taipei & Hong Kong',
    accentColor: '#10B981',
    manifesto:
      'Across the Strait, Taipei masters Edward Yang and Hou Hsiao-hsien pioneered patient, glass-reflected long-shot realism while Hong Kong’s Wong Kar-wai and Christopher Doyle turned narrow corridors and step-printed neon blur into intoxicating romantic longing.',
    hallmarks: [
      '12fps Step-Printed Motion Blur & Neon Color Timing',
      'Window-Glass Superimposition of City & Interior',
      'Frame-Within-Frame Doorway Voyeurism',
    ],
    keyFigures: ['Wong Kar-wai', 'Edward Yang', 'Hou Hsiao-hsien', 'Tony Leung', 'Maggie Cheung'],
    signatureFilms: [
      { id: 'chungking-express-1994', title: 'Chungking Express', year: 1994, director: 'Wong Kar-wai', posterUrl: '/posters/chungking-express-1994.jpg' },
      { id: 'in-the-mood-for-love-2000', title: 'In the Mood for Love', year: 2000, director: 'Wong Kar-wai', posterUrl: '/posters/in-the-mood-for-love-2000.jpg' },
      { id: 'yi-yi-2000', title: 'Yi Yi', year: 2000, director: 'Edward Yang', posterUrl: '/posters/yi-yi-2000.jpg' },
    ],
  },
  {
    id: 'korean-new-wave',
    name: 'South Korean New Wave (Hallyuwood)',
    subtitle: 'Razor-Sharp Tonal Whiplash, Vengeance Operas & Class Geometry',
    years: '1999–Present',
    origin: 'Seoul, South Korea',
    accentColor: '#38BDF8',
    manifesto:
      'Following the lifting of South Korean state censorship in the late 1990s, a fearless generation led by Bong Joon-ho, Park Chan-wook, and Lee Chang-dong fused genre thrills—crime, horror, black comedy, and revenge—with scalpel-sharp social critique.',
    hallmarks: [
      'Instant Tonal Shifts from Slapstick Comedy to Tragedy',
      'Vertical & Horizontal Architectural Class Blocking',
      'Choreographed Lateral Corridor Action Takes',
    ],
    keyFigures: ['Bong Joon-ho', 'Park Chan-wook', 'Song Kang-ho', 'Choi Min-sik'],
    signatureFilms: [
      { id: 'oldboy-2003', title: 'Oldboy', year: 2003, director: 'Park Chan-wook', posterUrl: '/posters/oldboy-2003.jpg' },
      { id: 'parasite-2019', title: 'Parasite', year: 2019, director: 'Bong Joon-ho', posterUrl: '/posters/parasite-2019.png' },
    ],
  },
  {
    id: 'iranian-new-wave',
    name: 'Iranian Poetic New Wave',
    subtitle: 'Docu-Fiction Mirrors, Windshield Frames & Humanist Restraint',
    years: '1969–Present',
    origin: 'Tehran, Iran',
    accentColor: '#D4AF37',
    manifesto:
      'Transforming strict censorship rules into formal genius, Iranian masters led by Abbas Kiarostami erased the line between documentary and fiction—staging profound philosophical inquiries inside moving cars, courtrooms, and rural olive groves.',
    hallmarks: [
      'Real People Re-Enacting Their Own Lives on Camera',
      'Dashboard Car-Interior Philosophical Dialogues',
      'Self-Reflexive Breaking of the Fourth Wall',
    ],
    keyFigures: ['Abbas Kiarostami', 'Jafar Panahi', 'Asghar Farhadi', 'Forough Farrokhzad'],
    signatureFilms: [
      { id: 'close-up-1990', title: 'Close-Up', year: 1990, director: 'Abbas Kiarostami', posterUrl: '/posters/close-up-1990.jpg' },
      { id: 'taste-of-cherry-1997', title: 'Taste of Cherry', year: 1997, director: 'Abbas Kiarostami', posterUrl: '/posters/taste-of-cherry-1997.jpg' },
    ],
  },
];

export const CANNES_MILESTONES: CannesMilestone[] = [
  {
    id: 'cannes-400-blows-1959',
    year: 1959,
    title: 'The 400 Blows (Les Quatre Cents Coups)',
    director: 'François Truffaut',
    country: 'France',
    award: 'Best Director (Prix de la mise en scène)',
    ovationsOrWalkouts: 'Triumphant Premiere · Birth of the New Wave at Cannes',
    cannesStory:
      'Banned from attending the 1958 Cannes Film Festival because his scathing articles in Arts called the festival elitist and outdated, 27-year-old François Truffaut returned one year later with his debut feature—winning Best Director as the freeze-frame of young Antoine Doinel on the beach changed cinema forever.',
    posterUrl: '/posters/400-blows-1959.jpg',
    linkedMilestoneId: '400-blows-1959',
  },
  {
    id: 'cannes-taxi-driver-1976',
    year: 1976,
    title: 'Taxi Driver',
    director: 'Martin Scorsese',
    country: 'United States',
    award: 'Palme d’Or (1976)',
    ovationsOrWalkouts: 'Half Boos, Half Roaring Standing Ovation',
    cannesStory:
      'Jury President Tennessee Williams initially recoiled at the climactic bloodshed of Travis Bickle’s neon-soaked New York descent, yet the jury recognized Scorsese, Paul Schrader, and Robert De Niro’s hypnotic power—crowning it with the Palme d’Or.',
    posterUrl: '/posters/taxi-driver-1976.jpg',
    linkedMilestoneId: 'taxi-driver-1976',
  },
  {
    id: 'cannes-apocalypse-now-1979',
    year: 1979,
    title: 'Apocalypse Now',
    director: 'Francis Ford Coppola',
    country: 'United States',
    award: 'Palme d’Or (1979)',
    ovationsOrWalkouts: 'Unfinished "Work in Progress" Sensation',
    cannesStory:
      'Risking his personal fortune after a 238-day jungle shoot in the Philippines, Coppola flew an unfinished cut to Cannes and installed custom quadraphonic surround speakers inside the Palais. At the press conference he famously declared: "My film is not a movie; my film is not about Vietnam. It IS Vietnam."',
    posterUrl: '/posters/apocalypse-now-1979.jpg',
    linkedMilestoneId: 'apocalypse-now-1979',
  },
  {
    id: 'cannes-possession-1981',
    year: 1981,
    title: 'Possession',
    director: 'Andrzej Żuławski',
    country: 'France / West Germany',
    award: 'Best Actress (Isabelle Adjani)',
    ovationsOrWalkouts: 'Shocked Gasps & Legendary Cult Coronation',
    cannesStory:
      'Exiled Polish auteur Andrzej Żuławski set his marital-dissolution horror masterpiece against the Berlin Wall. Isabelle Adjani’s ferocious three-minute unbroken subway corridor seizure stunned the Croisette and won her Best Actress.',
    posterUrl: '/posters/possession-1981.jpg',
    linkedMilestoneId: 'possession-1981',
  },
  {
    id: 'cannes-paris-texas-1984',
    year: 1984,
    title: 'Paris, Texas',
    director: 'Wim Wenders',
    country: 'West Germany / United States',
    award: 'Unanimous Palme d’Or (1984)',
    ovationsOrWalkouts: '15-Minute Tearful Standing Ovation',
    cannesStory:
      'Written by Sam Shepard and shot by Robby Müller in glowing emerald greens and desert reds, Harry Dean Stanton and Nastassja Kinski’s one-way-mirror peep-show confession moved the entire Palais to tears, winning the Palme d’Or unanimously.',
    posterUrl: '/posters/paris-texas-1984.png',
    linkedMilestoneId: 'paris-texas-1984',
  },
  {
    id: 'cannes-pulp-fiction-1994',
    year: 1994,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    country: 'United States',
    award: 'Palme d’Or (1994)',
    ovationsOrWalkouts: 'Midnight Screening Earthquake & Heckler Middle Finger',
    cannesStory:
      'When Jury President Clint Eastwood announced Pulp Fiction over Three Colors: Red as the Palme d’Or winner, a Parisian woman in the balcony shouted "Scandale!"—prompting 31-year-old Tarantino to grin and flash a defiant middle finger from the stage.',
    posterUrl: '/posters/pulp-fiction-1994.jpg',
    linkedMilestoneId: 'pulp-fiction-1994',
  },
  {
    id: 'cannes-la-haine-1995',
    year: 1995,
    title: 'La Haine',
    director: 'Mathieu Kassovitz',
    country: 'France',
    award: 'Best Director (1995)',
    ovationsOrWalkouts: 'Police Protest Outside · Standing Ovation Inside',
    cannesStory:
      'Chronicling 24 hours in the Parisian banlieues after a youth is beaten into a coma by police, 27-year-old Mathieu Kassovitz’s high-contrast black-and-white powder keg caused French riot police assigned to the red carpet to turn their backs in protest while the Palais erupted in applause.',
    posterUrl: '/posters/la-haine-1995.jpg',
    linkedMilestoneId: 'la-haine-1995',
  },
  {
    id: 'cannes-taste-of-cherry-1997',
    year: 1997,
    title: 'Taste of Cherry',
    director: 'Abbas Kiarostami',
    country: 'Iran',
    award: 'Palme d’Or (50th Anniversary Cannes)',
    ovationsOrWalkouts: 'Smuggled Film Reels & Historic Embrace',
    cannesStory:
      'Held up by Iranian authorities until hours before the festival, Kiarostami’s reels arrived in Cannes at the last minute and won Iran’s first Palme d’Or at the 50th anniversary ceremony.',
    posterUrl: '/posters/taste-of-cherry-1997.jpg',
    linkedMilestoneId: 'taste-of-cherry-1997',
  },
  {
    id: 'cannes-in-the-mood-2000',
    year: 2000,
    title: 'In the Mood for Love',
    director: 'Wong Kar-wai',
    country: 'Hong Kong',
    award: 'Best Actor (Tony Leung) & Grand Technical Prize',
    ovationsOrWalkouts: 'Wet Print Delivered Hours Before Red Carpet',
    cannesStory:
      'Notorious for editing until the final second, Wong Kar-wai was still splicing the ending of In the Mood for Love in a French lab on the morning of its Cannes world premiere—unveiling a masterpiece with zero press screening beforehand.',
    posterUrl: '/posters/in-the-mood-for-love-2000.jpg',
    linkedMilestoneId: 'in-the-mood-for-love-2000',
  },
  {
    id: 'cannes-piano-teacher-2001',
    year: 2001,
    title: 'The Piano Teacher (La Pianiste)',
    director: 'Michael Haneke',
    country: 'France / Austria',
    award: 'Grand Prix, Best Actress (Isabelle Huppert) & Best Actor',
    ovationsOrWalkouts: 'Historic Triple-Award Sweep (Forced Rule Change)',
    cannesStory:
      'Austrian surgical provocateur Michael Haneke and fearless French actress Isabelle Huppert swept three of the festival’s top prizes in a single night—prompting Cannes to change its rules so no single film could ever win both a major prize and acting awards again.',
    posterUrl: '/posters/piano-teacher-2001.jpg',
    linkedMilestoneId: 'piano-teacher-2001',
  },
  {
    id: 'cannes-irreversible-2002',
    year: 2002,
    title: 'Irréversible',
    director: 'Gaspar Noé',
    country: 'France',
    award: 'Official Competition · Greatest Scandal in Cannes History',
    ovationsOrWalkouts: '250 Walkouts · 20 Audience Members Treated for Vertigo',
    cannesStory:
      'Unfolding in reverse chronological order from vengeance to innocence, Gaspar Noé laced the opening 30 minutes with a 28-Hertz low-frequency infrasound rumble (used by riot police to induce nausea) while spinning the camera 360 degrees—triggering 250 walkouts and cementing New French Extremity in history.',
    posterUrl: '/posters/irreversible-2002.jpg',
    linkedMilestoneId: 'irreversible-2002',
  },
  {
    id: 'cannes-oldboy-2003',
    year: 2003,
    title: 'Oldboy',
    director: 'Park Chan-wook',
    country: 'South Korea',
    award: 'Grand Prix (2004 Cannes)',
    ovationsOrWalkouts: '10-Minute Standing Ovation Led by Jury President Tarantino',
    cannesStory:
      'With its unbroken three-minute lateral hallway hammer brawl and live-octopus intensity, Park Chan-wook’s vengeance opera electrified Jury President Quentin Tarantino and introduced the South Korean New Wave to global audiences.',
    posterUrl: '/posters/oldboy-2003.jpg',
    linkedMilestoneId: 'oldboy-2003',
  },
  {
    id: 'cannes-uncle-boonmee-2010',
    year: 2010,
    title: 'Uncle Boonmee Who Can Recall His Past Lives',
    director: 'Apichatpong Weerasethakul',
    country: 'Thailand',
    award: 'Palme d’Or (2010)',
    ovationsOrWalkouts: 'Hypnotic Midnight Jungle Reverie',
    cannesStory:
      'Jury President Tim Burton fell under the spell of Apichatpong’s Super 16mm Thai ghost fable, awarding Southeast Asia its historic Palme d’Or.',
    posterUrl: '/posters/uncle-boonmee-2010.jpg',
    linkedMilestoneId: 'uncle-boonmee-2010',
  },
  {
    id: 'cannes-parasite-2019',
    year: 2019,
    title: 'Parasite',
    director: 'Bong Joon-ho',
    country: 'South Korea',
    award: 'Unanimous Palme d’Or (2019)',
    ovationsOrWalkouts: '8-Minute Standing Ovation · Refusal to Stop Clapping',
    cannesStory:
      'The applause inside the Grand Théâtre Lumière lasted so long past midnight that Bong Joon-ho took the microphone and pleaded in French and English: "Thank you, everyone... let’s all go home and eat dinner!"',
    posterUrl: '/posters/parasite-2019.png',
    linkedMilestoneId: 'parasite-2019',
  },
  {
    id: 'cannes-titane-2021',
    year: 2021,
    title: 'Titane',
    director: 'Julia Ducournau',
    country: 'France',
    award: 'Palme d’Or (2021)',
    ovationsOrWalkouts: 'New French Extremity Claims the Crown',
    cannesStory:
      'Two minutes into the closing ceremony, Jury President Spike Lee accidentally misheard a French prompt and blurted out that Julia Ducournau’s biomechanical body-horror triumph Titane had won the Palme d’Or—making Ducournau the first solo female director in history to win the prize.',
    posterUrl: '/posters/titane-2021.jpg',
    linkedMilestoneId: 'titane-2021',
  },
  {
    id: 'cannes-anatomy-2023',
    year: 2023,
    title: 'Anatomy of a Fall (Anatomie d’une chute)',
    director: 'Justine Triet',
    country: 'France',
    award: 'Palme d’Or (2023)',
    ovationsOrWalkouts: 'Palme d’Or & Palm Dog Double Triumph',
    cannesStory:
      'Anchored by German actress Sandra Hüller’s multilingual tour de force in a French Alpine murder trial, Justine Triet won both the Palme d’Or and later the Academy Award for Best Original Screenplay.',
    posterUrl: '/posters/anatomy-of-a-fall-2023.jpg',
    linkedMilestoneId: 'anatomy-of-a-fall-2023',
  },
];
