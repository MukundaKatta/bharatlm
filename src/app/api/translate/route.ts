import { NextRequest, NextResponse } from 'next/server';
import { IndicLanguage } from '@/types';
import { LANGUAGES } from '@/lib/languages';
import { getMockTranslation } from '@/utils/mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, sourceLanguage, targetLanguage, domain } = body;

    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLanguage, targetLanguage' },
        { status: 400 }
      );
    }

    if (!LANGUAGES[sourceLanguage as IndicLanguage] || !LANGUAGES[targetLanguage as IndicLanguage]) {
      return NextResponse.json(
        { error: 'Unsupported language code' },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    // Try external API
    const apiKey = process.env.OPENAI_API_KEY || process.env.BHARAT_LM_API_KEY;

    if (apiKey && process.env.BHARAT_LM_API_URL) {
      try {
        const sourceLang = LANGUAGES[sourceLanguage as IndicLanguage];
        const targetLang = LANGUAGES[targetLanguage as IndicLanguage];

        const prompt =
          `Translate the following text from ${sourceLang.name} to ${targetLang.name} (${targetLang.nativeName}).` +
          (domain ? ` This is a ${domain} document, use appropriate terminology.` : '') +
          `\n\nText:\n${text}\n\nTranslation:`;

        const response = await fetch(process.env.BHARAT_LM_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: 'You are an expert translator for Indian languages.' },
              { role: 'user', content: prompt },
            ],
            temperature: 0.3,
            max_tokens: 2048,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const translatedText = data.choices?.[0]?.message?.content || '';
          return NextResponse.json({
            translatedText,
            sourceLanguage,
            targetLanguage,
            domain,
            confidence: 0.85,
            latencyMs: Date.now() - startTime,
          });
        }
      } catch {
        // Fall through to mock
      }
    }

    // Fallback
    const translatedText = getMockTranslation(text, targetLanguage as IndicLanguage);
    return NextResponse.json({
      translatedText,
      sourceLanguage,
      targetLanguage,
      domain,
      confidence: 0.7,
      latencyMs: Date.now() - startTime,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
