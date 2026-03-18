'use client';

import { useCallback } from 'react';
import { useStore } from './useStore';
import { LANGUAGES, getFontClass, getTextDirection } from '@/lib/languages';
import { IndicLanguage } from '@/types';

export function useLanguage() {
  const { currentLanguage, setLanguage } = useStore();

  const languageInfo = LANGUAGES[currentLanguage];
  const fontClass = getFontClass(currentLanguage);
  const direction = getTextDirection(currentLanguage);

  const switchLanguage = useCallback(
    (lang: IndicLanguage) => {
      setLanguage(lang);
      // Update document direction for RTL languages
      if (typeof document !== 'undefined') {
        document.documentElement.dir = LANGUAGES[lang].direction;
        document.documentElement.lang = lang;
      }
    },
    [setLanguage]
  );

  return {
    currentLanguage,
    languageInfo,
    fontClass,
    direction,
    switchLanguage,
    allLanguages: LANGUAGES,
  };
}
