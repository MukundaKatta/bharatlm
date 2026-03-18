import { NextRequest, NextResponse } from 'next/server';
import { MOCK_BENCHMARKS } from '@/utils/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');
  const task = searchParams.get('task');

  let results = MOCK_BENCHMARKS;

  if (language) {
    results = results.filter((b) => b.language === language);
  }

  if (task) {
    results = results.filter((b) => b.task === task);
  }

  return NextResponse.json({
    results,
    count: results.length,
    filters: { language, task },
  });
}
