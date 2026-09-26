export type Language = 'hinglish' | 'english';

export interface Translations {
  nav: {
    work: string;
    workSub: string;
    audit: string;
    auditSub: string;
    method: string;
    methodSub: string;
    founder: string;
    founderSub: string;
    missionLaunch: string;
    sfxOn: string;
    sfxOff: string;
    reducedMotion: string;
  };
  hero: {
    tacticalTag: string;
    tagline: string;
    headlinePart1: string;
    headlinePart2: string;
    body: string;
    entryPathHeader: string;
    path1Title: string;
    path1Desc: string;
    path2Title: string;
    path2Desc: string;
    path3Title: string;
    path3Desc: string;
  };
  puep: {
    sectionTag: string;
    title: string;
    subtitle: string;
    description: string;
    autorunPlay: string;
    autorunPause: string;
    capabilitiesTag: string;
    capabilitiesTitle: string;
    capabilitiesSub: string;
  };
  curiosity: {
    tag: string;
    title: string;
    subtitle: string;
  };
  diagnostic: {
    tag: string;
    title: string;
    subtitle: string;
  };
  engine: {
    tag: string;
    title: string;
    subtitle: string;
  };
  contrasts: {
    tag: string;
    title: string;
    subtitle: string;
  };
  projects: {
    tag: string;
    title: string;
    subtitle: string;
  };
  liveDemo: {
    tag: string;
    title: string;
    subtitle: string;
  };
  mirror: {
    tag: string;
    title: string;
    subtitle: string;
  };
  enquiry: {
    tag: string;
    title: string;
    subtitle: string;
  };
  about: {
    tag: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    location: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  hinglish: {
    nav: {
      work: 'KAAM',
      workSub: '/ WORK',
      audit: 'AUDIT',
      auditSub: '/ EXPLORE',
      method: 'METHOD',
      methodSub: '/ PUEP',
      founder: 'FOUNDER',
      founderSub: '/ STORY',
      missionLaunch: 'MISSION LAUNCH',
      sfxOn: 'SFX ON',
      sfxOff: 'SFX OFF',
      reducedMotion: 'REDUCED MOTION',
    },
    hero: {
      tacticalTag: 'SEE YOUR BUSINESS DIFFERENTLY // APNE BUSINESS KO NAYE LENS SE DEKHO',
      tagline: 'DUNIYA MEIN SIRF DEKHNE WALE BOARDS BAHUT HAIN. HUM APKO YAAD REHNE WALA BRAND BANATE HAIN.',
      headlinePart1: 'AAPKA BUSINESS',
      headlinePart2: 'SACH MEIN KAISA DIKHTA HAI?',
      body: 'Log aapko dekh toh rahe hain, par kya unhe sach mein samajh aa raha hai? Hum banate hain AAA-grade digital flagships, high-conversion systems aur iconic brand worlds jo aapko generic crowd se 100x aage khada karte hain.',
      entryPathHeader: 'SELECT YOUR ENTRY PATH // KAHAN SE SHURU KARNA HAI?',
      path1Title: 'APNA BUSINESS AUDIT KARO',
      path1Desc: '30 seconds mein reality check aur perception leak scan karo.',
      path2Title: 'ASLI KAAM DEKHO',
      path2Desc: 'Selected client flagships aur verified transformation proof.',
      path3Title: 'DIRECTLY BAAT KARO',
      path3Desc: 'Founders aur leaders ke sath bespoke strategic engagement shuru karo.',
    },
    puep: {
      sectionTag: 'FRAMEWORK · 05 // PUEP METHODOLOGY',
      title: 'SEE · THINK · BUILD · MOVE.',
      subtitle: '// THE PUEP FRAMEWORK',
      description: 'Strategy bina execution ke sirf baatein hain. Aur execution bina strategy ke mehenga shor hai. Hum business ko ek disciplined connected pipeline mein transform karte hain: See, Think, Build, Move.',
      autorunPlay: 'AUTORUN FLOW',
      autorunPause: 'PAUSE FLOW',
      capabilitiesTag: 'CAPABILITIES // DISCIPLINED EXECUTION',
      capabilitiesTitle: 'SERVICE ARCHITECTURE.',
      capabilitiesSub: 'Char clean disciplines jo aapki positioning aur conversion ko bulletproof banati hain.',
    },
    curiosity: {
      tag: 'PERSPECTIVES · 02 // REALITY CHECK',
      title: 'KABHI SOCHA HAI?',
      subtitle: 'Kuch sawal jo luxury founders aur smart operators ko raat ko jagaye rakhte hain.',
    },
    diagnostic: {
      tag: 'DIAGNOSTIC · 03 // 30-SEC EXPLORER',
      title: 'BUSINESS PERCEPTION AUDIT.',
      subtitle: 'Pata lagao aapka digital presence kahan customer trust aur high-ticket revenue leak kar raha hai.',
    },
    engine: {
      tag: 'SYSTEM · 04 // THE COMMERCIAL ENGINE',
      title: 'ATTENTION SE ACTION TAK.',
      subtitle: 'Char steps jahan silent attention convert hoti hai compounding trust aur high-value deals mein.',
    },
    contrasts: {
      tag: 'STRATEGIC INSIGHT · 06 // ASLIAT KA FAASLA',
      title: 'THE PERCEPTION GAP.',
      subtitle: 'Aapka craft jitna behtareen hai, kya aapka digital screen utna hi respect command karta hai?',
    },
    projects: {
      tag: 'PORTFOLIO · 07 // SELECTED COMMISSIONS',
      title: 'SELECTED COMMISSIONS.',
      subtitle: 'Client flagships jinhone generic category norms ko shatter kiya.',
    },
    liveDemo: {
      tag: 'INTERACTIVE LAB · 08 // TRY IT LIVE',
      title: 'LIVE DEMO LAB.',
      subtitle: 'Sirf baatein nahi. Yahan live tactical interfaces chala kar dekho.',
    },
    mirror: {
      tag: 'THE MIRROR MOMENT · 09 // SELF ASSESSMENT',
      title: 'EK IMANDAR SAWAL.',
      subtitle: 'Agar aap khud apne customer hote, kya aap apni website dekh kar khareedte?',
    },
    enquiry: {
      tag: 'ENGAGEMENT · 11 // COMMISSION BRIEF',
      title: 'AGLA CHAPTER KYA HOGA?',
      subtitle: 'Apne business ko generic crowd se nikal kar category leader banayein.',
    },
    about: {
      tag: 'LEADERSHIP · 12 // STUDIO PRINCIPLES',
      title: 'AYUSH MISHRA & STUDIO VALUES.',
      subtitle: 'Uncompromising design craft, tactical engineering aur commercially accountable thinking.',
    },
    footer: {
      tagline: 'AYUUWORKS // DIGITAL EXPERIENCE STUDIO · ALL RIGHTS RESERVED',
      location: 'DELHI // MUMBAI // GLOBAL COMMISSIONS',
      copyright: 'ENGINEERED WITH AAA MOTION GRAPHICS & DISCIPLINE',
    },
  },
  english: {
    nav: {
      work: 'WORK',
      workSub: '/ PORTFOLIO',
      audit: 'AUDIT',
      auditSub: '/ EXPLORE',
      method: 'METHOD',
      methodSub: '/ PUEP',
      founder: 'FOUNDER',
      founderSub: '/ STORY',
      missionLaunch: 'MISSION LAUNCH',
      sfxOn: 'SFX ON',
      sfxOff: 'SFX OFF',
      reducedMotion: 'REDUCED MOTION',
    },
    hero: {
      tacticalTag: 'SEE YOUR BUSINESS DIFFERENTLY // RE-EXAMINE YOUR DIGITAL POSITION',
      tagline: 'THE WORLD IS FULL OF ORDINARY SCREENS. WE ARCHITECT IRREPLACEABLE BRANDS.',
      headlinePart1: 'HOW DOES YOUR BUSINESS',
      headlinePart2: 'TRULY APPEAR TO CLIENTS?',
      body: 'Clients are observing you, but do they truly comprehend your caliber? We engineer bespoke digital flagships, high-conversion engines, and iconic brand worlds that place you 100x ahead of generic noise.',
      entryPathHeader: 'SELECT YOUR ENTRY PATH // WHERE SHOULD WE BEGIN?',
      path1Title: 'AUDIT YOUR BUSINESS',
      path1Desc: 'Scan perception leaks and friction points in 30 seconds.',
      path2Title: 'EXPLORE CASE STUDIES',
      path2Desc: 'Selected client flagships and verified commercial transformation.',
      path3Title: 'START DIRECT ENGAGEMENT',
      path3Desc: 'Initiate a bespoke strategic dialogue directly with the founder.',
    },
    puep: {
      sectionTag: 'FRAMEWORK · 05 // THE PUEP METHODOLOGY',
      title: 'SEE · THINK · BUILD · MOVE.',
      subtitle: '// THE PUEP FRAMEWORK',
      description: 'Strategy without execution is speculation. Execution without strategy is expensive noise. We forge both into a disciplined, connected AAA production pipeline: See, Think, Build, Move.',
      autorunPlay: 'AUTORUN FLOW',
      autorunPause: 'PAUSE FLOW',
      capabilitiesTag: 'CAPABILITIES // DISCIPLINED EXECUTION',
      capabilitiesTitle: 'SERVICE ARCHITECTURE.',
      capabilitiesSub: 'Four disciplined practices designed to make your commercial conversion and market positioning bulletproof.',
    },
    curiosity: {
      tag: 'PERSPECTIVES · 02 // REALITY CHECK',
      title: 'HAVE YOU CONSIDERED THIS?',
      subtitle: 'Critical strategic questions that keep visionary founders and luxury operators awake at night.',
    },
    diagnostic: {
      tag: 'DIAGNOSTIC · 03 // 30-SEC EXPLORER',
      title: 'BUSINESS PERCEPTION AUDIT.',
      subtitle: 'Discover where your digital presence leaks customer trust, high-ticket deal velocity, and brand authority.',
    },
    engine: {
      tag: 'SYSTEM · 04 // THE COMMERCIAL ENGINE',
      title: 'FROM ATTENTION TO ACTION.',
      subtitle: 'Four interconnected stages transforming transient attention into compounding trust and verified commercial outcomes.',
    },
    contrasts: {
      tag: 'STRATEGIC INSIGHT · 06 // REALITY GAP',
      title: 'THE PERCEPTION GAP.',
      subtitle: 'Does your digital interface command the same prestige and respect as your real-world craft?',
    },
    projects: {
      tag: 'PORTFOLIO · 07 // SELECTED COMMISSIONS',
      title: 'SELECTED COMMISSIONS.',
      subtitle: 'Flagship client transformations that completely disrupted category conventions.',
    },
    liveDemo: {
      tag: 'INTERACTIVE LAB · 08 // TRY IT LIVE',
      title: 'LIVE DEMO LAB.',
      subtitle: 'Do not simply take our word for it. Interact with live tactical prototypes directly.',
    },
    mirror: {
      tag: 'THE MIRROR MOMENT · 09 // SELF ASSESSMENT',
      title: 'AN UNVARNISHED QUESTION.',
      subtitle: 'If you were your own target client, would your current website persuade you to buy?',
    },
    enquiry: {
      tag: 'ENGAGEMENT · 11 // COMMISSION BRIEF',
      title: 'WHAT SHOULD YOUR BUSINESS BECOME NEXT?',
      subtitle: 'Elevate your brand from ordinary category participant into undisputed market authority.',
    },
    about: {
      tag: 'LEADERSHIP · 12 // STUDIO PRINCIPLES',
      title: 'AYUSH MISHRA & STUDIO PRINCIPLES.',
      subtitle: 'Uncompromising design craft, tactical engineering, and commercially accountable vision.',
    },
    footer: {
      tagline: 'AYUUWORKS // DIGITAL EXPERIENCE STUDIO · ALL RIGHTS RESERVED',
      location: 'DELHI // MUMBAI // GLOBAL COMMISSIONS',
      copyright: 'ENGINEERED WITH AAA MOTION GRAPHICS & DISCIPLINE',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.hinglish;
}
