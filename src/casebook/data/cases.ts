export type CaseStatus = 'OPEN' | 'UNDER REVIEW' | 'SOLVED';

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
}

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
  },
];

export const caseFilters = ['ALL', 'BRAND', 'MARKETING', 'DIGITAL', 'CULTURE'] as const;
