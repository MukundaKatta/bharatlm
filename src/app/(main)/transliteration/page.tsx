'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { transliterate, getSuggestions } from '@/utils/transliteration';
import { IndicScript } from '@/types';
import { cn } from '@/utils/cn';

const TARGET_SCRIPTS: { value: IndicScript; label: string }[] = [
  { value: 'Devanagari', label: 'Devanagari (Hindi, Marathi, Sanskrit)' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
];

const EXAMPLES = [
  { input: 'namaste', description: 'Common greeting' },
  { input: 'bharat', description: 'India' },
  { input: 'kha na kha ya', description: 'Food related' },
  { input: 'ga nga cha ja', description: 'Consonant sequence' },
  { input: 'sha sha2 sa ha', description: 'Sibilants' },
];

const scriptToFont: Record<string, string> = {
  Devanagari: 'font-devanagari',
  Tamil: 'font-tamil',
  Telugu: 'font-telugu',
  Kannada: 'font-kannada',
};

export default function TransliterationPage() {
  const [input, setInput] = useState('');
  const [targetScript, setTargetScript] = useState<IndicScript>('Devanagari');
  const [output, setOutput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (input.trim()) {
      const result = transliterate(input, targetScript);
      setOutput(result);

      // Get suggestions for the last word
      const words = input.split(' ');
      const lastWord = words[words.length - 1];
      if (lastWord) {
        setSuggestions(getSuggestions(lastWord, targetScript));
      }
    } else {
      setOutput('');
      setSuggestions([]);
    }
  }, [input, targetScript]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transliteration Engine</h1>
        <p className="text-gray-500">
          Type in English and auto-convert to any Indic script in real-time.
          Uses phonetic mapping for accurate character conversion.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent>
          {/* Target script selector */}
          <div className="mb-4">
            <Select
              label="Target Script"
              value={targetScript}
              onChange={(e) => setTargetScript(e.target.value as IndicScript)}
              options={TARGET_SCRIPTS}
            />
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Type in English (phonetic)
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., namaste, bharat, ka kha ga..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
              autoFocus
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1.5">Suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s, i) => (
                  <Badge key={i} variant="indigo">
                    <span className={scriptToFont[targetScript]}>{s}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Output ({targetScript})
            </label>
            <div
              className={cn(
                'w-full rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-indigo-50/30',
                'px-4 py-4 min-h-[80px] text-indic-xl',
                scriptToFont[targetScript]
              )}
            >
              {output || <span className="text-gray-400 text-base">Output will appear here...</span>}
            </div>
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-8 right-2 rounded-lg bg-white border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Try these examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {EXAMPLES.map((example) => (
          <button
            key={example.input}
            onClick={() => setInput(example.input)}
            className="text-left"
          >
            <Card hover className="py-4">
              <CardContent className="flex items-center justify-between">
                <div>
                  <code className="text-sm text-indigo-600 font-mono">{example.input}</code>
                  <p className="text-xs text-gray-500 mt-0.5">{example.description}</p>
                </div>
                <div className={cn('text-lg', scriptToFont[targetScript])}>
                  {transliterate(example.input, targetScript)}
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* Cross-script comparison */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Cross-Script Comparison</h2>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">English</th>
                    {TARGET_SCRIPTS.map((s) => (
                      <th key={s.value} className="text-left py-2 px-3 font-medium text-gray-600">
                        {s.value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['ka kha ga', 'cha ja', 'ta tha da', 'pa pha ba ma', 'ya ra la va'].map((word) => (
                    <tr key={word} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-xs text-gray-600">{word}</td>
                      {TARGET_SCRIPTS.map((s) => (
                        <td key={s.value} className={cn('py-2 px-3 text-indic-base', scriptToFont[s.value])}>
                          {transliterate(word, s.value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
