'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { ChatInterface } from '@/components/shared/ChatInterface';
import { EDUCATION_TOPICS } from '@/utils/mock-data';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllLanguages } from '@/lib/languages';
import { IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';

const GRADES = [
  { value: '5', label: 'Class 5' },
  { value: '6', label: 'Class 6' },
  { value: '7', label: 'Class 7' },
  { value: '8', label: 'Class 8' },
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' },
  { value: '11', label: 'Class 11 (Science)' },
  { value: '12', label: 'Class 12 (Science)' },
];

const SUBJECT_ICONS: Record<string, string> = {
  math: '🔢',
  science: '🔬',
  history: '📜',
  geography: '🌍',
  language: '📝',
};

export default function EducationPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('8');
  const { currentLanguage, switchLanguage } = useLanguage();
  const languages = getAllLanguages();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Education Tutor</h1>
        <p className="text-gray-500">
          Learn subjects in your regional language with AI-powered tutoring.
          Select a subject and grade level to get started.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select
          label="Language"
          value={currentLanguage}
          onChange={(e) => switchLanguage(e.target.value as IndicLanguage)}
          options={languages.map((l) => ({
            value: l.code,
            label: `${l.nativeName} (${l.name})`,
          }))}
          className="w-56"
        />
        <Select
          label="Grade Level"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          options={GRADES}
          className="w-48"
        />
      </div>

      {!selectedSubject ? (
        /* Subject selection grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(EDUCATION_TOPICS).map(([key, topic]) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key)}
              className="text-left"
            >
              <Card hover className="h-full group cursor-pointer">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{SUBJECT_ICONS[key] || '📚'}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-devanagari">{topic.titleHi}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {topic.subjects.map((sub) => (
                          <Badge key={sub} variant="default" className="text-[10px]">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        /* Tutor chat */
        <div>
          <button
            onClick={() => setSelectedSubject(null)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to subjects
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{SUBJECT_ICONS[selectedSubject]}</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {EDUCATION_TOPICS[selectedSubject]?.title} — Class {selectedGrade}
              </h2>
              <p className="text-sm text-gray-500 font-devanagari">
                {EDUCATION_TOPICS[selectedSubject]?.titleHi}
              </p>
            </div>
          </div>

          <div className="h-[500px] rounded-xl border border-gray-200 overflow-hidden">
            <ChatInterface
              domain="education"
              title={`${EDUCATION_TOPICS[selectedSubject]?.title} Tutor`}
              placeholder={`Ask a question about ${EDUCATION_TOPICS[selectedSubject]?.title}...`}
              systemPrompt={`You are an education tutor specializing in ${EDUCATION_TOPICS[selectedSubject]?.title} for Class ${selectedGrade} students in India. Explain concepts clearly in the student's language. Use examples relevant to Indian curriculum (NCERT/CBSE). Be patient and encouraging.`}
            />
          </div>

          {/* Quick topic buttons */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick topics:</p>
            <div className="flex flex-wrap gap-2">
              {EDUCATION_TOPICS[selectedSubject]?.subjects.map((sub) => (
                <Badge key={sub} variant="indigo" className="cursor-pointer hover:bg-indigo-200 transition-colors">
                  {sub}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
