'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { MOCK_API_USAGE } from '@/utils/mock-data';
import { LANGUAGES } from '@/lib/languages';
import { cn } from '@/utils/cn';

const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/chat',
    description: 'Send a chat message and receive an AI response in the specified Indic language.',
    params: [
      { name: 'message', type: 'string', required: true, description: 'The user message' },
      { name: 'language', type: 'IndicLanguage', required: true, description: 'Target language code (hi, ta, te, etc.)' },
      { name: 'domain', type: 'string', required: false, description: 'Domain: general, agriculture, education, healthcare' },
      { name: 'history', type: 'ChatMessage[]', required: false, description: 'Previous messages for context' },
    ],
  },
  {
    method: 'POST',
    path: '/api/translate',
    description: 'Translate text between Indian languages with domain-specific accuracy.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text to translate' },
      { name: 'sourceLanguage', type: 'IndicLanguage', required: true, description: 'Source language code' },
      { name: 'targetLanguage', type: 'IndicLanguage', required: true, description: 'Target language code' },
      { name: 'domain', type: 'string', required: false, description: 'Domain: general, legal, medical, agricultural, educational' },
    ],
  },
  {
    method: 'POST',
    path: '/api/transliterate',
    description: 'Convert English text to Indic script using phonetic mapping.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'English text to transliterate' },
      { name: 'targetScript', type: 'IndicScript', required: true, description: 'Target script (Devanagari, Tamil, Telugu, Kannada)' },
    ],
  },
  {
    method: 'POST',
    path: '/api/tts',
    description: 'Convert text to speech audio for any supported Indian language.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text to convert to speech' },
      { name: 'language', type: 'IndicLanguage', required: true, description: 'Language code' },
      { name: 'speed', type: 'number', required: false, description: 'Speech rate (0.5-2.0, default 1.0)' },
      { name: 'pitch', type: 'number', required: false, description: 'Voice pitch (0.5-2.0, default 1.0)' },
    ],
  },
  {
    method: 'POST',
    path: '/api/stt',
    description: 'Convert speech audio to text in the specified Indian language.',
    params: [
      { name: 'audio', type: 'File', required: true, description: 'Audio file (WAV, MP3, OGG)' },
      { name: 'language', type: 'IndicLanguage', required: true, description: 'Expected language code' },
    ],
  },
  {
    method: 'GET',
    path: '/api/benchmark',
    description: 'Retrieve NLP benchmark results for Indian language models.',
    params: [
      { name: 'language', type: 'IndicLanguage', required: false, description: 'Filter by language' },
      { name: 'task', type: 'string', required: false, description: 'Filter by NLP task' },
    ],
  },
  {
    method: 'GET',
    path: '/api/usage',
    description: 'Get API usage statistics and per-language routing metrics.',
    params: [
      { name: 'from', type: 'string', required: false, description: 'Start date (ISO format)' },
      { name: 'to', type: 'string', required: false, description: 'End date (ISO format)' },
    ],
  },
];

export default function ApiDocsPage() {
  const [apiKey] = useState('blm_sk_demo_' + Math.random().toString(36).substring(2, 15));
  const [copiedKey, setCopiedKey] = useState(false);

  const usageByEndpoint = useMemo(() => {
    const map: Record<string, { count: number; totalTokens: number; avgLatency: number; errors: number }> = {};
    MOCK_API_USAGE.forEach((u) => {
      if (!map[u.endpoint]) map[u.endpoint] = { count: 0, totalTokens: 0, avgLatency: 0, errors: 0 };
      map[u.endpoint].count++;
      map[u.endpoint].totalTokens += u.tokens;
      map[u.endpoint].avgLatency += u.latencyMs;
      if (u.status === 'error') map[u.endpoint].errors++;
    });
    Object.values(map).forEach((v) => { v.avgLatency = Math.round(v.avgLatency / v.count); });
    return map;
  }, []);

  const usageByLanguage = useMemo(() => {
    const map: Record<string, number> = {};
    MOCK_API_USAGE.forEach((u) => {
      map[u.language] = (map[u.language] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);

  const totalRequests = MOCK_API_USAGE.length;
  const totalTokens = MOCK_API_USAGE.reduce((s, u) => s + u.tokens, 0);
  const avgLatency = Math.round(MOCK_API_USAGE.reduce((s, u) => s + u.latencyMs, 0) / totalRequests);
  const errorRate = ((MOCK_API_USAGE.filter(u => u.status === 'error').length / totalRequests) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API & Usage Dashboard</h1>
        <p className="text-gray-500">
          Monitor API usage, per-language routing, and performance metrics.
          Integrate BharatLM capabilities into your applications.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'usage', label: 'Usage Dashboard' },
          { id: 'docs', label: 'API Documentation' },
          { id: 'keys', label: 'API Keys' },
        ]}
      >
        {(tab) => {
          if (tab === 'usage') {
            return (
              <div className="space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="text-center py-4">
                      <p className="text-2xl font-bold text-indigo-600">{totalRequests}</p>
                      <p className="text-xs text-gray-500">Total Requests</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="text-center py-4">
                      <p className="text-2xl font-bold text-bharat-saffron">{totalTokens.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Tokens</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="text-center py-4">
                      <p className="text-2xl font-bold text-emerald-600">{avgLatency}ms</p>
                      <p className="text-xs text-gray-500">Avg Latency</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="text-center py-4">
                      <p className="text-2xl font-bold text-red-600">{errorRate}%</p>
                      <p className="text-xs text-gray-500">Error Rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Usage by endpoint */}
                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Endpoint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2.5 px-3 font-medium text-gray-600">Endpoint</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Requests</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Tokens</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Avg Latency</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Errors</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(usageByEndpoint).map(([endpoint, data]) => (
                            <tr key={endpoint} className="border-b border-gray-100">
                              <td className="py-2.5 px-3 font-mono text-xs">{endpoint}</td>
                              <td className="py-2.5 px-3 text-right">{data.count}</td>
                              <td className="py-2.5 px-3 text-right">{data.totalTokens.toLocaleString()}</td>
                              <td className="py-2.5 px-3 text-right">{data.avgLatency}ms</td>
                              <td className="py-2.5 px-3 text-right">
                                <Badge variant={data.errors > 0 ? 'red' : 'green'}>
                                  {data.errors}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage by language */}
                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Language</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {usageByLanguage.map(([lang, count]) => {
                        const langInfo = LANGUAGES[lang as keyof typeof LANGUAGES];
                        const pct = (count / totalRequests) * 100;
                        return (
                          <div key={lang} className="flex items-center gap-3">
                            <span className={cn('w-20 text-sm', langInfo?.fontFamily)}>
                              {langInfo?.nativeName || lang}
                            </span>
                            <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-16 text-sm text-right text-gray-600">
                              {count} ({pct.toFixed(0)}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2.5 px-3 font-medium text-gray-600">Time</th>
                            <th className="text-left py-2.5 px-3 font-medium text-gray-600">Endpoint</th>
                            <th className="text-left py-2.5 px-3 font-medium text-gray-600">Language</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Tokens</th>
                            <th className="text-right py-2.5 px-3 font-medium text-gray-600">Latency</th>
                            <th className="text-center py-2.5 px-3 font-medium text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_API_USAGE.slice(0, 10).map((u) => {
                            const langInfo = LANGUAGES[u.language];
                            return (
                              <tr key={u.id} className="border-b border-gray-100">
                                <td className="py-2 px-3 text-xs text-gray-500">
                                  {new Date(u.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="py-2 px-3 font-mono text-xs">{u.endpoint}</td>
                                <td className={cn('py-2 px-3 text-xs', langInfo?.fontFamily)}>
                                  {langInfo?.nativeName}
                                </td>
                                <td className="py-2 px-3 text-right text-xs">{u.tokens}</td>
                                <td className="py-2 px-3 text-right text-xs">{u.latencyMs}ms</td>
                                <td className="py-2 px-3 text-center">
                                  <Badge variant={u.status === 'success' ? 'green' : 'red'}>
                                    {u.status}
                                  </Badge>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          if (tab === 'docs') {
            return (
              <div className="space-y-6">
                <Card className="bg-gray-900 text-gray-100">
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-2">Base URL</p>
                    <code className="text-lg text-green-400">https://api.bharatlm.ai/v1</code>
                    <p className="text-sm text-gray-400 mt-3 mb-1">Authentication</p>
                    <code className="text-sm text-yellow-300">Authorization: Bearer YOUR_API_KEY</code>
                  </CardContent>
                </Card>

                {API_ENDPOINTS.map((endpoint) => (
                  <Card key={endpoint.path}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant={endpoint.method === 'GET' ? 'green' : 'indigo'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono font-semibold">{endpoint.path}</code>
                      </div>
                      <CardDescription className="mt-1">{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-2 font-medium text-gray-600">Parameter</th>
                            <th className="text-left py-2 px-2 font-medium text-gray-600">Type</th>
                            <th className="text-left py-2 px-2 font-medium text-gray-600">Required</th>
                            <th className="text-left py-2 px-2 font-medium text-gray-600">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.params.map((param) => (
                            <tr key={param.name} className="border-b border-gray-100">
                              <td className="py-2 px-2 font-mono text-xs text-indigo-600">{param.name}</td>
                              <td className="py-2 px-2 font-mono text-xs text-gray-500">{param.type}</td>
                              <td className="py-2 px-2">
                                {param.required ? (
                                  <Badge variant="red">required</Badge>
                                ) : (
                                  <Badge variant="default">optional</Badge>
                                )}
                              </td>
                              <td className="py-2 px-2 text-gray-600">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Example */}
                      <div className="mt-4 rounded-lg bg-gray-900 p-4 overflow-x-auto">
                        <pre className="text-xs text-gray-300">
{endpoint.method === 'POST'
  ? `curl -X POST https://api.bharatlm.ai/v1${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(
    Object.fromEntries(
      endpoint.params.filter(p => p.required).map(p => [p.name, `<${p.type}>`])
    ),
    null,
    2
  )}'`
  : `curl https://api.bharatlm.ai/v1${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Language codes reference */}
                <Card>
                  <CardHeader>
                    <CardTitle>Supported Language Codes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {Object.values(LANGUAGES).map((lang) => (
                        <div key={lang.code} className="text-center p-2 rounded-lg bg-gray-50">
                          <code className="text-xs text-indigo-600 font-mono">{lang.code}</code>
                          <p className={cn('text-sm font-medium mt-0.5', lang.fontFamily)}>{lang.nativeName}</p>
                          <p className="text-[10px] text-gray-400">{lang.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          // API Keys tab
          return (
            <div className="max-w-2xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your API Key</CardTitle>
                  <CardDescription>Use this key to authenticate requests to the BharatLM API.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-gray-100 px-4 py-3 text-sm font-mono text-gray-800 border border-gray-200">
                      {apiKey}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                    >
                      {copiedKey ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Keep your API key secret. Do not share it or expose it in client-side code.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Free Tier', requests: '1,000/day', tokens: '100K/day', rate: '10 req/min' },
                      { name: 'Pro Tier', requests: '50,000/day', tokens: '5M/day', rate: '100 req/min' },
                      { name: 'Enterprise', requests: 'Unlimited', tokens: 'Unlimited', rate: 'Custom' },
                    ].map((tier) => (
                      <div key={tier.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">{tier.name}</p>
                          <p className="text-xs text-gray-500">{tier.rate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-700">{tier.requests} requests</p>
                          <p className="text-xs text-gray-500">{tier.tokens} tokens</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
