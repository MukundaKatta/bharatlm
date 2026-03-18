import { IndicLanguage, IndicScript, LanguageInfo } from '@/types';

export const LANGUAGES: Record<IndicLanguage, LanguageInfo> = {
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    direction: 'ltr',
    fontFamily: 'font-devanagari',
    sampleText: 'नमस्ते, मैं भारतLM हूँ। मैं आपकी कैसे मदद कर सकता हूँ?',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    direction: 'ltr',
    fontFamily: 'font-tamil',
    sampleText: 'வணக்கம், நான் பாரத்LM. நான் உங்களுக்கு எப்படி உதவ முடியும்?',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    direction: 'ltr',
    fontFamily: 'font-telugu',
    sampleText: 'నమస్కారం, నేను భారత్LM. నేను మీకు ఎలా సహాయం చేయగలను?',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    fontFamily: 'font-kannada',
    sampleText: 'ನಮಸ್ಕಾರ, ನಾನು ಭಾರತ್LM. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    direction: 'ltr',
    fontFamily: 'font-malayalam',
    sampleText: 'നമസ്കാരം, ഞാൻ ഭാരത്LM ആണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    direction: 'ltr',
    fontFamily: 'font-bengali',
    sampleText: 'নমস্কার, আমি ভারতLM। আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    direction: 'ltr',
    fontFamily: 'font-devanagari',
    sampleText: 'नमस्कार, मी भारतLM आहे. मी तुमची कशी मदत करू शकतो?',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    direction: 'ltr',
    fontFamily: 'font-gujarati',
    sampleText: 'નમસ્તે, હું ભારતLM છું. હું તમને કેવી રીતે મદદ કરી શકું?',
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    direction: 'ltr',
    fontFamily: 'font-gurmukhi',
    sampleText: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਭਾਰਤLM ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
  },
  od: {
    code: 'od',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    direction: 'ltr',
    fontFamily: 'font-oriya',
    sampleText: 'ନମସ୍କାର, ମୁଁ ଭାରତLM। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
  },
  as: {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Assamese',
    direction: 'ltr',
    fontFamily: 'font-bengali',
    sampleText: 'নমস্কাৰ, মই ভাৰতLM। মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    script: 'Arabic',
    direction: 'rtl',
    fontFamily: 'font-sans',
    sampleText: 'سلام، میں بھارتLM ہوں۔ میں آپ کی کیسے مدد کر سکتا ہوں؟',
  },
  sa: {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    direction: 'ltr',
    fontFamily: 'font-devanagari',
    sampleText: 'नमस्ते, अहं भारतLM अस्मि। अहं भवतः कथं साहाय्यं कर्तुं शक्नोमि?',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    direction: 'ltr',
    fontFamily: 'font-sans',
    sampleText: 'Hello, I am BharatLM. How can I help you?',
  },
};

export const SCRIPTS: IndicScript[] = [
  'Devanagari', 'Tamil', 'Telugu', 'Kannada',
  'Malayalam', 'Bengali', 'Gujarati', 'Gurmukhi',
  'Odia', 'Assamese', 'Arabic', 'Latin',
];

export function getLanguageByCode(code: IndicLanguage): LanguageInfo {
  return LANGUAGES[code];
}

export function getLanguagesForScript(script: IndicScript): LanguageInfo[] {
  return Object.values(LANGUAGES).filter(l => l.script === script);
}

export function getFontClass(language: IndicLanguage): string {
  return LANGUAGES[language]?.fontFamily || 'font-sans';
}

export function getTextDirection(language: IndicLanguage): 'ltr' | 'rtl' {
  return LANGUAGES[language]?.direction || 'ltr';
}

export function getAllLanguages(): LanguageInfo[] {
  return Object.values(LANGUAGES);
}

export function getIndicLanguages(): LanguageInfo[] {
  return Object.values(LANGUAGES).filter(l => l.code !== 'en');
}
