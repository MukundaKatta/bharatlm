// ============================================================
// BharatLM — Core Type Definitions
// ============================================================

export type IndicLanguage =
  | 'hi' | 'ta' | 'te' | 'kn' | 'ml'
  | 'bn' | 'mr' | 'gu' | 'pa' | 'od'
  | 'as' | 'ur' | 'sa' | 'en';

export type IndicScript =
  | 'Devanagari' | 'Tamil' | 'Telugu' | 'Kannada'
  | 'Malayalam' | 'Bengali' | 'Gujarati' | 'Gurmukhi'
  | 'Odia' | 'Assamese' | 'Arabic' | 'Latin';

export interface LanguageInfo {
  code: IndicLanguage;
  name: string;
  nativeName: string;
  script: IndicScript;
  direction: 'ltr' | 'rtl';
  fontFamily: string;
  sampleText: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  language: IndicLanguage;
  timestamp: Date;
  translatedContent?: string;
  audioUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  language: IndicLanguage;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  domain?: 'general' | 'agriculture' | 'education' | 'healthcare';
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: IndicLanguage;
  targetLanguage: IndicLanguage;
  domain?: 'general' | 'legal' | 'medical' | 'agricultural' | 'educational';
}

export interface TranslationResult {
  translatedText: string;
  confidence: number;
  alternatives?: string[];
  sourceLanguage: IndicLanguage;
  targetLanguage: IndicLanguage;
}

export interface ScriptConversion {
  text: string;
  sourceScript: IndicScript;
  targetScript: IndicScript;
}

export interface TransliterationResult {
  input: string;
  output: string;
  targetScript: IndicScript;
  suggestions?: string[];
}

export interface VoiceConfig {
  language: IndicLanguage;
  voiceId?: string;
  speed: number;
  pitch: number;
}

export interface SpeechToTextResult {
  text: string;
  confidence: number;
  language: IndicLanguage;
  duration: number;
}

export interface TextToSpeechRequest {
  text: string;
  language: IndicLanguage;
  speed?: number;
  pitch?: number;
}

export interface DocumentTranslation {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: IndicLanguage;
  targetLanguage: IndicLanguage;
  domain: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  createdAt: Date;
}

export interface BenchmarkMetric {
  language: IndicLanguage;
  task: 'translation' | 'sentiment' | 'ner' | 'qa' | 'summarization' | 'generation';
  score: number;
  bleu?: number;
  rouge?: number;
  f1?: number;
  accuracy?: number;
  model: string;
  date: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
  advisories: string[];
}

export interface CropAdvisory {
  crop: string;
  season: string;
  region: string;
  advice: string;
  marketPrice?: number;
  language: IndicLanguage;
}

export interface ApiUsage {
  id: string;
  endpoint: string;
  language: IndicLanguage;
  tokens: number;
  latencyMs: number;
  timestamp: Date;
  status: 'success' | 'error';
}

export interface User {
  id: string;
  email: string;
  preferredLanguage: IndicLanguage;
  apiKey?: string;
  createdAt: Date;
}
