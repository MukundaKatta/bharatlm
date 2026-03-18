import { NextRequest, NextResponse } from 'next/server';
import { IndicLanguage } from '@/types';
import { LANGUAGES } from '@/lib/languages';
import { getMockChatResponse } from '@/utils/mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, language, domain, systemPrompt, history } = body;

    if (!message || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: message, language' },
        { status: 400 }
      );
    }

    if (!LANGUAGES[language as IndicLanguage]) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    // Try calling external LLM API if configured
    const apiKey = process.env.OPENAI_API_KEY || process.env.BHARAT_LM_API_KEY;

    if (apiKey && process.env.BHARAT_LM_API_URL) {
      try {
        const langInfo = LANGUAGES[language as IndicLanguage];
        const systemMessage = systemPrompt ||
          `You are BharatLM, a multilingual AI assistant for Indian languages. ` +
          `Respond in ${langInfo.name} (${langInfo.nativeName}) using ${langInfo.script} script. ` +
          `Be helpful, accurate, and culturally sensitive.` +
          (domain ? ` You are specialized in ${domain} domain.` : '');

        const messages = [
          { role: 'system', content: systemMessage },
          ...(history || []).map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
          { role: 'user', content: message },
        ];

        const response = await fetch(process.env.BHARAT_LM_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages,
            temperature: 0.7,
            max_tokens: 1024,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          const latencyMs = Date.now() - startTime;

          return NextResponse.json({
            content,
            language,
            domain,
            latencyMs,
            model: 'bharatlm-7b',
          });
        }
      } catch {
        // Fall through to mock
      }
    }

    // Fallback to mock response
    const content = getMockChatResponse(message, language as IndicLanguage);
    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      content,
      language,
      domain,
      latencyMs,
      model: 'mock',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
