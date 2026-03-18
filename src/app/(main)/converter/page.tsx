'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SCRIPTS } from '@/lib/languages';
import { convertScript } from '@/utils/transliteration';
import { IndicScript } from '@/types';
import { cn } from '@/utils/cn';

const SCRIPT_OPTIONS = SCRIPTS.filter(s => s !== 'Arabic' && s !== 'Latin').map(s => ({
  value: s,
  label: s,
}));

const SAMPLE_TEXTS: Record<string, { text: string; script: IndicScript }> = {
  devanagari: { text: 'भारत एक विविधताओं से भरा देश है। यहाँ अनेक भाषाएँ बोली जाती हैं।', script: 'Devanagari' },
  bengali: { text: 'ভারত একটি বৈচিত্র্যময় দেশ। এখানে অনেক ভাষা বলা হয়।', script: 'Bengali' },
  tamil: { text: 'இந்தியா ஒரு பன்முகத்தன்மை கொண்ட நாடு.', script: 'Tamil' },
  telugu: { text: 'భారతదేశం వైవిధ్యభరితమైన దేశం. ఇక్కడ అనేక భాషలు మాట్లాడతారు.', script: 'Telugu' },
};

export default function ConverterPage() {
  const [sourceScript, setSourceScript] = useState<IndicScript>('Devanagari');
  const [targetScript, setTargetScript] = useState<IndicScript>('Bengali');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const result = convertScript(input, sourceScript, targetScript);
    setOutput(result);
  };

  const handleSwap = () => {
    setSourceScript(targetScript);
    setTargetScript(sourceScript);
    setInput(output);
    setOutput(input);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = (key: string) => {
    const sample = SAMPLE_TEXTS[key];
    if (sample) {
      setInput(sample.text);
      setSourceScript(sample.script);
    }
  };

  const scriptToFont: Record<string, string> = {
    Devanagari: 'font-devanagari',
    Tamil: 'font-tamil',
    Telugu: 'font-telugu',
    Kannada: 'font-kannada',
    Malayalam: 'font-malayalam',
    Bengali: 'font-bengali',
    Gujarati: 'font-gujarati',
    Gurmukhi: 'font-gurmukhi',
    Odia: 'font-oriya',
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Script Converter</h1>
        <p className="text-gray-500">
          Convert text between Indic scripts using Unicode block mapping.
          Supports Devanagari, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Gurmukhi, and Odia.
        </p>
      </div>

      {/* Sample texts */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Load sample text:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SAMPLE_TEXTS).map(([key, sample]) => (
            <button
              key={key}
              onClick={() => loadSample(key)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
            >
              {sample.script}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
            {/* Source */}
            <div className="space-y-3">
              <Select
                label="Source Script"
                value={sourceScript}
                onChange={(e) => setSourceScript(e.target.value as IndicScript)}
                options={SCRIPT_OPTIONS}
              />
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text in source script..."
                rows={8}
                indicFont={scriptToFont[sourceScript]}
              />
            </div>

            {/* Swap button */}
            <div className="flex md:flex-col items-center justify-center gap-2 py-4">
              <Button variant="outline" size="sm" onClick={handleSwap}>
                <svg className="w-5 h-5 md:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </Button>
              <Button variant="primary" onClick={handleConvert}>
                Convert
              </Button>
            </div>

            {/* Target */}
            <div className="space-y-3">
              <Select
                label="Target Script"
                value={targetScript}
                onChange={(e) => setTargetScript(e.target.value as IndicScript)}
                options={SCRIPT_OPTIONS}
              />
              <div className="relative">
                <TextArea
                  value={output}
                  readOnly
                  placeholder="Converted text will appear here..."
                  rows={8}
                  indicFont={scriptToFont[targetScript]}
                  className="bg-gray-50"
                />
                {output && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-10 right-2 rounded-lg bg-white border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Script info */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {SCRIPTS.filter(s => s !== 'Arabic' && s !== 'Latin').map((script) => (
          <Card key={script} className="text-center py-4 px-3">
            <div className={cn('text-2xl mb-1', scriptToFont[script])}>
              {getScriptSample(script)}
            </div>
            <div className="text-xs font-medium text-gray-600">{script}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getScriptSample(script: IndicScript): string {
  const samples: Record<string, string> = {
    Devanagari: 'क ख ग',
    Bengali: 'ক খ গ',
    Tamil: 'க ச ட',
    Telugu: 'క ఖ గ',
    Kannada: 'ಕ ಖ ಗ',
    Malayalam: 'ക ഖ ഗ',
    Gujarati: 'ક ખ ગ',
    Gurmukhi: 'ਕ ਖ ਗ',
    Odia: 'କ ଖ ଗ',
  };
  return samples[script] || script;
}
