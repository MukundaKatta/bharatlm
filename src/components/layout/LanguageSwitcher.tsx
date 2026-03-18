'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllLanguages } from '@/lib/languages';
import { IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';

export function LanguageSwitcher() {
  const { currentLanguage, languageInfo, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const languages = getAllLanguages();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2',
          'hover:bg-gray-50 transition-colors text-sm font-medium'
        )}
      >
        <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
        <span className={languageInfo.fontFamily}>{languageInfo.nativeName}</span>
        <svg className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2 grid grid-cols-2 gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  switchLanguage(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  currentLanguage === lang.code
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                )}
              >
                <span className="text-base">{getLanguageFlag(lang.code)}</span>
                <div className="min-w-0">
                  <div className={cn('font-medium truncate', lang.fontFamily)}>{lang.nativeName}</div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getLanguageFlag(code: IndicLanguage): string {
  const flags: Partial<Record<IndicLanguage, string>> = {
    hi: 'हि', ta: 'த', te: 'తె', kn: 'ಕ', ml: 'മ',
    bn: 'ব', mr: 'म', gu: 'ગ', pa: 'ਪ', od: 'ଓ',
    as: 'অ', ur: 'ا', sa: 'सं', en: 'En',
  };
  return flags[code] || code.toUpperCase();
}
