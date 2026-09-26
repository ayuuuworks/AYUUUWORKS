export interface IndustryOption {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  accent: string;
  recommendedProjectId: string;
  sampleBottlenecks: string[];
}

export const INDUSTRIES: IndustryOption[] = [
  {
    id: 'Jewellery',
    name: 'Jewellery & Heirloom',
    hindiName: 'आभूषण / ज्वेलरी',
    tagline: 'Precious gold, diamonds, bridal polki & gemstones',
    accent: '#d97706',
    recommendedProjectId: 'the-grand-haveli',
    sampleBottlenecks: ['Lack of digital hallmark trust', 'Offline walk-ins slowing down', 'Generic catalog look']
  },
  {
    id: 'Beauty / Makeup',
    name: 'Beauty & Makeup Studio',
    hindiName: 'मेकअप / ब्राइडल स्टूडियो',
    tagline: 'Bridal artistry, salons, skin aesthetics & masterclasses',
    accent: '#fb7185',
    recommendedProjectId: 'saanjh',
    sampleBottlenecks: ['Endless rate-haggling in DMs', 'Inconsistent seasonal bookings', 'Amateur social grid']
  },
  {
    id: 'Hotel / Hospitality',
    name: 'Hotel & Hospitality',
    hindiName: 'होटल / डेस्टिनेशन / रिसॉर्ट',
    tagline: 'Heritage stays, luxury boutique hotels & destination venues',
    accent: '#10b981',
    recommendedProjectId: 'saanjh',
    sampleBottlenecks: ['Heavy OTA commissions', 'Atmosphere lost in photo galleries', 'Low direct website conversions']
  },
  {
    id: 'Fashion / Retail',
    name: 'Fashion & Bespoke Menswear',
    hindiName: 'फैशन / टेलरिंग / मेन्सवियर',
    tagline: 'Ethnic wear, luxury tailoring, designer streetwear & retail',
    accent: '#f59e0b',
    recommendedProjectId: 'veda-living',
    sampleBottlenecks: ['Perceived as generic readymade', 'Low repeat customer retention', 'Disjointed campaign drops']
  },
  {
    id: 'Restaurant / Cafe',
    name: 'Restaurant / Cafe',
    hindiName: 'रेस्तरां / कैफे / डाइनिंग',
    tagline: 'Specialty coffee, fine dining, bistros & culinary clubs',
    accent: '#f97316',
    recommendedProjectId: 'rooh-gastronomy',
    sampleBottlenecks: ['Clunky PDF menu downloads', 'Uninspiring table reservation journey', 'Poor local discovery']
  },
  {
    id: 'Real Estate',
    name: 'Real Estate & Infrastructure',
    hindiName: 'रियल एस्टेट / लक्जरी प्रोजेक्ट्स',
    tagline: 'Luxury villas, plotted communities & commercial spaces',
    accent: '#38bdf8',
    recommendedProjectId: 'veda-living',
    sampleBottlenecks: ['Brochures lack spatial emotional pull', 'High junk inquiry volume', 'Slow site-visit conversion']
  },
  {
    id: 'Education',
    name: 'Education & Academies',
    hindiName: 'शिक्षा / ट्रेनिंग एकेडमी',
    tagline: 'Professional institutes, private schools & creative courses',
    accent: '#8b5cf6',
    recommendedProjectId: 'the-grand-haveli',
    sampleBottlenecks: ['Outdated curriculum presentation', 'Low student enrollment trust', 'Cluttered admission portals']
  },
  {
    id: 'Startup / New Business',
    name: 'Startup & New Venture',
    hindiName: 'स्टार्टअप / नया बिजनेस',
    tagline: 'Tech-enabled platforms, D2C ventures & modern services',
    accent: '#ec4899',
    recommendedProjectId: 'rooh-gastronomy',
    sampleBottlenecks: ['Unclear market positioning', 'Looking like a hobby rather than an enterprise', 'Low investor/client traction']
  },
  {
    id: 'Other',
    name: 'Other Established Enterprise',
    hindiName: 'अन्य व्यवसाय',
    tagline: 'B2B manufacturing, luxury healthcare & professional practices',
    accent: '#94a3b8',
    recommendedProjectId: 'the-grand-haveli',
    sampleBottlenecks: ['Digital identity lagging behind physical company size', 'Low digital lead quality']
  }
];

export interface TensionOption {
  id: string;
  hindiText: string;
  englishText: string;
  category: 'ATTENTION' | 'PERCEPTION' | 'TRUST' | 'ACTION';
  systemTarget: 'attention' | 'perception' | 'trust' | 'action';
  challenge?: {
    assumption: string;
    reality: string;
    explanation: string;
  };
}

export const TENSIONS: TensionOption[] = [
  {
    id: 'notice-me',
    hindiText: 'Log humein notice nahi karte.',
    englishText: 'People scroll past us or do not know we exist in their city.',
    category: 'ATTENTION',
    systemTarget: 'attention',
    challenge: {
      assumption: 'More frequent social media posting will solve this.',
      reality: 'Louder noise does not equal visibility; distinctive positioning does.',
      explanation: 'Flooding Instagram with generic graphic posts does not generate attention in saturated markets. What generates attention is an unmistakable point of view and visual sharpness that forces the viewer to pause.'
    }
  },
  {
    id: 'forget-me',
    hindiText: 'Log dekhte hain, par yaad nahi rakhte.',
    englishText: 'People look, but immediately forget or confuse us with others.',
    category: 'PERCEPTION',
    systemTarget: 'perception',
    challenge: {
      assumption: 'A flashier discount campaign will make them remember.',
      reality: 'Memorability requires a signature visual anchor, not cheaper prices.',
      explanation: 'Discounts make people remember the deal, not the brand. If your visual language looks identical to 10 other businesses on the street, no amount of advertising creates long-term brand equity.'
    }
  },
  {
    id: 'not-premium',
    hindiText: 'Brand utna premium nahi lagta.',
    englishText: 'Our physical work is exceptional, but our digital presence looks second-tier.',
    category: 'PERCEPTION',
    systemTarget: 'perception',
    challenge: {
      assumption: 'Adding golden gradients and cursive fonts makes things look luxury.',
      reality: 'True luxury is editorial restraint, breathing room, and typographic authority.',
      explanation: 'Excessive ornamentation and loud badge clutter actually cheapen high-end businesses. Luxury brands communicate through space, deliberate lighting, and flawless micro-interactions.'
    }
  },
  {
    id: 'no-enquiries',
    hindiText: 'Website visitors enquiry nahi karte.',
    englishText: 'People visit our profile or website, but bounce without inquiring.',
    category: 'ACTION',
    systemTarget: 'action',
    challenge: {
      assumption: 'We need a bigger pop-up contact form or flashing WhatsApp button.',
      reality: 'Visitors bounce when proof is absent and conversion friction is high.',
      explanation: 'If a customer has not been convinced in the first 15 seconds, a pushy form only scares them away. The conversion journey must feel like a natural, high-value conversation, not a data extraction form.'
    }
  },
  {
    id: 'random-social',
    hindiText: 'Social media random lagti hai.',
    englishText: 'Our feed feels like a scrapbook with zero consistency or voice.',
    category: 'PERCEPTION',
    systemTarget: 'perception',
    challenge: {
      assumption: 'We just need an agency to post 30 Canva templates a month.',
      reality: '30 mediocre posts cause more brand erosion than 4 decisive editorial drops.',
      explanation: 'High-caliber clients judge your attention to detail by the worst thing on your profile. A curated content system with authentic craft footage beats generic calendar filler every single time.'
    }
  },
  {
    id: 'competitors-ahead',
    hindiText: 'Competitors zyada established lagte hain.',
    englishText: 'Competitors with inferior craft look twice as credible online.',
    category: 'TRUST',
    systemTarget: 'trust',
    challenge: {
      assumption: 'They have been around longer, so we cannot catch up.',
      reality: 'Digital authority can be established in 60 days with the right flagship experience.',
      explanation: 'Market perception is not set by calendar years; it is set by narrative clarity, customer proof, and digital sophistication. A modern digital flagship instantly changes the power balance.'
    }
  },
  {
    id: 'marketing-opaque',
    hindiText: 'Marketing ka result samajh nahi aata.',
    englishText: 'We spend money on ads and agencies, but cannot trace real business revenue.',
    category: 'ACTION',
    systemTarget: 'action',
    challenge: {
      assumption: 'Marketing is just a vanity expense you have to keep paying.',
      reality: 'Marketing without a conversion architecture is just expensive vanity.',
      explanation: 'If your traffic lands on a weak, slow, or generic page, 95% of your ad spend is wasted. Traffic without conversion architecture is just throwing fuel on wet wood.'
    }
  },
  {
    id: 'next-step-unclear',
    hindiText: 'Business grow karna hai, next step clear nahi hai.',
    englishText: 'We want to scale to the next league, but our brand foundation is shaky.',
    category: 'TRUST',
    systemTarget: 'trust',
    challenge: {
      assumption: 'We should try 5 different marketing tactics all at once.',
      reality: 'Scaling requires fixing the primary bottleneck in sequence: Attention → Perception → Trust → Action.',
      explanation: 'Pouring traffic into a broken perception engine guarantees wasted capital. Sequence matters: first fix the brand foundation and flagship experience, then amplify.'
    }
  },
  {
    id: 'something-else',
    hindiText: 'Kuch aur problem hai.',
    englishText: 'We have a nuanced or complex business challenge to untangle.',
    category: 'ATTENTION',
    systemTarget: 'attention'
  }
];

export const FOLLOW_UP_QUESTIONS = [
  {
    id: 'lead-friction',
    question: 'Jab koi naya customer aapse contact karta hai, sabse zyada rukawat kahan aati hai?',
    options: [
      'Rate sunkar bargain karne lagte hain (Price resistance)',
      'Proof mangte hain ki hum genuine hain ya nahi (Trust deficit)',
      'Samajh nahi paate ki hum dusron se alag kyun hain (Differentiation gap)',
      'Follow-up mein gayab ho jaate hain (Follow-up drop-off)'
    ]
  },
  {
    id: 'primary-ambition',
    question: 'Agle 6-12 mahine mein sabse zaroori objective kya hai?',
    options: [
      'Zyada premium clients attract karna jo value ko samjhein',
      'Local market se nikal kar regional / national level par pehchaan banana',
      'Direct inquiries aur website bookings ka system automate karna',
      'Purane brand ko complete modern makeover dena'
    ]
  }
];
