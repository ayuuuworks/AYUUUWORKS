export type CaseStatus = 'OPEN' | 'UNDER REVIEW' | 'SOLVED';
export type MediaKind = 'IMAGE' | 'VIDEO' | 'MEME' | 'SCREENSHOT' | 'PRESS';

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
  media: CaseMedia[];
  investigation: {
    facts: string[];
    clues: string[];
    questions: string[];
    takeaway: string;
  };
}

const source = (name: string, usage: CaseMedia['usage'] = 'LINK'): CaseMedia => ({
  kind: 'PRESS',
  label: 'SOURCE',
  title: 'Original source',
  description: 'Source placeholder. Add the verified publication or official campaign URL before publishing.',
  sourceName: name,
  sourceUrl: undefined,
  credit: name,
  usage,
});

export const caseFiles: CaseFile[] = [
  {
    id: 'cred-attention',
    number: '017',
    title: 'CRED NE AD BANAYA... YA INTERNET KO CONTENT DE DIYA?',
    kicker: 'THE CAMPAIGN THAT MADE PEOPLE ASK: “YEH KYA THA?”',
    field: 'Marketing / Culture',
    status: 'SOLVED',
    summary: 'Ek financial brand ne advertising ko sirf product communication nahi rehne diya. Campaign khud conversation ban gaya.',
    clue: 'Attention sirf campaign ka result nahi tha. Attention campaign ka hissa ban gaya.',
    type: 'MARKETING',
    featured: true,
    investigation: {
      facts: ['The campaign became widely discussed as advertising and entertainment overlapped.'],
      clues: ['The creative idea gave people something to talk about beyond the product itself.'],
      questions: ['Was attention designed into the idea?', 'What made the campaign feel shareable?'],
      takeaway: 'Attention can become part of the creative system when the idea gives people a reason to pass it on.',
    },
    media: [
      source('Official campaign source', 'LINK'),
      {
        kind: 'VIDEO',
        label: 'FOOTAGE',
        title: 'Campaign film',
        description: 'Official or authorized campaign video. Embed only when the source permits it.',
        sourceName: 'Official brand channel',
        credit: 'CRED / official source',
        usage: 'EMBED',
      },
      {
        kind: 'MEME',
        label: 'INTERNET',
        title: 'Public reaction',
        description: 'Use an original or permission-cleared reaction/meme asset, with attribution.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'nike-identity',
    number: '021',
    title: 'NIKE NE SIRF SHOES BECHNE SE KAB IDENTITY BECHNI SHURU KI?',
    kicker: 'THE PRODUCT WAS NEVER THE WHOLE STORY.',
    field: 'Brand / Identity',
    status: 'UNDER REVIEW',
    summary: 'Ek product category se zyada powerful cheez kabhi-kabhi woh identity hoti hai jo customer us product ke saath adopt karta hai.',
    clue: 'Log product ko yaad rakhne se pehle point of view ko yaad rakh sakte hain.',
    type: 'BRAND',
    media: [
      source('Official brand / campaign source', 'LINK'),
      {
        kind: 'IMAGE',
        label: 'EVIDENCE',
        title: 'Campaign image',
        description: 'Replace with an authorized campaign image or a source link.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'SCREENSHOT',
        label: 'DIGITAL',
        title: 'Brand touchpoint',
        description: 'Use a permitted screenshot or link to the original page.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'zomato-personality',
    number: '024',
    title: 'ZOMATO KA BRAND VOICE: POST HAI YA PERSONALITY?',
    kicker: 'WHEN A BRAND STARTS SOUNDING LIKE A PERSON.',
    field: 'Social / Brand Voice',
    status: 'SOLVED',
    summary: 'Social media sirf announcements ka board nahi raha. Voice khud brand asset ban sakti hai.',
    clue: 'Consistency sirf colours aur logo mein nahi hoti. Tone mein bhi hoti hai.',
    type: 'CULTURE',
    media: [
      source('Official social / campaign source', 'LINK'),
      {
        kind: 'SCREENSHOT',
        label: 'SOCIAL',
        title: 'Social post',
        description: 'Use a permitted screenshot or link to the original post.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'MEME',
        label: 'REACTION',
        title: 'Internet response',
        description: 'Add only a permission-cleared or original reaction asset.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'netflix-shift',
    number: '031',
    title: 'NETFLIX NE BUSINESS BADLA. AUDIENCE KYUN RUKI?',
    kicker: 'THE CASE OF THE BUSINESS THAT KEPT MOVING.',
    field: 'Digital / Strategy',
    status: 'OPEN',
    summary: 'Kabhi-kabhi strongest move existing model ko polish karna nahi, model ko rethink karna hota hai.',
    clue: 'Customer habit ko samajhna kabhi product feature se zyada important ho sakta hai.',
    type: 'DIGITAL',
    media: [
      source('Official / primary source', 'LINK'),
      {
        kind: 'VIDEO',
        label: 'FOOTAGE',
        title: 'Business evolution',
        description: 'Use an official source or an authorized explainer.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'IMAGE',
        label: 'EVIDENCE',
        title: 'Product evolution',
        description: 'Replace with authorized imagery or a source link.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
];

export const caseFilters = ['ALL', 'BRAND', 'MARKETING', 'DIGITAL', 'CULTURE'] as const;    investigation: {
      facts: ['Netflix has evolved its product and business model over time as viewing habits and technology changed.'],
      clues: ['Business models can be redesigned around changing customer behaviour.'],
      questions: ['Which customer habit changed?', 'What had to change with it?'],
      takeaway: 'Sometimes the strategic move is not a better version of the old system, but a new system.',
    },
    media: [
      source('Official campaign source', 'LINK'),
      {
        kind: 'VIDEO',
        label: 'FOOTAGE',
        title: 'Campaign film',
        description: 'Official or authorized campaign video. Embed only when the source permits it.',
        sourceName: 'Official brand channel',
        credit: 'CRED / official source',
        usage: 'EMBED',
      },
      {
        kind: 'MEME',
        label: 'INTERNET',
        title: 'Public reaction',
        description: 'Use an original or permission-cleared reaction/meme asset, with attribution.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'nike-identity',
    number: '021',
    title: 'NIKE NE SIRF SHOES BECHNE SE KAB IDENTITY BECHNI SHURU KI?',
    kicker: 'THE PRODUCT WAS NEVER THE WHOLE STORY.',
    field: 'Brand / Identity',
    status: 'UNDER REVIEW',
    summary: 'Ek product category se zyada powerful cheez kabhi-kabhi woh identity hoti hai jo customer us product ke saath adopt karta hai.',
    clue: 'Log product ko yaad rakhne se pehle point of view ko yaad rakh sakte hain.',
    type: 'BRAND',
    media: [
      source('Official brand / campaign source', 'LINK'),
      {
        kind: 'IMAGE',
        label: 'EVIDENCE',
        title: 'Campaign image',
        description: 'Replace with an authorized campaign image or a source link.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'SCREENSHOT',
        label: 'DIGITAL',
        title: 'Brand touchpoint',
        description: 'Use a permitted screenshot or link to the original page.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'zomato-personality',
    number: '024',
    title: 'ZOMATO KA BRAND VOICE: POST HAI YA PERSONALITY?',
    kicker: 'WHEN A BRAND STARTS SOUNDING LIKE A PERSON.',
    field: 'Social / Brand Voice',
    status: 'SOLVED',
    summary: 'Social media sirf announcements ka board nahi raha. Voice khud brand asset ban sakti hai.',
    clue: 'Consistency sirf colours aur logo mein nahi hoti. Tone mein bhi hoti hai.',
    type: 'CULTURE',
    media: [
      source('Official social / campaign source', 'LINK'),
      {
        kind: 'SCREENSHOT',
        label: 'SOCIAL',
        title: 'Social post',
        description: 'Use a permitted screenshot or link to the original post.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'MEME',
        label: 'REACTION',
        title: 'Internet response',
        description: 'Add only a permission-cleared or original reaction asset.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
  {
    id: 'netflix-shift',
    number: '031',
    title: 'NETFLIX NE BUSINESS BADLA. AUDIENCE KYUN RUKI?',
    kicker: 'THE CASE OF THE BUSINESS THAT KEPT MOVING.',
    field: 'Digital / Strategy',
    status: 'OPEN',
    summary: 'Kabhi-kabhi strongest move existing model ko polish karna nahi, model ko rethink karna hota hai.',
    clue: 'Customer habit ko samajhna kabhi product feature se zyada important ho sakta hai.',
    type: 'DIGITAL',
    media: [
      source('Official / primary source', 'LINK'),
      {
        kind: 'VIDEO',
        label: 'FOOTAGE',
        title: 'Business evolution',
        description: 'Use an official source or an authorized explainer.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
      {
        kind: 'IMAGE',
        label: 'EVIDENCE',
        title: 'Product evolution',
        description: 'Replace with authorized imagery or a source link.',
        sourceName: 'Verified source required',
        credit: 'Attribution required',
        usage: 'REPLACE',
      },
    ],
  },
];

export const caseFilters = ['ALL', 'BRAND', 'MARKETING', 'DIGITAL', 'CULTURE'] as const;
