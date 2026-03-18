'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllLanguages, getFontClass } from '@/lib/languages';
import { getMockTranslation } from '@/utils/mock-data';
import { IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';

const DOMAINS = [
  { value: 'general', label: 'General' },
  { value: 'legal', label: 'Legal / Judicial' },
  { value: 'medical', label: 'Medical / Health' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'educational', label: 'Educational' },
];

const SAMPLE_DOCUMENTS: Record<string, { title: string; text: string; domain: string }> = {
  legal: {
    title: 'Legal Notice',
    domain: 'legal',
    text: `NOTICE: This is to inform all concerned parties that the undersigned has filed a petition under Section 138 of the Negotiable Instruments Act, 1881 in the Court of Metropolitan Magistrate. The respondent is hereby directed to appear before the said court on the date mentioned herein. Failure to comply shall result in ex-parte proceedings.`,
  },
  medical: {
    title: 'Patient Advisory',
    domain: 'medical',
    text: `PATIENT ADVISORY: Ensure adequate hydration by drinking 8-10 glasses of water daily. Take prescribed medications after meals. Follow-up appointment is scheduled after 2 weeks. Report any symptoms of fever, breathlessness, or chest pain immediately to the nearest healthcare facility.`,
  },
  agricultural: {
    title: 'Kisan Advisory',
    domain: 'agricultural',
    text: `AGRICULTURAL ADVISORY: Wheat sowing window is optimal from November 1-25. Use HD-3226 variety with seed rate of 100 kg/ha. Apply 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potash per hectare. First irrigation should be given 21 days after sowing at crown root initiation stage.`,
  },
};

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<IndicLanguage>('en');
  const [targetLang, setTargetLang] = useState<IndicLanguage>('hi');
  const [domain, setDomain] = useState('general');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const languages = getAllLanguages();
  const targetFontClass = getFontClass(targetLang);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setProgress(0);
    setTranslatedText('');

    // Simulate translation progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 20;
      });
    }, 200);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          domain,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translatedText);
      } else {
        setTranslatedText(getMockTranslation(sourceText, targetLang));
      }
    } catch {
      setTranslatedText(getMockTranslation(sourceText, targetLang));
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const loadSample = (key: string) => {
    const sample = SAMPLE_DOCUMENTS[key];
    if (sample) {
      setSourceText(sample.text);
      setDomain(sample.domain);
      setSourceLang('en');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Translation Workbench</h1>
        <p className="text-gray-500">
          Translate government, legal, medical, and official documents across Indian languages
          with domain-specific accuracy.
        </p>
      </div>

      {/* Sample documents */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Load sample document:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SAMPLE_DOCUMENTS).map(([key, doc]) => (
            <button
              key={key}
              onClick={() => loadSample(key)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
            >
              <Badge variant={key === 'legal' ? 'indigo' : key === 'medical' ? 'red' : 'green'} className="text-[10px]">
                {doc.domain}
              </Badge>
              {doc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Source Language"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value as IndicLanguage)}
          options={languages.map((l) => ({
            value: l.code,
            label: `${l.nativeName} (${l.name})`,
          }))}
        />
        <Select
          label="Target Language"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value as IndicLanguage)}
          options={languages.map((l) => ({
            value: l.code,
            label: `${l.nativeName} (${l.name})`,
          }))}
        />
        <Select
          label="Document Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          options={DOMAINS}
        />
      </div>

      {/* Translation area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Source Document</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste or type the document text here..."
              rows={16}
              indicFont={getFontClass(sourceLang)}
              className={sourceLang === 'ur' ? 'text-right' : ''}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {sourceText.length} characters | ~{Math.ceil(sourceText.split(/\s+/).filter(Boolean).length)} words
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Translated Document</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="mb-3">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Translating... {Math.round(progress)}%</p>
              </div>
            )}
            <div
              className={cn(
                'min-h-[380px] rounded-xl border border-gray-200 bg-gray-50 p-4',
                'text-indic-base leading-relaxed',
                targetFontClass
              )}
              dir={targetLang === 'ur' ? 'rtl' : 'ltr'}
            >
              {translatedText || (
                <span className="text-gray-400 text-sm">
                  Translated text will appear here...
                </span>
              )}
            </div>
            {translatedText && (
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(translatedText)}
                >
                  Copy
                </Button>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Translate button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleTranslate}
          variant="saffron"
          size="lg"
          loading={loading}
          disabled={!sourceText.trim()}
          className="px-12"
        >
          Translate Document
        </Button>
      </div>
    </div>
  );
}
