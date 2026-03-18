'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getIndicLanguages } from '@/lib/languages';
import { cn } from '@/utils/cn';

const FEATURES = [
  {
    title: 'Indic Language Chat',
    description: 'Conversational AI in 13+ Indian languages with native script support',
    href: '/chat',
    color: 'from-indigo-500 to-purple-600',
    icon: '💬',
  },
  {
    title: 'Script Converter',
    description: 'Convert between Devanagari, Tamil, Telugu, Kannada, and more',
    href: '/converter',
    color: 'from-bharat-saffron to-orange-600',
    icon: '🔄',
  },
  {
    title: 'Transliteration Engine',
    description: 'Type in English, auto-convert to any Indic script in real-time',
    href: '/transliteration',
    color: 'from-emerald-500 to-teal-600',
    icon: '⌨️',
  },
  {
    title: 'Voice Assistant',
    description: 'Speech-to-text and text-to-speech for all supported languages',
    href: '/voice',
    color: 'from-blue-500 to-cyan-600',
    icon: '🎤',
  },
  {
    title: 'Document Translation',
    description: 'Translate government, legal, and official documents accurately',
    href: '/translation',
    color: 'from-violet-500 to-purple-600',
    icon: '📄',
  },
  {
    title: 'NLP Benchmarks',
    description: 'Evaluation metrics for Indic language models across NLP tasks',
    href: '/benchmark',
    color: 'from-rose-500 to-pink-600',
    icon: '📊',
  },
  {
    title: 'Agricultural Advisory',
    description: 'Weather, crop advice, and market prices for Indian farmers',
    href: '/advisory',
    color: 'from-green-500 to-lime-600',
    icon: '🌾',
  },
  {
    title: 'Education Tutor',
    description: 'Learn subjects in your regional language with AI tutoring',
    href: '/education',
    color: 'from-amber-500 to-yellow-600',
    icon: '📚',
  },
  {
    title: 'Healthcare Info',
    description: 'Reliable health information accessible in local languages',
    href: '/healthcare',
    color: 'from-red-500 to-rose-600',
    icon: '🏥',
  },
  {
    title: 'API & Usage',
    description: 'Per-language routing, usage tracking, and developer documentation',
    href: '/api-docs',
    color: 'from-gray-600 to-slate-700',
    icon: '🔧',
  },
];

export default function HomePage() {
  const indicLanguages = getIndicLanguages();

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl font-devanagari animate-float">अ</div>
          <div className="absolute top-20 right-20 text-5xl font-tamil animate-float" style={{ animationDelay: '1s' }}>த</div>
          <div className="absolute bottom-20 left-1/4 text-5xl font-telugu animate-float" style={{ animationDelay: '2s' }}>తె</div>
          <div className="absolute bottom-10 right-1/3 text-5xl font-kannada animate-float" style={{ animationDelay: '3s' }}>ಕ</div>
          <div className="absolute top-1/3 right-10 text-5xl font-bengali animate-float" style={{ animationDelay: '1.5s' }}>ব</div>
          <div className="absolute bottom-1/3 left-10 text-5xl font-malayalam animate-float" style={{ animationDelay: '2.5s' }}>മ</div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
          {/* Tricolor bar */}
          <div className="flex gap-1 mb-8">
            <div className="h-1.5 w-16 rounded-full bg-bharat-saffron" />
            <div className="h-1.5 w-16 rounded-full bg-white/80" />
            <div className="h-1.5 w-16 rounded-full bg-bharat-green" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Bharat<span className="text-bharat-saffron">LM</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mb-6 leading-relaxed">
            Multilingual Indian Language AI Platform — empowering communication across
            <span className="text-white font-semibold"> 13+ Indic languages</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {indicLanguages.map((lang) => (
              <span
                key={lang.code}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm',
                  'px-3 py-1 text-sm border border-white/20',
                  lang.fontFamily
                )}
              >
                <span className="font-medium">{lang.nativeName}</span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-xl bg-bharat-saffron px-6 py-3 font-semibold text-white shadow-lg hover:bg-saffron-600 transition-colors"
            >
              Start Chatting
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              API Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Features</h2>
        <p className="text-gray-500 mb-8">Comprehensive AI tools designed for Indian languages</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card hover className="h-full group cursor-pointer">
                <CardContent>
                  <div className={cn(
                    'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4',
                    'shadow-sm group-hover:scale-105 transition-transform',
                    feature.color
                  )}>
                    <span>{feature.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Language Stats */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-600">13+</div>
            <div className="text-sm text-gray-500 mt-1">Indian Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-bharat-saffron">10</div>
            <div className="text-sm text-gray-500 mt-1">Script Systems</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-bharat-green">6</div>
            <div className="text-sm text-gray-500 mt-1">NLP Tasks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">10</div>
            <div className="text-sm text-gray-500 mt-1">Platform Tools</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-4 h-1 rounded-full bg-bharat-saffron" />
              <div className="w-4 h-1 rounded-full bg-gray-300" />
              <div className="w-4 h-1 rounded-full bg-bharat-green" />
            </div>
            <span className="text-sm text-gray-500">BharatLM — Made for India</span>
          </div>
          <div className="text-sm text-gray-400">
            Empowering 1.4 billion people with AI in their own language
          </div>
        </div>
      </footer>
    </div>
  );
}
