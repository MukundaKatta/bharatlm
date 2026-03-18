import { NextRequest, NextResponse } from 'next/server';
import { EDUCATION_TOPICS } from '@/utils/mock-data';

export async function GET() {
  return NextResponse.json({
    topics: EDUCATION_TOPICS,
    grades: Array.from({ length: 8 }, (_, i) => ({
      value: String(i + 5),
      label: `Class ${i + 5}`,
    })),
    supportedLanguages: ['hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'en'],
  });
}
