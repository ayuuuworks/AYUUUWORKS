import { AWEDiagnosis, BusinessSystem } from '../awe/types';

export interface DiagnosticInput {
  industry: string;
  primaryProblem: string;
  businessName?: string;
  goals?: string[];
  exploredProjects?: string[];
  interactions?: any[];
}

interface StrategicCorrectionRule {
  summary: string;
  bottlenecks: string[];
  corrections: string[];
  tests: string[];
  reasoning: string;
  services: string[];
  recommendedProject: 'saanjh' | 'the-grand-haveli' | 'rooh-gastronomy' | 'veda-living';
  nextAction: string;
  targetSystem: BusinessSystem;
}

/**
 * Maps problem keywords/phrases to a canonical tension category and key
 */
function identifyTensionCategory(problemText: string): {
  tensionKey: string;
  system: BusinessSystem;
} {
  const text = (problemText || '').toLowerCase();

  if (text.includes('notice') || text.includes('dikh') || text.includes('pata nahi') || text.includes('exist')) {
    return { tensionKey: 'attention_notice', system: 'attention' };
  }
  if (text.includes('yaad') || text.includes('forget') || text.includes('confuse')) {
    return { tensionKey: 'perception_memory', system: 'perception' };
  }
  if (text.includes('premium') || text.includes('cheap') || text.includes('second-tier') || text.includes('sasta')) {
    return { tensionKey: 'perception_premium', system: 'perception' };
  }
  if (text.includes('enquiry') || text.includes('lead') || text.includes('conversion') || text.includes('call') || text.includes('rate')) {
    return { tensionKey: 'action_conversion', system: 'action' };
  }
  if (text.includes('social') || text.includes('random') || text.includes('instagram') || text.includes('feed')) {
    return { tensionKey: 'perception_social', system: 'perception' };
  }
  if (text.includes('competitor') || text.includes('established') || text.includes('mukabla')) {
    return { tensionKey: 'trust_authority', system: 'trust' };
  }
  if (text.includes('marketing') || text.includes('result') || text.includes('roas') || text.includes('samajh')) {
    return { tensionKey: 'action_attribution', system: 'action' };
  }
  if (text.includes('grow') || text.includes('next step') || text.includes('scale') || text.includes('direction')) {
    return { tensionKey: 'trust_roadmap', system: 'trust' };
  }

  // Default tension fallbacks
  return { tensionKey: 'trust_general', system: 'trust' };
}

/**
 * Deterministic Diagnostic Engine
 * Generates structured strategic corrections cross-referenced against both industry and stated problem.
 */
export function generateDeterministicStrategicHypothesis(input: DiagnosticInput): AWEDiagnosis {
  const { industry, primaryProblem, businessName } = input;
  const bName = businessName && businessName.trim().length > 0 ? businessName.trim() : 'Aapka Business';
  const { tensionKey, system } = identifyTensionCategory(primaryProblem);

  // Industry-specific base data
  const baseProfile = getIndustryBaseProfile(industry, bName);
  // Problem-specific strategic corrections
  const problemAdjustments = getProblemSpecificCorrections(tensionKey, industry, bName);

  return {
    summary: problemAdjustments.summary || baseProfile.summary,
    possible_bottlenecks: (problemAdjustments.bottlenecks && problemAdjustments.bottlenecks.length > 0)
      ? problemAdjustments.bottlenecks
      : baseProfile.bottlenecks,
    recommended_corrections: (problemAdjustments.corrections && problemAdjustments.corrections.length > 0)
      ? problemAdjustments.corrections
      : baseProfile.corrections,
    recommended_tests: (problemAdjustments.tests && problemAdjustments.tests.length > 0)
      ? problemAdjustments.tests
      : baseProfile.tests,
    reasoning: problemAdjustments.reasoning || baseProfile.reasoning,
    confidence: 'high',
    relevant_services: problemAdjustments.services || baseProfile.services,
    recommended_project: problemAdjustments.recommendedProject || baseProfile.recommendedProject,
    next_action: problemAdjustments.nextAction || baseProfile.nextAction,
    generatedAt: Date.now(),
    isAiEnhanced: false,
  };
}

/**
 * Problem-specific adjustments that modify the diagnosis based on the exact pain-point selected
 */
function getProblemSpecificCorrections(
  tensionKey: string,
  industry: string,
  bName: string
): Partial<StrategicCorrectionRule> {
  switch (tensionKey) {
    case 'attention_notice':
      return {
        summary: `For ${bName}, visibility is currently throttled by generic broadcast marketing instead of a bold, distinctive point of view.`,
        bottlenecks: [
          'Brand communications blend into the existing local feed noise without a signature hook',
          'Marketing dollars spent on reach rather than memorable category differentiation',
          'No clear, instant answer to: "Why should anyone choose you in the first 3 seconds?"'
        ],
        corrections: [
          'Engineer a category-defining visual hook and editorial headline that commands pause',
          'Shift from generic promotional banners to cinematic mini-stories featuring authentic craft',
          'Launch localized geo-targeted authority campaigns targeting discerning high-value patrons'
        ],
        tests: [
          'A/B test an editorial narrative film against promotional discount creatives',
          'Measure scroll-stop velocity on bold typography vs traditional product photography'
        ],
        reasoning: 'In modern markets, attention is not bought by posting louder; it is earned by looking unmistakably distinctive and culturally confident.',
        services: ['Strategic Brand Positioning', 'Campaign Creative Direction', 'Cinematic Motion Systems'],
        recommendedProject: industry.toLowerCase().includes('jewel') || industry.toLowerCase().includes('hotel') ? 'the-grand-haveli' : 'rooh-gastronomy',
        nextAction: 'Define your single non-negotiable point of distinction before spending on further advertising.',
        targetSystem: 'attention',
      };

    case 'perception_premium':
      return {
        summary: `There is a painful gap between the real craftsmanship of ${bName} and how cheap or ordinary the business looks on screen.`,
        bottlenecks: [
          'Low-resolution or template-based digital touchpoints degrade perceived craft value',
          'Inconsistent visual language across social media, storefront packaging, and mobile web',
          'Prospective premium clients negotiate heavily because the brand does not command silent reverence'
        ],
        corrections: [
          'Re-architect the visual identity with bespoke editorial typography and luxury restraint',
          'Deploy a flagship digital archive that presents each offering with museum-grade care',
          'Eliminate clutter and flashy discount banners that signal price vulnerability'
        ],
        tests: [
          'Test clean editorial white-space & dark-room aesthetic against crowded promotional layouts',
          'Audit buyer inquiry price sensitivity before and after lookbook refinement'
        ],
        reasoning: 'Luxury is an emotional perception established in milliseconds. When your digital presence looks commoditized, buyers immediately resort to price comparisons.',
        services: ['Bespoke Brand Identity', 'Digital Showroom Flagship', 'High-Jewellery / Editorial Craft'],
        recommendedProject: 'the-grand-haveli',
        nextAction: 'Conduct an honest visual audit: does your website look as prestigious as your best physical client interaction?',
        targetSystem: 'perception',
      };

    case 'action_conversion':
      return {
        summary: `People are visiting ${bName}'s touchpoints, but leaving without inquiring due to cognitive friction and unclear next steps.`,
        bottlenecks: [
          'Call-to-actions are buried behind multi-step forms or impersonal "Submit" buttons',
          'No high-trust concierge pathway (e.g. VIP appointment, private viewing slot, instant WhatsApp concierge)',
          'Lack of transparent pre-qualification causing either zero inquiries or low-intent spam'
        ],
        corrections: [
          'Implement a 2-step direct VIP concierge inquiry experience on both mobile and desktop',
          'Introduce occasion-specific consultation packages that prompt decisive action',
          'Place high-context trust markers (provenance, certifications, client tier) right next to inquiry triggers'
        ],
        tests: [
          'Test direct WhatsApp Private Concierge scheduling vs generic lead forms',
          'Test occasion-based inquiry flows (e.g. "Reserve Bridal Suite") against general inquiry buttons'
        ],
        reasoning: 'High-ticket buyers do not fill out cold 8-field forms. They want high-touch, prompt assurance that their inquiry is treated with private discretion.',
        services: ['Conversion Experience Architecture', 'Concierge Funnel Design', 'Interactive Mobile Web Systems'],
        recommendedProject: 'saanjh',
        nextAction: 'Replace generic inquiry forms with an intuitive, guided consultation selector.',
        targetSystem: 'action',
      };

    case 'perception_social':
      return {
        summary: `Social media for ${bName} currently resembles an uncurated phone photo gallery instead of an editorial brand lookbook.`,
        bottlenecks: [
          'Disjointed visual rhythm with erratic graphic designs created in haste',
          'Audience scrolls without registering brand identity or developing lasting recall',
          'Heavy reliance on random viral trends rather than building a durable brand archive'
        ],
        corrections: [
          'Institute a 9-grid editorial formula balancing product macro details, heritage story, and concierge access',
          'Create a strict visual design system (palette, font rules, photography art direction)',
          'Treat each post as an archival chapter in the brand story rather than daily filler'
        ],
        tests: [
          'Curate a 9-post thematic collection and monitor direct DM inquiry quality',
          'Test high-production behind-the-scenes karigar/chef process footage against static Canva graphics'
        ],
        reasoning: 'Discerning clients evaluate your seriousness by your discipline. When social channels look chaotic, they assume the internal operation is equally unrefined.',
        services: ['Editorial Social Architecture', 'Creative Brand Direction', 'High-Fidelity Content Production'],
        recommendedProject: 'veda-living',
        nextAction: 'Archive disjointed promotional flyers and establish a cohesive 9-grid editorial mood board.',
        targetSystem: 'perception',
      };

    case 'trust_authority':
      return {
        summary: `Competitors appear more established than ${bName} simply because their storytelling and digital presentation project greater scale.`,
        bottlenecks: [
          'Absence of definitive proof points, certifications, and institutional prestige on the website',
          'The brand appears local and tentative rather than category-leading',
          'Lack of an authentic narrative explaining why the founder started the venture and what standards they uphold'
        ],
        corrections: [
          'Publish an authoritative founder narrative detailing uncompromising craft standards',
          'Incorporate prominent trust signals, lineage milestones, and verified client endorsements',
          'Position the business not as a vendor, but as the benchmark specialist in the region'
        ],
        tests: [
          'Test founder philosophy section prominently on homepage vs buried in an "About" link',
          'Compare conversion rates between certified credibility badges vs unverified claims'
        ],
        reasoning: 'In high-value purchases, people do not bet on the best product; they bet on the brand that feels safest and most reputable.',
        services: ['Strategic Brand Positioning', 'Authority Web Experience', 'Founder Story Architecture'],
        recommendedProject: 'the-grand-haveli',
        nextAction: 'Codify your origin story and core standard of excellence into a prominent digital manifesto.',
        targetSystem: 'trust',
      };

    case 'action_attribution':
      return {
        summary: `Marketing expenditure for ${bName} feels like a black box with zero clarity on which touchpoints actually generate revenue.`,
        bottlenecks: [
          'No end-to-end tracking from digital impression to physical showroom or consultation visit',
          'Fragmented agencies managing ads, social media, and web development without unified strategic vision',
          'Optimizing for vanity vanity metrics (likes, impressions) rather than qualified customer conversations'
        ],
        corrections: [
          'Consolidate digital touchpoints into an integrated, trackable business engine',
          'Implement dedicated QR codes and campaign-specific landing pages for all promotions',
          'Align marketing KPI strictly to qualified consultations and real transactions'
        ],
        tests: [
          'Track conversion rates from dedicated campaign landing pages vs homepage root visits',
          'Monitor WhatsApp concierge attribution tags for walk-in consultations'
        ],
        reasoning: 'Marketing without architecture is just expense. An effective business engine clearly links every rupee spent to customer pipeline velocity.',
        services: ['Experience Engine Architecture', 'Conversion Funnel Strategy', 'Full-Stack Digital Systems'],
        recommendedProject: 'saanjh',
        nextAction: 'Audit your customer journey from first ad click to final invoice to identify where trackability breaks.',
        targetSystem: 'action',
      };

    case 'trust_roadmap':
      return {
        summary: `${bName} has reached a growth plateau where legacy methods are no longer sufficient to scale to the next tier.`,
        bottlenecks: [
          'Physical capacity or referral network tapped out without digital leverage',
          'Reluctance to reposition for higher-tier clients due to fear of losing current baseline volume',
          'Lack of a unified strategic roadmap unifying brand, technology, and customer experience'
        ],
        corrections: [
          'Execute a phased premium repositioning strategy moving from volume to high-margin value',
          'Build digital assets that scale authority without increasing operational headcount',
          'Develop exclusive VIP tier experiences to increase lifetime client value'
        ],
        tests: [
          'Test pilot launch of an ultra-premium bespoke offering alongside current services',
          'Validate client appetite for private digital consultations'
        ],
        reasoning: 'Scaling to the next revenue tier requires a shift in customer perception. You cannot reach premium clients with budget positioning.',
        services: ['Strategic Growth Advisory', 'Enterprise Brand Re-architecture', 'Flagship Web Platforms'],
        recommendedProject: 'veda-living',
        nextAction: 'Define the economics of your dream top 20% client tier and design the brand strictly for them.',
        targetSystem: 'trust',
      };

    default:
      return {};
  }
}

/**
 * Base profiles by industry when specific tension modifiers are blended
 */
function getIndustryBaseProfile(industry: string, bName: string): StrategicCorrectionRule {
  const ind = (industry || '').toLowerCase();

  if (ind.includes('jewel')) {
    return {
      summary: `For ${bName} in fine jewellery, customer transactions depend on heirloom credibility, tactile craftsmanship, and pre-store confidence.`,
      bottlenecks: [
        'Disparity between physical showroom grandeur and online visual standards',
        'Absence of an editorial digital showroom to review carats and purity prior to store visits',
        'Friction in private consultation booking or concierge enquiry flow'
      ],
      corrections: [
        'Establish an editorial visual identity inspired by museum-grade Indian jewellery houses',
        'Build a tactile web showroom with high-resolution carat/hallmark transparency and WhatsApp concierge',
        'Structure narrative content around occasion, heritage investment, and bridal consultations'
      ],
      tests: [
        'A/B test product photography: white studio cutouts vs warm ambient velvet/silk editorial framing',
        'Test dedicated "Book Private Viewing" CTA against generic WhatsApp button'
      ],
      reasoning: 'Jewellery buyers in India rarely buy high-ticket pieces off a generic catalog without emotional resonance and verified trust.',
      services: ['High-Jewellery Editorial Branding', 'Immersive Digital Showroom', 'Concierge Conversion Architecture'],
      recommendedProject: 'the-grand-haveli',
      nextAction: 'Audit current product presentation against luxury bridal expectations',
      targetSystem: 'trust',
    };
  }

  if (ind.includes('beauty') || ind.includes('makeup')) {
    return {
      summary: `For ${bName} in makeup and beauty, brides and editorial clients judge your mastery by the refinement of your digital lookbook.`,
      bottlenecks: [
        'Social presence feels like a loose album rather than a luxury bridal studio portfolio',
        'No structured bridal booking pipeline leading to price bargaining',
        'Lack of cinematic before-after transformations that highlight skin texture authenticity'
      ],
      corrections: [
        'Design a high-fashion, editorial brand identity with refined typography and soft palettes',
        'Launch an interactive bridal lookbook with occasion-wise styling options',
        'Implement an automated inquiry pre-qualification funnel for wedding season bookings'
      ],
      tests: [
        'Test bridal lookbook vs flat Instagram feed as landing destination for paid ads',
        'Test packaged seasonal consultations with transparent tiering'
      ],
      reasoning: 'In beauty and bridal luxury, clients buy the aspiration of looking ethereal; visual noise diminishes perceived artist rates.',
      services: ['Luxury Studio Identity', 'Interactive Lookbook Web Experience', 'Bridal Inquiry System'],
      recommendedProject: 'saanjh',
      nextAction: 'Streamline portfolio into curated signature styles with direct calendar inquiries',
      targetSystem: 'perception',
    };
  }

  if (ind.includes('restaurant') || ind.includes('cafe') || ind.includes('dining')) {
    return {
      summary: `For ${bName} in hospitality & dining, customers crave sensory anticipation and effortless location/menu discovery.`,
      bottlenecks: [
        'Menu is trapped inside clumsy PDF downloads or illegible social photos',
        'Atmosphere and culinary ambiance are underrepresented in digital touchpoints',
        'Zero capture of recurring guests or table reservation data'
      ],
      corrections: [
        'Build an interactive digital sensory menu featuring dish origins and chef notes',
        'Capture the real evening lighting and audio ambiance through cinematic micro-video',
        'Incorporate direct table reservations and event booking triggers'
      ],
      tests: [
        'Compare mobile web menu bounce rates vs traditional PDF downloads',
        'Test weekend chef-table reservation campaigns driven by visual storytelling'
      ],
      reasoning: 'Dining decisions happen in seconds on mobile devices; if the visual vibe and menu are clear, diners convert immediately.',
      services: ['Hospitality Brand Direction', 'Sensory Mobile Web Experience', 'Atmospheric Content Production'],
      recommendedProject: 'rooh-gastronomy',
      nextAction: 'Transform static menu into a high-speed interactive mobile culinary experience',
      targetSystem: 'action',
    };
  }

  if (ind.includes('hotel') || ind.includes('hospitality')) {
    return {
      summary: `For ${bName} in hospitality, high-margin direct bookings require captivating spatial immersion and effortless booking assurance.`,
      bottlenecks: [
        'Heavy dependence on third-party OTAs eating 18-25% margins',
        'Website lacks spatial storytelling and property atmosphere',
        'Direct booking engine feels clunky compared to global booking apps'
      ],
      corrections: [
        'Craft an immersive digital guest journey highlighting property grounds and dining',
        'Incentivize direct bookings with curated experiential perks',
        'Streamline mobile checkout to under 3 frictionless steps'
      ],
      tests: [
        'Test direct booking exclusive package against standard room only',
        'Test full-screen property walk-through on hero section'
      ],
      reasoning: 'Luxury travellers look for a feeling, not just room square footage; direct digital storytelling captures direct revenue.',
      services: ['Hospitality Web Systems', 'Property Cinematic Narrative', 'Direct Reservation Engine'],
      recommendedProject: 'saanjh',
      nextAction: 'Deploy high-fidelity property walk-through with direct booking incentives',
      targetSystem: 'action',
    };
  }

  if (ind.includes('fashion') || ind.includes('retail')) {
    return {
      summary: `For ${bName} in bespoke fashion, brand value lies in fit, fabric texture, and unapologetic sartorial attitude.`,
      bottlenecks: [
        'Generic ecommerce look that fails to convey garment weight, cut, and textile hand-feel',
        'Indecisive styling guidance causing high return rates and hesitation',
        'Inconsistent digital communication across social drops and store events'
      ],
      corrections: [
        'Develop an editorial, dark-room or architectural brand aesthetic with razor-sharp typography',
        'Build a bespoke digital lookbook with zoomable fabric detail and styling guides',
        'Create exclusive seasonal capsule release funnels for VIP clientele'
      ],
      tests: [
        'Test complete outfit styling recommendations vs isolated single-garment product cards',
        'Test fabric-swatch video clips on product pages'
      ],
      reasoning: 'In modern menswear and couture, the purchase is about personal status and identity projection; generic retail interfaces destroy brand premium.',
      services: ['Menswear Editorial Branding', 'High-Speed Fashion Commerce', 'Campaign Creative Direction'],
      recommendedProject: 'veda-living',
      nextAction: 'Curate a signature collection lookbook with high-detail textile storytelling',
      targetSystem: 'perception',
    };
  }

  if (ind.includes('real estate')) {
    return {
      summary: `For ${bName} in luxury real estate, buyers need spatial clarity, architectural prestige, and seamless site-visit booking.`,
      bottlenecks: [
        'Static floor plans and brochure downloads fail to convey light, air, and grandeur',
        'High volume of unqualified leads wasting sales team bandwidth',
        'Digital presentation looks like a speculative broker rather than an institutional developer'
      ],
      corrections: [
        'Design an architectural spatial web platform with 3D walk-throughs and sunlight maps',
        'Implement an exclusive private-viewing qualification pathway for accredited buyers',
        'Elevate project branding to match international architectural standards'
      ],
      tests: [
        'Test interactive 3D site layout vs flat PDF brochure downloads for qualified leads',
        'Test private consultation scheduling vs open phone number displays'
      ],
      reasoning: 'Real estate decisions are rooted in personal legacy and financial security. When your digital platform feels authoritative, buyer confidence follows.',
      services: ['Spatial Architecture Platforms', 'Luxury Real Estate Branding', 'Private Viewing Concierge'],
      recommendedProject: 'veda-living',
      nextAction: 'Replace dense brochure downloads with an interactive spatial project walk-through.',
      targetSystem: 'trust',
    };
  }

  // Default fallback for any other industry
  return {
    summary: `For ${bName} in ${industry || 'business'}, sustainable growth requires aligning your positioning, digital presence, and customer trust.`,
    bottlenecks: [
      'Digital presence fails to communicate the true quality of the physical operation',
      'Visitor journey lacks clear value propositions before asking for inquiries',
      'Brand communication lacks a distinctive editorial point of view'
    ],
    corrections: [
      'Clarify brand positioning around your core competitive distinction',
      'Redesign the digital flagship to communicate authority in the first 5 seconds',
      'Implement structured inquiry and conversion pathways with reduced friction'
    ],
    tests: [
      'Test outcome-driven value propositions vs generic service catalogs',
      'Test simplified one-tap consultation booking vs multi-field lead forms'
    ],
    reasoning: 'Customers compare you to the best experience they had anywhere, not just your local competitors. Clear positioning and exceptional digital craft create immediate trust.',
    services: ['Strategic Brand Positioning', 'Interactive Flagship Website', 'Conversion Experience Architecture'],
    recommendedProject: 'saanjh',
    nextAction: 'Define the single defining reason why premium clients should choose you over alternatives',
    targetSystem: 'trust',
  };
}
