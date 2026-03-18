import { NextRequest, NextResponse } from 'next/server';
import { IndicScript } from '@/types';
import { transliterate, getSuggestions } from '@/utils/transliteration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetScript } = body;

    if (!text || !targetScript) {
      return NextResponse.json(
        { error: 'Missing required fields: text, targetScript' },
        { status: 400 }
      );
    }

    const validScripts: IndicScript[] = ['Devanagari', 'Tamil', 'Telugu', 'Kannada'];
    if (!validScripts.includes(targetScript)) {
      return NextResponse.json(
        { error: `Supported scripts: ${validScripts.join(', ')}` },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const output = transliterate(text, targetScript);
    const suggestions = getSuggestions(text.split(' ').pop() || '', targetScript);

    return NextResponse.json({
      input: text,
      output,
      targetScript,
      suggestions,
      latencyMs: Date.now() - startTime,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
