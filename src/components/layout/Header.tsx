'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/utils/cn';

export function Header() {
  const { toggleSidebar } = useStore();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Tricolor accent bar */}
        <div className="hidden sm:flex items-center gap-0.5">
          <div className="w-6 h-1 rounded-full bg-bharat-saffron" />
          <div className="w-6 h-1 rounded-full bg-white border border-gray-200" />
          <div className="w-6 h-1 rounded-full bg-bharat-green" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
