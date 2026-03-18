'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { MOCK_BENCHMARKS } from '@/utils/mock-data';
import { LANGUAGES } from '@/lib/languages';
import { IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';

const TASKS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'translation', label: 'Translation' },
  { value: 'sentiment', label: 'Sentiment Analysis' },
  { value: 'ner', label: 'Named Entity Recognition' },
  { value: 'qa', label: 'Question Answering' },
  { value: 'summarization', label: 'Summarization' },
  { value: 'generation', label: 'Text Generation' },
];

const TASK_COLORS: Record<string, string> = {
  translation: 'bg-blue-500',
  sentiment: 'bg-green-500',
  ner: 'bg-purple-500',
  qa: 'bg-orange-500',
  summarization: 'bg-pink-500',
  generation: 'bg-teal-500',
};

export default function BenchmarkPage() {
  const [selectedTask, setSelectedTask] = useState('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');

  const filteredBenchmarks = useMemo(() => {
    return MOCK_BENCHMARKS.filter((b) => {
      if (selectedTask !== 'all' && b.task !== selectedTask) return false;
      if (selectedLang !== 'all' && b.language !== selectedLang) return false;
      return true;
    });
  }, [selectedTask, selectedLang]);

  // Aggregate scores by language
  const languageScores = useMemo(() => {
    const scores: Record<string, { total: number; count: number }> = {};
    MOCK_BENCHMARKS.forEach((b) => {
      if (!scores[b.language]) scores[b.language] = { total: 0, count: 0 };
      scores[b.language].total += b.score;
      scores[b.language].count += 1;
    });
    return Object.entries(scores)
      .map(([lang, data]) => ({
        language: lang as IndicLanguage,
        avgScore: data.total / data.count,
        count: data.count,
      }))
      .sort((a, b) => b.avgScore - a.avgScore);
  }, []);

  // Aggregate scores by task
  const taskScores = useMemo(() => {
    const scores: Record<string, { total: number; count: number }> = {};
    MOCK_BENCHMARKS.forEach((b) => {
      if (!scores[b.task]) scores[b.task] = { total: 0, count: 0 };
      scores[b.task].total += b.score;
      scores[b.task].count += 1;
    });
    return Object.entries(scores)
      .map(([task, data]) => ({
        task,
        avgScore: data.total / data.count,
        count: data.count,
      }))
      .sort((a, b) => b.avgScore - a.avgScore);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Indic NLP Evaluation Benchmarks</h1>
        <p className="text-gray-500">
          Performance metrics for BharatLM models across NLP tasks and Indian languages.
          Compare translation quality, sentiment analysis, NER, QA, and more.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-indigo-50 to-white">
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Average Score</p>
            <p className="text-3xl font-bold text-indigo-700">
              {(MOCK_BENCHMARKS.reduce((s, b) => s + b.score, 0) / MOCK_BENCHMARKS.length * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Across all languages & tasks</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-saffron-50 to-white">
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Languages Evaluated</p>
            <p className="text-3xl font-bold text-saffron-700">
              {new Set(MOCK_BENCHMARKS.map(b => b.language)).size}
            </p>
            <p className="text-xs text-gray-400 mt-1">Indian languages benchmarked</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white">
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">NLP Tasks</p>
            <p className="text-3xl font-bold text-emerald-700">
              {new Set(MOCK_BENCHMARKS.map(b => b.task)).size}
            </p>
            <p className="text-xs text-gray-400 mt-1">Evaluation categories</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'by-language', label: 'By Language' },
          { id: 'by-task', label: 'By Task' },
          { id: 'detailed', label: 'Detailed Results' },
        ]}
      >
        {(tab) => {
          if (tab === 'overview') {
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Language scores chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Average Score by Language</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {languageScores.map((item) => {
                        const lang = LANGUAGES[item.language];
                        return (
                          <div key={item.language} className="flex items-center gap-3">
                            <span className={cn('w-16 text-sm font-medium', lang?.fontFamily)}>
                              {lang?.nativeName || item.language}
                            </span>
                            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${item.avgScore * 100}%` }}
                              />
                            </div>
                            <span className="w-14 text-sm font-semibold text-right">
                              {(item.avgScore * 100).toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Task scores chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Average Score by Task</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {taskScores.map((item) => (
                        <div key={item.task} className="flex items-center gap-3">
                          <span className="w-28 text-sm font-medium capitalize">{item.task}</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={cn('h-full rounded-full transition-all duration-500', TASK_COLORS[item.task] || 'bg-gray-500')}
                              style={{ width: `${item.avgScore * 100}%` }}
                            />
                          </div>
                          <span className="w-14 text-sm font-semibold text-right">
                            {(item.avgScore * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          if (tab === 'by-language') {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languageScores.map((item) => {
                  const lang = LANGUAGES[item.language];
                  const langBenchmarks = MOCK_BENCHMARKS.filter(b => b.language === item.language);
                  return (
                    <Card key={item.language}>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className={cn('font-semibold', lang?.fontFamily)}>
                              {lang?.nativeName}
                            </h3>
                            <p className="text-xs text-gray-500">{lang?.name}</p>
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">
                            {(item.avgScore * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          {langBenchmarks.map((b) => (
                            <div key={b.task} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 capitalize">{b.task}</span>
                              <Badge variant={b.score > 0.85 ? 'green' : b.score > 0.75 ? 'yellow' : 'red'}>
                                {(b.score * 100).toFixed(1)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          }

          if (tab === 'by-task') {
            return (
              <div className="space-y-6">
                {taskScores.map((item) => {
                  const taskBenchmarks = MOCK_BENCHMARKS.filter(b => b.task === item.task);
                  return (
                    <Card key={item.task}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={cn('w-3 h-3 rounded-full', TASK_COLORS[item.task])} />
                          <CardTitle className="capitalize">{item.task}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                          {taskBenchmarks.map((b) => {
                            const lang = LANGUAGES[b.language];
                            return (
                              <div key={b.language} className="text-center p-3 rounded-lg bg-gray-50">
                                <p className={cn('text-sm font-medium', lang?.fontFamily)}>
                                  {lang?.nativeName}
                                </p>
                                <p className="text-lg font-bold text-indigo-600 mt-1">
                                  {(b.score * 100).toFixed(1)}%
                                </p>
                                {b.bleu && <p className="text-xs text-gray-400">BLEU: {b.bleu}</p>}
                                {b.f1 && <p className="text-xs text-gray-400">F1: {b.f1}</p>}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          }

          // Detailed results table
          return (
            <Card>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Select
                    label="Filter by Task"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    options={TASKS}
                    className="w-48"
                  />
                  <Select
                    label="Filter by Language"
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    options={[
                      { value: 'all', label: 'All Languages' },
                      ...Object.values(LANGUAGES).map((l) => ({
                        value: l.code,
                        label: `${l.nativeName} (${l.name})`,
                      })),
                    ]}
                    className="w-48"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-3 font-medium text-gray-600">Language</th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">Task</th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">Model</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">Score</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">BLEU</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">F1</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBenchmarks.map((b, i) => {
                        const lang = LANGUAGES[b.language];
                        return (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className={cn('py-2.5 px-3', lang?.fontFamily)}>
                              {lang?.nativeName} <span className="text-gray-400 text-xs">({lang?.name})</span>
                            </td>
                            <td className="py-2.5 px-3 capitalize">{b.task}</td>
                            <td className="py-2.5 px-3 font-mono text-xs">{b.model}</td>
                            <td className="py-2.5 px-3 text-right font-semibold">
                              <Badge variant={b.score > 0.85 ? 'green' : b.score > 0.75 ? 'yellow' : 'red'}>
                                {(b.score * 100).toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="py-2.5 px-3 text-right text-gray-600">{b.bleu?.toFixed(1) || '-'}</td>
                            <td className="py-2.5 px-3 text-right text-gray-600">{b.f1?.toFixed(1) || '-'}</td>
                            <td className="py-2.5 px-3 text-right text-gray-600">{b.accuracy?.toFixed(1) || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        }}
      </Tabs>
    </div>
  );
}
