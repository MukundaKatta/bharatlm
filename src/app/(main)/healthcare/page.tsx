'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChatInterface } from '@/components/shared/ChatInterface';
import { HEALTH_TOPICS } from '@/utils/mock-data';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/utils/cn';

export default function HealthcarePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Information Assistant</h1>
        <p className="text-gray-500">
          Reliable health information in your local language. Select a topic to get started.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Medical Disclaimer</p>
            <p className="text-sm text-amber-700 mt-0.5">
              This is for informational purposes only and does not constitute medical advice.
              Always consult a qualified healthcare professional for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HEALTH_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className="text-left"
            >
              <Card hover className="h-full group cursor-pointer">
                <CardContent className="text-center py-6">
                  <div className="text-4xl mb-3">{topic.icon}</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-devanagari">{topic.nameHi}</p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to topics
          </button>

          {(() => {
            const topic = HEALTH_TOPICS.find((t) => t.id === selectedTopic);
            return (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{topic?.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{topic?.name}</h2>
                    <p className="text-sm text-gray-500 font-devanagari">{topic?.nameHi}</p>
                  </div>
                </div>

                <div className="h-[500px] rounded-xl border border-gray-200 overflow-hidden">
                  <ChatInterface
                    domain="healthcare"
                    title={`${topic?.name} Assistant`}
                    placeholder={`Ask about ${topic?.name?.toLowerCase()}...`}
                    systemPrompt={`You are a healthcare information assistant specializing in ${topic?.name}. Provide accurate, easy-to-understand health information in the user's language. Always recommend consulting a doctor for specific medical conditions. Focus on preventive care, government health schemes, and general wellness advice relevant to India.`}
                  />
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Emergency numbers */}
      {!selectedTopic && (
        <Card className="mt-8 bg-red-50 border-red-100">
          <CardContent>
            <h3 className="font-semibold text-red-800 mb-3">Emergency Helpline Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Emergency', number: '112' },
                { name: 'Ambulance', number: '108' },
                { name: 'Health Helpline', number: '104' },
                { name: 'Women Helpline', number: '181' },
              ].map((item) => (
                <div key={item.name} className="text-center p-3 rounded-lg bg-white/80">
                  <p className="text-xs text-red-600 font-medium">{item.name}</p>
                  <p className="text-xl font-bold text-red-800">{item.number}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
