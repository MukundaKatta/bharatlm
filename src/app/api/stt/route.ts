import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGES } from '@/lib/languages';
import { IndicLanguage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as File | null;
    const language = formData.get('language') as string;

    if (!audio || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: audio (file), language' },
        { status: 400 }
      );
    }

    if (!LANGUAGES[language as IndicLanguage]) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // In production, integrate with Google Cloud Speech-to-Text or Whisper.
    // The client-side uses the Web Speech API for now.
    // This endpoint would accept audio and return transcription.

    const googleApiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (googleApiKey) {
      try {
        const audioBytes = await audio.arrayBuffer();
        const audioContent = Buffer.from(audioBytes).toString('base64');

        const langCodes: Record<string, string> = {
          hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN',
          bn: 'bn-IN', mr: 'mr-IN', gu: 'gu-IN', pa: 'pa-IN', en: 'en-IN',
        };

        const response = await fetch(
          `https://speech.googleapis.com/v1/speech:recognize?key=${googleApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              config: {
                encoding: 'WEBM_OPUS',
                sampleRateHertz: 48000,
                languageCode: langCodes[language] || 'hi-IN',
                enableAutomaticPunctuation: true,
              },
              audio: { content: audioContent },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const result = data.results?.[0]?.alternatives?.[0];
          return NextResponse.json({
            text: result?.transcript || '',
            confidence: result?.confidence || 0,
            language,
          });
        }
      } catch {
        // Fall through
      }
    }

    return NextResponse.json({
      message: 'STT not configured. Use Web Speech API on client side.',
      language,
      useBrowserSTT: true,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
