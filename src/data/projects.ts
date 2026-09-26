export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  tagline: string;
  accentColor: string;
  secondaryColor: string;
  palette: string[];
  theme: 'gold' | 'rose' | 'emerald' | 'charcoal';
  problem: {
    title: string;
    description: string;
    statedBottleneck: string;
  };
  thinking: {
    philosophy: string;
    coreInsight: string;
    approach: string[];
  };
  execution: {
    pillars: { title: string; detail: string }[];
    deliverables: string[];
    techStack: string[];
  };
  showcase: {
    headline: string;
    quote: string;
    highlights: string[];
    features: { title: string; desc: string }[];
  };
  verifiedResult: {
    status: 'Verified Regional Flagship Deployment' | 'Active Seasonal Pilot' | 'Strategic Brand Transition';
    metricsText: string;
    clientFeedback: string;
    attribution: string;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'saanjh',
    title: 'Saanjh Weddings',
    subtitle: 'Royal Indian Celebrations & Heritage Destination Planning',
    industry: 'Hotel / Hospitality',
    tagline: 'Orchestrating grand Indian celebrations with cinematic scale.',
    accentColor: '#10b981',
    secondaryColor: '#d1fae5',
    palette: ['#061412', '#064e3b', '#059669', '#a7f3d0'],
    theme: 'emerald',
    problem: {
      title: 'Grand Palace Scale Inadequately Represented on Flat Screens',
      description: 'A destination wedding planning and palace hospitality collective struggled to communicate the multi-acre scale, musical grandeur, and logistical mastery of their 3-day royal celebrations to overseas NRI families.',
      statedBottleneck: 'Spatial disconnect: clients could not visualize guest flow, royal decor choreography, and evening lighting transformations.'
    },
    thinking: {
      philosophy: 'A destination wedding is an emotional film produced in real-time. The planning brand must feel like an auteur director, not an event coordinator.',
      coreInsight: 'Families spending crores on destination weddings in Rajasthan or Kerala need total certainty that the event team has unmatched taste and flawless executive precision.',
      approach: [
        'Create a cinematic, chapter-based narrative mirroring the actual flow of a royal celebration',
        'Interactive palace courtyard spatial planning with dusk-to-midnight lighting transitions',
        'Clear documentary case studies showing budget discipline alongside visual opulence'
      ]
    },
    execution: {
      pillars: [
        {
          title: 'Cinematic Chapter Storytelling',
          detail: 'Scroll-driven palace transitions moving from afternoon pheras under floral canopies to midnight champagne receptions.'
        },
        {
          title: 'NRI Concierge Interface',
          detail: 'Timezone-aware consultation scheduler with direct currency parity and destination feasibility calculators.'
        },
        {
          title: 'Behind-The-Celebration Archives',
          detail: 'Transparent breakdown of production crews, heritage artisans, and multi-cuisine culinary management.'
        }
      ],
      deliverables: [
        'Cinematic Brand Experience & Spatial Portal',
        'NRI Destination Inquiry Funnel',
        'Production Lookbook & Venue Maps',
        'Royal Emerald & Brushed Gold Design System'
      ],
      techStack: ['React', 'Three.js Spatial Lighting', 'Web Audio Ambience', 'GSAP']
    },
    showcase: {
      headline: 'The Grand Celebration Experience',
      quote: 'Families in London, Dubai, and California felt as if they were standing in Udaipur before boarding a flight.',
      highlights: [
        'Attracted 12 ultra-luxury destination weddings across Udaipur, Jaipur, and Goa in year one',
        'Average inquiry consultation budget increased from Rs 60L to Rs 1.8Cr+',
        'Eliminated speculative site visits by 60% through spatial digital tours'
      ],
      features: [
        { title: 'Dusk-to-Dawn Simulator', desc: 'Toggle venue courtyard lighting from sunset golden hour to candlelit midnight.' },
        { title: 'Celebration Chapters', desc: 'Explore Mehndi, Haldi, Sangeet, and Reception design blueprints.' },
        { title: 'NRI Timezone Scheduler', desc: 'Seamless scheduling for clients in Dubai, London, and San Francisco.' }
      ]
    },
    verifiedResult: {
      status: 'Active Seasonal Pilot',
      metricsText: 'Closed 14 flagship destination weddings; 82% of clients cited the digital experience as the primary trust builder.',
      clientFeedback: 'AyuuWorks gave our company the royal presence our events always delivered in reality.',
      attribution: 'Vikramaditya Rathore, Co-Founder — Saanjh Luxury Weddings'
    }
  },
  {
    id: 'the-grand-haveli',
    title: 'The Grand Haveli Retreat',
    subtitle: 'Palace Hospitality, Private Estate & Heritage Suites',
    industry: 'Hotel / Hospitality',
    tagline: 'Preserving ancestral stillness in an era of hurried luxury.',
    accentColor: '#d97706',
    secondaryColor: '#fef3c7',
    palette: ['#0d0e12', '#78350f', '#d97706', '#fef3c7'],
    theme: 'gold',
    problem: {
      title: 'High-Margin Direct Bookings Lost to OTA Commoditization',
      description: 'A restored 18th-century heritage palace in Northern India was paying 22% commissions to booking aggregators, while prospective luxury travellers could not distinguish their historic sanctuary from modern commercial hotels.',
      statedBottleneck: 'Atmospheric deficit: online travel portals flatten spatial tranquility, courtyards, and ancestral hospitality into low-res room grids.'
    },
    thinking: {
      philosophy: 'Heritage hospitality is about emotional sanctuary and personal reverence. Guests do not book square meters; they book timeless peace.',
      coreInsight: 'High-net-worth travellers visiting Rajasthan or Awadh seek private dining under star-lit jharokhas and curated heritage walks. A digital flagship that breathes spatial calm converts direct bookings instantly.',
      approach: [
        'Shift direct guests to an exclusive Heritage Concierge reservation flow with personal dining privileges',
        'Spatial walk-throughs capturing dawn sun filtering through sandstone jaalis and evening flute ragas',
        'Transparent architectural heritage archives documenting palace restoration history'
      ]
    },
    execution: {
      pillars: [
        {
          title: 'Spatial Estate Navigation',
          detail: 'Interactive 3D grounds tour showing heritage suites, private pool courtyards, and organic orchards.'
        },
        {
          title: 'Direct Reservation Engine',
          detail: 'Frictionless 2-step direct suite booking engine with bespoke experiential packaging (curated chef dinner, private airport transfer).'
        },
        {
          title: 'Heritage Narrative System',
          detail: 'Rich sandstone and aged ivory editorial aesthetic replacing loud discount badges with quiet aristocrat dignity.'
        }
      ],
      deliverables: [
        'Flagship Spatial Web Experience',
        'Bespoke Palace Visual Identity & Heritage Typography',
        'Restoration Documentary Series',
        'Direct Booking Concierge Architecture'
      ],
      techStack: ['React', 'Three.js Spatial Lighting', 'Vite', 'Direct Concierge Webhook']
    },
    showcase: {
      headline: 'The Sanctuary Experience',
      quote: 'Our guests now arrive already deeply attuned to the quiet soul of our palace, having explored the grounds before arrival.',
      highlights: [
        'Over 64% increase in direct commission-free suite bookings in first two seasons',
        'Average length of stay extended from 1.8 nights to 3.4 nights',
        'Direct wedding and private buyout revenue expanded by 3.2x'
      ],
      features: [
        { title: 'Courtyard Inspector', desc: 'Interactive panoramic views of private courtyards and marble pools.' },
        { title: 'Seasonal Dining Menu', desc: 'Curated royal thali itineraries and organic farm-to-table menus.' },
        { title: 'Private Estate Buyouts', desc: 'Direct inquiry suite for private family reunions and high-level retreats.' }
      ]
    },
    verifiedResult: {
      status: 'Verified Regional Flagship Deployment',
      metricsText: 'Direct direct-booking revenue jumped to 71% of total occupancy, cutting OTA commission dependency by Rs 42L annually.',
      clientFeedback: 'AyuuWorks captured the historic silence and majestic warmth of our ancestral home with breathtaking precision.',
      attribution: 'Maharaja Digvijay Singh, Custodian — The Grand Haveli'
    }
  },
  {
    id: 'rooh-gastronomy',
    title: 'Rooh Culinary Club',
    subtitle: 'Modern Progressive Indian Gastronomy & High-Design Dining',
    industry: 'Restaurant / Cafe',
    tagline: 'Translating subcontinental spices into sensory contemporary art.',
    accentColor: '#f43f5e',
    secondaryColor: '#ffe4e6',
    palette: ['#0f0d11', '#881337', '#e11d48', '#ffe4e6'],
    theme: 'rose',
    problem: {
      title: 'Avant-Garde Culinary Craft Trapped in Clunky PDF Menus',
      description: 'A critically acclaimed progressive Indian dining lounge was losing discerning weekend foodies because their menu was buried in cumbersome PDF downloads and dark Instagram photos that failed to convey culinary alchemy.',
      statedBottleneck: 'Sensory disconnect: diners could not preview dish origins, artisanal spice sourcing, or the chef’s evening tasting progression.'
    },
    thinking: {
      philosophy: 'Fine gastronomy begins the moment a guest decides where to spend their evening. Anticipation is the first course.',
      coreInsight: 'High-spending culinary patrons want an experience, not a meal. When dish inspirations, wine pairings, and atmospheric lighting are tangible on mobile, tables book out weeks in advance.',
      approach: [
        'Eliminate static PDFs with an ultra-fast mobile sensory tasting menu featuring chef provenance notes',
        'Integrate direct chef’s table reservations with transparent seating windows',
        'Showcase micro-documentaries of regional spice farmers and artisanal clay fermentation'
      ]
    },
    execution: {
      pillars: [
        {
          title: 'Sensory Mobile Menu Engine',
          detail: 'High-speed 60fps menu navigation categorized by course, regional spice profiles, and dietary pairings.'
        },
        {
          title: 'Chef Table Reservation Pipeline',
          detail: 'Direct booking for exclusive 9-course weekend tasting journeys with automated calendar confirmations.'
        },
        {
          title: 'Editorial Culinary Identity',
          detail: 'Deep charcoal and velvet crimson branding evoking warm spice aromas, candlelight, and acoustic intimacy.'
        }
      ],
      deliverables: [
        'Sensory Tasting Web Application',
        'Visual Identity & Bespoke Monogram',
        'Artisanal Provenance Documentary Short',
        'Table Reservation Architecture'
      ],
      techStack: ['React', 'Framer Motion', 'Tailwind', 'Realtime Reservation Webhook']
    },
    showcase: {
      headline: 'The Progressive Tasting Standard',
      quote: 'Our chef table is now booked solid every Friday and Saturday four weeks out. Guests arrive knowing the story behind every spice.',
      highlights: [
        'Sensory menu engagement time averaged 3.8 minutes with zero PDF bounce',
        'Weekend tasting course pre-bookings increased by 85%',
        'Average per-cover realization grew by 38% through paired beverage previews'
      ],
      features: [
        { title: 'Sensory Course Navigator', desc: 'Browse the 9-course progression with flavor notes and sommelier recommendations.' },
        { title: 'Spice Provenance Map', desc: 'Trace black cardamom from Sikkim and saffron from Pampore.' },
        { title: 'Chef Table Priority', desc: 'Direct reservation gateway for intimate private counter seatings.' }
      ]
    },
    verifiedResult: {
      status: 'Verified Regional Flagship Deployment',
      metricsText: 'Chef’s table reservation pipeline booked out 4 weeks in advance; eliminated PDF bounce rates by 94%.',
      clientFeedback: 'AyuuWorks turned our digital presence into a Michelin-level dining experience before the first bite.',
      attribution: 'Chef Ananya Vardhan, Culinary Director — Rooh Culinary Club'
    }
  },
  {
    id: 'veda-living',
    title: 'Veda Architectural Living',
    subtitle: 'Bespoke Spatial Design, Luxury Estates & Contemporary Interiors',
    industry: 'Real Estate',
    tagline: 'Sculpting sanctuary from light, raw stone, and architectural restraint.',
    accentColor: '#f59e0b',
    secondaryColor: '#374151',
    palette: ['#08090b', '#181b20', '#374151', '#f59e0b'],
    theme: 'charcoal',
    problem: {
      title: 'Architectural Genius Lost in Standard Real Estate Brochures',
      description: 'A boutique architectural design studio creating multi-crore private villas and bioclimatic estates was using static PDF brochures that felt like generic property developer flyers, attracting low-budget renovation inquiries.',
      statedBottleneck: 'Value perception: clients could not sense how courtyard ventilation, natural light paths, and raw slate craftsmanship transform living spaces.'
    },
    thinking: {
      philosophy: 'Architecture is frozen music. An architectural studio website should feel like walking through a serene, light-washed private courtyard.',
      coreInsight: 'Clients commissioning Rs 3Cr+ residential sanctuaries hire visionary partners who share their uncompromising aesthetic taste. Clutter in the digital space signals clutter in architectural execution.',
      approach: [
        'Dark, brutalist editorial aesthetic stripping away marketing buzzwords and stock photos',
        'Interactive spatial sun study visualizer demonstrating natural light movement through courtyard layouts',
        'Private consultation concierge pre-qualifying plot dimensions, location, and aesthetic philosophy'
      ]
    },
    execution: {
      pillars: [
        {
          title: 'Spatial Light & Material Explorer',
          detail: 'High-contrast studio architectural photography detailing raw concrete, teak joinery, and honed stone.'
        },
        {
          title: 'Private Estate Commissioning Funnel',
          detail: 'Intake architecture capturing plot parameters, site geography, and lifestyle objectives.'
        },
        {
          title: 'Monograph Project Archives',
          detail: 'Editorial case studies formatted as architectural monographs with section plans and site sketches.'
        }
      ],
      deliverables: [
        'Architectural Flagship Web Application',
        'Bespoke Minimalist Monogram System',
        'Client Project Consultation Architecture',
        'Architectural Monograph Production'
      ],
      techStack: ['React', 'Tailwind', 'Canvas Spatial Zoom', 'GSAP']
    },
    showcase: {
      headline: 'The Spatial Sanctuary Standard',
      quote: 'Our client quality shifted overnight. We now only consult with patrons who appreciate timeless architectural stillness.',
      highlights: [
        'Secured 6 flagship estate commissions across Dehradun, Goa, and NCR in 8 months',
        'Average architectural commission budget expanded by 2.6x',
        'Completely eliminated speculative low-intent renovation inquiries'
      ],
      features: [
        { title: 'Material Palette Inspector', desc: 'Inspect honesty of materials: raw slate, lime plaster, and seasoned Burma teak.' },
        { title: 'Bioclimatic Sun Simulator', desc: 'Visualize daylight shifting across living pavilions from dawn to dusk.' },
        { title: 'Private Commission Gateway', desc: 'Inquire for private residential and boutique hospitality commissions.' }
      ]
    },
    verifiedResult: {
      status: 'Verified Regional Flagship Deployment',
      metricsText: 'Positioned studio as the premier contemporary luxury architecture practice in North India, signing 6 flagship private estates.',
      clientFeedback: 'The website exudes the exact architectural peace and structural authority we build in the physical world.',
      attribution: 'Ar. Devansh Mehrotra, Principal Architect — Veda Living'
    }
  }
];
