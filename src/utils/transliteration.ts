// ============================================================
// Transliteration Engine — English to Indic Scripts
// Uses phonetic mapping tables for each script
// ============================================================

import { IndicScript } from '@/types';

type CharMap = Record<string, string>;

const DEVANAGARI_MAP: CharMap = {
  'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ',
  'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'an': 'अं', 'ah': 'अः',
  'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'nga': 'ङ',
  'cha': 'च', 'chha': 'छ', 'ja': 'ज', 'jha': 'झ', 'nya': 'ञ',
  'ta': 'ट', 'tha': 'ठ', 'da': 'ड', 'dha': 'ढ', 'na': 'ण',
  'tha2': 'त', 'tha3': 'थ', 'da2': 'द', 'dha2': 'ध', 'na2': 'न',
  'pa': 'प', 'pha': 'फ', 'ba': 'ब', 'bha': 'भ', 'ma': 'म',
  'ya': 'य', 'ra': 'र', 'la': 'ल', 'va': 'व', 'wa': 'व',
  'sha': 'श', 'sha2': 'ष', 'sa': 'स', 'ha': 'ह',
  'ksha': 'क्ष', 'tra': 'त्र', 'gya': 'ज्ञ',
  'ri': 'ऋ', '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
  '.': '।', '..': '॥',
};

const DEVANAGARI_VOWEL_SIGNS: CharMap = {
  'a': '', 'aa': 'ा', 'i': 'ि', 'ee': 'ी', 'u': 'ु', 'oo': 'ू',
  'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ', 'an': 'ं', 'ah': 'ः',
  'ri': 'ृ',
};

const TAMIL_MAP: CharMap = {
  'a': 'அ', 'aa': 'ஆ', 'i': 'இ', 'ee': 'ஈ', 'u': 'உ', 'oo': 'ஊ',
  'e': 'எ', 'ai': 'ஐ', 'o': 'ஒ', 'au': 'ஔ',
  'ka': 'க', 'nga': 'ங', 'cha': 'ச', 'ja': 'ஜ', 'nya': 'ஞ',
  'ta': 'ட', 'na': 'ண', 'tha': 'த', 'na2': 'ந', 'pa': 'ப',
  'ma': 'ம', 'ya': 'ய', 'ra': 'ர', 'la': 'ல', 'va': 'வ',
  'zha': 'ழ', 'sha': 'ஷ', 'sa': 'ஸ', 'ha': 'ஹ',
  '0': '௦', '1': '௧', '2': '௨', '3': '௩', '4': '௪',
  '5': '௫', '6': '௬', '7': '௭', '8': '௮', '9': '௯',
};

const TELUGU_MAP: CharMap = {
  'a': 'అ', 'aa': 'ఆ', 'i': 'ఇ', 'ee': 'ఈ', 'u': 'ఉ', 'oo': 'ఊ',
  'e': 'ఎ', 'ai': 'ఐ', 'o': 'ఒ', 'au': 'ఔ',
  'ka': 'క', 'kha': 'ఖ', 'ga': 'గ', 'gha': 'ఘ', 'nga': 'ఙ',
  'cha': 'చ', 'chha': 'ఛ', 'ja': 'జ', 'jha': 'ఝ', 'nya': 'ఞ',
  'ta': 'ట', 'tha': 'ఠ', 'da': 'డ', 'dha': 'ఢ', 'na': 'ణ',
  'pa': 'ప', 'pha': 'ఫ', 'ba': 'బ', 'bha': 'భ', 'ma': 'మ',
  'ya': 'య', 'ra': 'ర', 'la': 'ల', 'va': 'వ',
  'sha': 'శ', 'sha2': 'ష', 'sa': 'స', 'ha': 'హ',
};

const KANNADA_MAP: CharMap = {
  'a': 'ಅ', 'aa': 'ಆ', 'i': 'ಇ', 'ee': 'ಈ', 'u': 'ಉ', 'oo': 'ಊ',
  'e': 'ಎ', 'ai': 'ಐ', 'o': 'ಒ', 'au': 'ಔ',
  'ka': 'ಕ', 'kha': 'ಖ', 'ga': 'ಗ', 'gha': 'ಘ', 'nga': 'ಙ',
  'cha': 'ಚ', 'chha': 'ಛ', 'ja': 'ಜ', 'jha': 'ಝ', 'nya': 'ಞ',
  'ta': 'ಟ', 'tha': 'ಠ', 'da': 'ಡ', 'dha': 'ಢ', 'na': 'ಣ',
  'pa': 'ಪ', 'pha': 'ಫ', 'ba': 'ಬ', 'bha': 'ಭ', 'ma': 'ಮ',
  'ya': 'ಯ', 'ra': 'ರ', 'la': 'ಲ', 'va': 'ವ',
  'sha': 'ಶ', 'sha2': 'ಷ', 'sa': 'ಸ', 'ha': 'ಹ',
};

const SCRIPT_MAPS: Partial<Record<IndicScript, CharMap>> = {
  Devanagari: DEVANAGARI_MAP,
  Tamil: TAMIL_MAP,
  Telugu: TELUGU_MAP,
  Kannada: KANNADA_MAP,
};

/**
 * Simple phonetic transliteration from English to Indic script.
 * For production, integrate with Google Input Tools or Varnam API.
 */
export function transliterate(input: string, targetScript: IndicScript): string {
  const map = SCRIPT_MAPS[targetScript];
  if (!map) return input;

  let result = '';
  let i = 0;
  const lower = input.toLowerCase();

  while (i < lower.length) {
    let matched = false;

    // Try matching longest sequences first (up to 4 chars)
    for (let len = 4; len >= 1; len--) {
      const substr = lower.substring(i, i + len);
      if (map[substr]) {
        result += map[substr];
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Pass through spaces, punctuation, etc.
      result += lower[i];
      i++;
    }
  }

  return result;
}

/**
 * Get transliteration suggestions for partial input.
 */
export function getSuggestions(input: string, targetScript: IndicScript): string[] {
  const map = SCRIPT_MAPS[targetScript];
  if (!map) return [];

  const lower = input.toLowerCase();
  const suggestions: string[] = [];

  // Find all map entries that start with the input
  for (const [key, value] of Object.entries(map)) {
    if (key.startsWith(lower) || lower.startsWith(key)) {
      suggestions.push(value);
    }
  }

  return suggestions.slice(0, 5);
}

// ============================================================
// Script-to-Script Converter
// Uses Unicode codepoint offset mapping between Indic scripts
// ============================================================

interface ScriptRange {
  base: number;
  vowels: [number, number];
  consonants: [number, number];
  digits: [number, number];
}

const SCRIPT_RANGES: Partial<Record<IndicScript, ScriptRange>> = {
  Devanagari: { base: 0x0900, vowels: [0x0904, 0x0914], consonants: [0x0915, 0x0939], digits: [0x0966, 0x096F] },
  Bengali:    { base: 0x0980, vowels: [0x0985, 0x0994], consonants: [0x0995, 0x09B9], digits: [0x09E6, 0x09EF] },
  Gurmukhi:   { base: 0x0A00, vowels: [0x0A05, 0x0A14], consonants: [0x0A15, 0x0A39], digits: [0x0A66, 0x0A6F] },
  Gujarati:   { base: 0x0A80, vowels: [0x0A85, 0x0A94], consonants: [0x0A95, 0x0AB9], digits: [0x0AE6, 0x0AEF] },
  Odia:       { base: 0x0B00, vowels: [0x0B05, 0x0B14], consonants: [0x0B15, 0x0B39], digits: [0x0B66, 0x0B6F] },
  Tamil:      { base: 0x0B80, vowels: [0x0B85, 0x0B94], consonants: [0x0B95, 0x0BB9], digits: [0x0BE6, 0x0BEF] },
  Telugu:     { base: 0x0C00, vowels: [0x0C05, 0x0C14], consonants: [0x0C15, 0x0C39], digits: [0x0C66, 0x0C6F] },
  Kannada:    { base: 0x0C80, vowels: [0x0C85, 0x0C94], consonants: [0x0C95, 0x0CB9], digits: [0x0CE6, 0x0CEF] },
  Malayalam:  { base: 0x0D00, vowels: [0x0D05, 0x0D14], consonants: [0x0D15, 0x0D39], digits: [0x0D66, 0x0D6F] },
};

/**
 * Convert text between Indic scripts using Unicode block offset mapping.
 * Works for scripts that share the same structural layout (Brahmic family).
 */
export function convertScript(text: string, sourceScript: IndicScript, targetScript: IndicScript): string {
  const srcRange = SCRIPT_RANGES[sourceScript];
  const tgtRange = SCRIPT_RANGES[targetScript];

  if (!srcRange || !tgtRange) return text;

  const offset = tgtRange.base - srcRange.base;

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Check if character is within the source script's Unicode block (128 codepoints per block)
    if (code >= srcRange.base && code < srcRange.base + 0x80) {
      result += String.fromCharCode(code + offset);
    } else {
      result += text[i];
    }
  }

  return result;
}
