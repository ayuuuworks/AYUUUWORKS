export type CaseStatus = 'OPEN' | 'UNDER REVIEW' | 'SOLVED';
export type MediaKind = 'IMAGE' | 'VIDEO' | 'MEME' | 'SCREENSHOT' | 'PRESS';
export type EvidenceStatus = 'VERIFIED' | 'SECONDARY' | 'NEEDS_ASSET';

export interface CaseMedia {
  kind: MediaKind;
  label: string;
  title: string;
  description: string;
  sourceName: string;
  sourceUrl?: string;
  embedUrl?: string;
  imageUrl?: string;
  credit: string;
  usage: 'EMBED' | 'LINK' | 'LICENSED' | 'REPLACE';
  evidenceStatus?: EvidenceStatus;
}

export interface CaseFile {
  id: string;
  number: string;
  title: string;
  kicker: string;
  field: string;
  status: CaseStatus;
  summary: string;
  clue: string;
  type: 'BRAND' | 'MARKETING' | 'DIGITAL' | 'CULTURE';
  featured?: boolean;
  year?: string;
  region?: string;
  sources: { name: string; url: string; type: 'PRIMARY' | 'SECONDARY' }[];
  media: CaseMedia[];
  investigation: {
    facts: string[];
    clues: string[];
    questions: string[];
    takeaway: string;
  };
}

const source = (name: string, url: string, type: 'PRIMARY' | 'SECONDARY' = 'PRIMARY'): CaseMedia => ({
  kind: 'PRESS',
  label: 'SOURCE',
  title: 'Research source',
  description: 'Open the source and inspect the original reporting or primary material before using claims or media.',
  sourceName: name,
  sourceUrl: url,
  credit: name,
  usage: 'LINK',
  evidenceStatus: type === 'PRIMARY' ? 'VERIFIED' : 'SECONDARY',
});

export const caseFiles: CaseFile[] = [
  {
    id: 'cred-indiranagar',
    number: '017',
    title: 'CRED NE AD BANAYA... YA INTERNET KO CONTENT DE DIYA?',
    kicker: 'THE “INDIRANAGAR KA GUNDA” CASE.',
    field: 'Marketing / Culture',
    status: 'SOLVED',
    year: '2021',
    region: 'INDIA',
    summary: 'CRED’s IPL 2021 campaign put Rahul Dravid in an unexpected role and became a large social conversation around the ad.',
    clue: 'The creative tension came from putting a familiar public figure into an unfamiliar role.',
    type: 'MARKETING',
    featured: true,
    sources: [
      { name: 'Exchange4Media / campaign reporting', url: 'https://www.exchange4media.com/ipl-news/rahul-dravid-aka-indiranagar-ka-gunda-hits-it-out-of-the-park-in-creds-new-ipl-ad-112218.html', type: 'SECONDARY' },
      { name: 'Exchange4Media / campaign conversation', url: 'https://www.exchange4media.com/advertising-news/creds-indiranagarkagunda-amass-114k-in-engagement-within-a-week-112362.html', type: 'SECONDARY' },
    ],
    investigation: {
      facts: [
        'Exchange4Media reported that the 2021 CRED IPL campaign featured Rahul Dravid in an unexpected angry avatar.',
        'Exchange4Media reported more than 31K mentions around the campaign in less than a week, based on data shared by Talkwalker.',
      ],
      clues: [
        'The campaign used contrast: a familiar, usually composed figure was shown behaving in a surprising way.',
      ],
      questions: [
        'Was the surprise itself doing part of the attention work?',
        'What made the idea easy for other people and brands to reference?',
      ],
      takeaway: 'A recognizable idea can become culturally useful when the creative creates a clear, repeatable hook.',
    },
    media: [
      source('Exchange4Media campaign report', 'https://www.exchange4media.com/ipl-news/rahul-dravid-aka-indiranagar-ka-gunda-hits-it-out-of-the-park-in-creds-new-ipl-ad-112218.html', 'SECONDARY'),
      {
        kind: 'VIDEO', label: 'FOOTAGE', title: 'Campaign film', description: 'Use the authorized video source rather than downloading or re-hosting third-party footage.', sourceName: 'Campaign source required', credit: 'Verify rights before embed', usage: 'REPLACE', evidenceStatus: 'NEEDS_ASSET',
      },
      {
        kind: 'MEME', label: 'INTERNET', title: 'Public reaction', description: 'Use permission-cleared or linked reaction material with attribution.', sourceName: 'Public reaction archive', credit: 'Verify rights before publication', usage: 'REPLACE', evidenceStatus: 'NEEDS_ASSET',
      },
    ],
  },
  {
    id: 'nike-just-do-it',
    number: '021',
    title: 'NIKE NE SIRF SHOES BECHNE SE KAB IDENTITY BANANI SHURU KI?',
    kicker: 'THE PRODUCT WAS NEVER THE WHOLE STORY.',
    field: 'Brand / Identity',
    status: 'SOLVED',
    year: '1988 → 2025',
    region: 'GLOBAL',
    summary: 'Nike’s own newsroom describes “Just Do It” as a call to action launched in 1988 and documents how the platform has been reinterpreted for new generations.',
    clue: 'The product sits inside a larger point of view about sport, action and identity.',
    type: 'BRAND',
    sources: [
      { name: 'NIKE, Inc. newsroom', url: 'https://about.nike.com/en/newsroom/releases/nike-why-do-it', type: 'PRIMARY' },
    ],
    investigation: {
      facts: [
        'Nike states that “Just Do It” launched in 1988.',
        'Nike’s 2025 “Why Do It?” campaign reinterpreted the platform for a younger generation.',
      ],
      clues: [
        'The recurring platform gives different products and athletes a shared narrative frame.',
      ],
      questions: [
        'What remains recognizable when the campaign, athlete and product change?',
        'Can a brand platform make individual product stories feel connected?',
      ],
      takeaway: 'A durable brand platform can give changing campaigns a recognizable strategic spine.',
    },
    media: [
      source('NIKE, Inc. newsroom', 'https://about.nike.com/en/newsroom/releases/nike-why-do-it', 'PRIMARY'),
      {
        kind: 'IMAGE', label: 'EVIDENCE', title: 'Official campaign gallery', description: 'Link to or embed only media that the source permits you to display.', sourceName: 'Nike newsroom', sourceUrl: 'https://about.nike.com/en/newsroom/releases/nike-why-do-it', credit: 'NIKE, Inc.', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
      {
        kind: 'SCREENSHOT', label: 'ARCHIVE', title: 'Brand platform history', description: 'Use a linked source or rights-cleared screenshot.', sourceName: 'Nike newsroom', sourceUrl: 'https://about.nike.com/en/newsroom/releases/nike-why-do-it', credit: 'NIKE, Inc.', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
    ],
  },
  {
    id: 'zomato-ad-system',
    number: '024',
    title: 'ZOMATO: BRAND VOICE SE AAGE, DISTRIBUTION SYSTEM.',
    kicker: 'WHEN THE PLATFORM BECOMES PART OF THE MARKETING MACHINE.',
    field: 'Marketing / Digital',
    status: 'SOLVED',
    year: '2026',
    region: 'INDIA',
    summary: 'Zomato’s current advertising products show how the platform itself can become a marketing surface, with formats, targeting and campaign measurement built into the marketplace.',
    clue: 'The interesting case is not only what the ad says, but where, when and to whom the platform can deliver it.',
    type: 'MARKETING',
    sources: [
      { name: 'Zomato Brand Ads', url: 'https://www.zomato.com/brand-ads/', type: 'PRIMARY' },
      { name: 'Zomato SocialAds', url: 'https://www.zomato.com/social-ads/', type: 'PRIMARY' },
    ],
    investigation: {
      facts: [
        'Zomato describes multiple advertising formats including static banners, video banners, scratch cards and a spin-the-wheel format.',
        'Zomato describes geography-based, cohort-based and time-based targeting on its advertising platform.',
      ],
      clues: [
        'Distribution, targeting and creative format are presented as one connected advertising system.',
      ],
      questions: [
        'What changes when the platform knows context about the audience?',
        'Can distribution design be part of creative strategy rather than a separate afterthought?',
      ],
      takeaway: 'Marketing can become more interesting when creative, distribution and measurement are designed as one system.',
    },
    media: [
      source('Zomato Brand Ads', 'https://www.zomato.com/brand-ads/', 'PRIMARY'),
      {
        kind: 'SCREENSHOT', label: 'PLATFORM', title: 'Advertising formats', description: 'Use screenshots only under appropriate permissions; otherwise link to the live source.', sourceName: 'Zomato Brand Ads', sourceUrl: 'https://www.zomato.com/brand-ads/', credit: 'Zomato', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
      {
        kind: 'SCREENSHOT', label: 'TARGETING', title: 'SocialAds system', description: 'Source-linked evidence of targeting and reporting features.', sourceName: 'Zomato SocialAds', sourceUrl: 'https://www.zomato.com/social-ads/', credit: 'Zomato', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
    ],
  },
  {
    id: 'netflix-shift',
    number: '031',
    title: 'NETFLIX NE BUSINESS MODEL KO KITNI BAAR REWRITE KIYA?',
    kicker: 'THE CASE OF THE BUSINESS THAT KEPT MOVING.',
    field: 'Digital / Strategy',
    status: 'SOLVED',
    year: '1998 → 2026',
    region: 'GLOBAL',
    summary: 'Netflix documents its evolution from DVD-by-mail to streaming and later global, original-content and engagement-focused systems.',
    clue: 'The customer habit changed. The business system changed with it.',
    type: 'DIGITAL',
    sources: [
      { name: 'About Netflix / DVD to streaming', url: 'https://about.netflix.com/en/news/made-in-asia-watched-by-the-world', type: 'PRIMARY' },
      { name: 'About Netflix / DVD history', url: 'https://about.netflix.com/en/news/thanks-for-watching', type: 'PRIMARY' },
      { name: 'Netflix investor relations', url: 'https://ir.netflix.net/financials/annual-reports-and-proxies/', type: 'PRIMARY' },
    ],
    investigation: {
      facts: [
        'Netflix says it began as a DVD-by-mail company and switched to streaming in 2007.',
        'Netflix shipped its final DVD in September 2023 after a 25-year run.',
      ],
      clues: [
        'The company changed the delivery system as technology and viewing behaviour changed.',
      ],
      questions: [
        'Which customer habit changed first?',
        'What does a business have to stop doing when a new system becomes more useful?',
      ],
      takeaway: 'Sometimes strategy is not improving the existing experience. It is recognizing when the underlying system needs to change.',
    },
    media: [
      source('About Netflix / DVD to streaming', 'https://about.netflix.com/en/news/made-in-asia-watched-by-the-world', 'PRIMARY'),
      {
        kind: 'IMAGE', label: 'ARCHIVE', title: 'The red envelope era', description: 'Use Netflix’s own archive or a permitted linked source.', sourceName: 'About Netflix', sourceUrl: 'https://about.netflix.com/en/news/thanks-for-watching', credit: 'Netflix', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
      {
        kind: 'PRESS', label: 'REPORTING', title: 'Annual reports', description: 'Primary financial and company documentation for deeper research.', sourceName: 'Netflix Investor Relations', sourceUrl: 'https://ir.netflix.net/financials/annual-reports-and-proxies/', credit: 'Netflix, Inc.', usage: 'LINK', evidenceStatus: 'VERIFIED',
      },
    ],
  },
];

export const caseFilters = ['ALL', 'BRAND', 'MARKETING', 'DIGITAL', 'CULTURE'] as const;
