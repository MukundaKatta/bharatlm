import { NextRequest, NextResponse } from 'next/server';
import { MOCK_API_USAGE } from '@/utils/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let usage = MOCK_API_USAGE;

  if (from) {
    const fromDate = new Date(from);
    usage = usage.filter((u) => new Date(u.timestamp) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    usage = usage.filter((u) => new Date(u.timestamp) <= toDate);
  }

  // Aggregate stats
  const totalRequests = usage.length;
  const totalTokens = usage.reduce((s, u) => s + u.tokens, 0);
  const avgLatency = totalRequests > 0
    ? Math.round(usage.reduce((s, u) => s + u.latencyMs, 0) / totalRequests)
    : 0;
  const errorCount = usage.filter((u) => u.status === 'error').length;

  // Per-language breakdown
  const byLanguage: Record<string, number> = {};
  usage.forEach((u) => {
    byLanguage[u.language] = (byLanguage[u.language] || 0) + 1;
  });

  // Per-endpoint breakdown
  const byEndpoint: Record<string, number> = {};
  usage.forEach((u) => {
    byEndpoint[u.endpoint] = (byEndpoint[u.endpoint] || 0) + 1;
  });

  return NextResponse.json({
    summary: {
      totalRequests,
      totalTokens,
      avgLatencyMs: avgLatency,
      errorCount,
      errorRate: totalRequests > 0 ? (errorCount / totalRequests * 100).toFixed(2) + '%' : '0%',
    },
    byLanguage,
    byEndpoint,
    recentRequests: usage.slice(0, 20),
  });
}
