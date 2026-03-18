// ============================================================
// Mock Data for demos when APIs are not connected
// ============================================================

import { BenchmarkMetric, CropAdvisory, WeatherData, ApiUsage, IndicLanguage } from '@/types';

export const MOCK_BENCHMARKS: BenchmarkMetric[] = [
  { language: 'hi', task: 'translation', score: 0.847, bleu: 38.2, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'hi', task: 'sentiment', score: 0.912, accuracy: 91.2, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'hi', task: 'ner', score: 0.876, f1: 87.6, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'hi', task: 'qa', score: 0.823, f1: 82.3, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'hi', task: 'summarization', score: 0.791, rouge: 34.5, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'hi', task: 'generation', score: 0.856, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ta', task: 'translation', score: 0.812, bleu: 35.1, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ta', task: 'sentiment', score: 0.889, accuracy: 88.9, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ta', task: 'ner', score: 0.845, f1: 84.5, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ta', task: 'qa', score: 0.798, f1: 79.8, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'te', task: 'translation', score: 0.805, bleu: 34.8, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'te', task: 'sentiment', score: 0.878, accuracy: 87.8, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'te', task: 'ner', score: 0.834, f1: 83.4, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'kn', task: 'translation', score: 0.798, bleu: 33.9, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'kn', task: 'sentiment', score: 0.867, accuracy: 86.7, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ml', task: 'translation', score: 0.793, bleu: 33.5, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ml', task: 'sentiment', score: 0.871, accuracy: 87.1, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'bn', task: 'translation', score: 0.831, bleu: 36.4, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'bn', task: 'sentiment', score: 0.895, accuracy: 89.5, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'mr', task: 'translation', score: 0.819, bleu: 35.7, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'gu', task: 'translation', score: 0.808, bleu: 34.2, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'pa', task: 'translation', score: 0.815, bleu: 35.0, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'od', task: 'translation', score: 0.782, bleu: 32.1, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'as', task: 'translation', score: 0.771, bleu: 31.5, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'ur', task: 'translation', score: 0.838, bleu: 37.1, model: 'BharatLM-7B', date: '2026-03-01' },
  { language: 'sa', task: 'translation', score: 0.745, bleu: 28.9, model: 'BharatLM-7B', date: '2026-03-01' },
];

export const MOCK_WEATHER: WeatherData = {
  location: 'Pune, Maharashtra',
  temperature: 32,
  humidity: 65,
  rainfall: 2.4,
  forecast: 'Partly cloudy with possibility of light showers',
  advisories: [
    'Good conditions for wheat sowing',
    'Apply nitrogen fertilizer to standing crops',
    'Monitor for pest activity due to humidity',
  ],
};

export const MOCK_CROP_ADVISORIES: CropAdvisory[] = [
  {
    crop: 'Wheat (गेहूं)',
    season: 'Rabi',
    region: 'Punjab, Haryana, UP',
    advice: 'Begin sowing HD-3226 variety. Maintain seed rate of 100kg/ha. First irrigation at 21 days after sowing.',
    marketPrice: 2275,
    language: 'hi',
  },
  {
    crop: 'Rice (धान)',
    season: 'Kharif',
    region: 'West Bengal, Bihar, Odisha',
    advice: 'Transplant 25-day old seedlings. Maintain 2-3cm water in field. Apply zinc sulphate if deficiency observed.',
    marketPrice: 2183,
    language: 'hi',
  },
  {
    crop: 'Cotton (कपास)',
    season: 'Kharif',
    region: 'Gujarat, Maharashtra, Telangana',
    advice: 'Monitor for bollworm. Spray neem-based insecticide. Pick mature bolls regularly for best quality.',
    marketPrice: 6620,
    language: 'hi',
  },
  {
    crop: 'Sugarcane (गन्ना)',
    season: 'Annual',
    region: 'UP, Maharashtra, Karnataka',
    advice: 'Apply potash fertilizer for better sucrose content. Ensure drainage during monsoon. Earthing up recommended.',
    marketPrice: 315,
    language: 'hi',
  },
  {
    crop: 'Groundnut (मूंगफली)',
    season: 'Kharif',
    region: 'Gujarat, Rajasthan, AP',
    advice: 'Harvest when 75% pods are mature. Dry pods to 8% moisture. Store in jute bags in well-ventilated godowns.',
    marketPrice: 5850,
    language: 'hi',
  },
];

export const MOCK_API_USAGE: ApiUsage[] = Array.from({ length: 30 }, (_, i) => ({
  id: `usage-${i}`,
  endpoint: ['/chat', '/translate', '/transliterate', '/tts', '/stt'][Math.floor(Math.random() * 5)],
  language: (['hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu'] as IndicLanguage[])[Math.floor(Math.random() * 8)],
  tokens: Math.floor(Math.random() * 2000) + 100,
  latencyMs: Math.floor(Math.random() * 800) + 50,
  timestamp: new Date(Date.now() - i * 3600000),
  status: Math.random() > 0.05 ? 'success' as const : 'error' as const,
}));

export const EDUCATION_TOPICS: Record<string, { title: string; titleHi: string; subjects: string[] }> = {
  math: { title: 'Mathematics', titleHi: 'गणित', subjects: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics'] },
  science: { title: 'Science', titleHi: 'विज्ञान', subjects: ['Physics', 'Chemistry', 'Biology', 'Environment'] },
  history: { title: 'History', titleHi: 'इतिहास', subjects: ['Ancient India', 'Medieval India', 'Modern India', 'World History'] },
  geography: { title: 'Geography', titleHi: 'भूगोल', subjects: ['Physical', 'Human', 'Economic', 'Indian Geography'] },
  language: { title: 'Language', titleHi: 'भाषा', subjects: ['Grammar', 'Literature', 'Composition', 'Comprehension'] },
};

export const HEALTH_TOPICS = [
  { id: 'maternal', name: 'Maternal Health', nameHi: 'मातृ स्वास्थ्य', icon: '🤰' },
  { id: 'child', name: 'Child Health', nameHi: 'बाल स्वास्थ्य', icon: '👶' },
  { id: 'nutrition', name: 'Nutrition', nameHi: 'पोषण', icon: '🥗' },
  { id: 'vaccination', name: 'Vaccination', nameHi: 'टीकाकरण', icon: '💉' },
  { id: 'firstaid', name: 'First Aid', nameHi: 'प्राथमिक उपचार', icon: '🏥' },
  { id: 'mental', name: 'Mental Health', nameHi: 'मानसिक स्वास्थ्य', icon: '🧠' },
  { id: 'hygiene', name: 'Hygiene', nameHi: 'स्वच्छता', icon: '🧼' },
  { id: 'disease', name: 'Common Diseases', nameHi: 'सामान्य रोग', icon: '🦠' },
];

export function getMockChatResponse(message: string, language: IndicLanguage): string {
  const responses: Record<string, Record<string, string>> = {
    hi: {
      greeting: 'नमस्ते! मैं भारतLM हूँ। मैं आपकी कैसे मदद कर सकता हूँ? आप मुझसे हिन्दी में कुछ भी पूछ सकते हैं।',
      default: 'यह एक बहुत अच्छा सवाल है। मैं इस विषय पर आपकी मदद करने की कोशिश करूँगा। कृपया मुझे और विस्तार से बताएं।',
    },
    ta: {
      greeting: 'வணக்கம்! நான் பாரத்LM. நான் உங்களுக்கு எப்படி உதவ முடியும்? தமிழில் எதையும் கேளுங்கள்.',
      default: 'இது ஒரு நல்ல கேள்வி. இந்த தலைப்பில் உங்களுக்கு உதவ முயற்சிக்கிறேன். மேலும் விவரங்களைச் சொல்லுங்கள்.',
    },
    te: {
      greeting: 'నమస్కారం! నేను భారత్LM. నేను మీకు ఎలా సహాయం చేయగలను? తెలుగులో ఏదైనా అడగండి.',
      default: 'ఇది మంచి ప్రశ్న. ఈ అంశంపై మీకు సహాయం చేయడానికి ప్రయత్నిస్తాను. దయచేసి మరిన్ని వివరాలు చెప్పండి.',
    },
    kn: {
      greeting: 'ನಮಸ್ಕಾರ! ನಾನು ಭಾರತ್LM. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ಕನ್ನಡದಲ್ಲಿ ಏನನ್ನಾದರೂ ಕೇಳಿ.',
      default: 'ಇದು ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ. ಈ ವಿಷಯದ ಬಗ್ಗೆ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ. ದಯವಿಟ್ಟು ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ.',
    },
    bn: {
      greeting: 'নমস্কার! আমি ভারতLM। আমি আপনাকে কীভাবে সাহায্য করতে পারি? বাংলায় যেকোনো কিছু জিজ্ঞাসা করুন।',
      default: 'এটি একটি ভালো প্রশ্ন। এই বিষয়ে আপনাকে সাহায্য করার চেষ্টা করব। অনুগ্রহ করে আরও বিস্তারিত বলুন।',
    },
    en: {
      greeting: 'Hello! I am BharatLM. How can I help you today? Feel free to ask me anything in any Indian language.',
      default: 'That is a great question. Let me help you with this topic. Could you provide more details so I can give you a better answer?',
    },
  };

  const langResponses = responses[language] || responses.en;
  const lower = message.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('नमस्ते') || lower.includes('vanakkam')) {
    return langResponses.greeting;
  }

  return langResponses.default;
}

export function getMockTranslation(text: string, targetLang: IndicLanguage): string {
  // Return a simulated translation note — in production, call actual LLM/translation API
  const prefixes: Partial<Record<IndicLanguage, string>> = {
    hi: '[हिन्दी अनुवाद] ',
    ta: '[தமிழ் மொழிபெயர்ப்பு] ',
    te: '[తెలుగు అనువాదం] ',
    kn: '[ಕನ್ನಡ ಅನುವಾದ] ',
    ml: '[മലയാളം വിവർത്തനം] ',
    bn: '[বাংলা অনুবাদ] ',
    mr: '[मराठी भाषांतर] ',
    gu: '[ગુજરાતી અનુવાદ] ',
    pa: '[ਪੰਜਾਬੀ ਅਨੁਵਾਦ] ',
    ur: '[اردو ترجمہ] ',
    en: '[English Translation] ',
  };

  return (prefixes[targetLang] || '') + text;
}
