import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGES } from '@/lib/languages';
import { IndicLanguage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, language, speed = 1, pitch = 1 } = body;

    if (!text || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: text, language' },
        { status: 400 }
      );
    }

    if (!LANGUAGES[language as IndicLanguage]) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // In production, integrate with Google Cloud Text-to-Speech or a local TTS model.
    // The client-side uses the Web Speech API for now.
    // This endpoint would return an audio file URL or base64 audio data.

    const googleApiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (googleApiKey) {
      try {
        const langCodes: Record<string, string> = {
          hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN',
          bn: 'bn-IN', mr: 'mr-IN', gu: 'gu-IN', pa: 'pa-IN', en: 'en-IN',
        };

        const response = await fetch(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text },
              voice: {
                languageCode: langCodes[language] || 'hi-IN',
                ssmlGender: 'FEMALE',
              },
              audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: speed,
                pitch: (pitch - 1) * 4, // Convert 0.5-2 range to -4 to 4
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            audioContent: data.audioContent,
            format: 'mp3',
            language,
          });
        }
      } catch {
        // Fall through
      }
    }

    return NextResponse.json({
      message: 'TTS not configured. Use Web Speech API on client side.',
      language,
      text: text.substring(0, 100),
      useBrowserTTS: true,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
