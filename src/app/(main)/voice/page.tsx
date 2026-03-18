'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllLanguages, getFontClass } from '@/lib/languages';
import { IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';

export default function VoicePage() {
  const { currentLanguage, switchLanguage } = useLanguage();
  const languages = getAllLanguages();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Voice Assistant</h1>
        <p className="text-gray-500">
          Speech-to-text and text-to-speech for all 13 Indian languages.
          Uses the Web Speech API with Indic language support.
        </p>
      </div>

      <div className="mb-6">
        <Select
          label="Language"
          value={currentLanguage}
          onChange={(e) => switchLanguage(e.target.value as IndicLanguage)}
          options={languages.map((l) => ({
            value: l.code,
            label: `${l.nativeName} (${l.name})`,
          }))}
          className="w-64"
        />
      </div>

      <Tabs
        tabs={[
          { id: 'stt', label: 'Speech to Text' },
          { id: 'tts', label: 'Text to Speech' },
        ]}
      >
        {(activeTab) =>
          activeTab === 'stt' ? (
            <SpeechToTextPanel language={currentLanguage} />
          ) : (
            <TextToSpeechPanel language={currentLanguage} />
          )
        }
      </Tabs>
    </div>
  );
}

function SpeechToTextPanel({ language }: { language: IndicLanguage }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);
  const fontClass = getFontClass(language);

  const langCodes: Record<string, string> = {
    hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN',
    bn: 'bn-IN', mr: 'mr-IN', gu: 'gu-IN', pa: 'pa-IN', od: 'or-IN',
    as: 'as-IN', ur: 'ur-IN', sa: 'sa-IN', en: 'en-IN',
  };

  const startRecording = useCallback(() => {
    setError('');
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Try Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = langCodes[language] || 'hi-IN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let interimText = '';
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + ' ';
        } else {
          interimText += event.results[i][0].transcript;
        }
      }
      if (finalText) {
        setTranscript((prev) => prev + finalText);
      }
      setInterim(interimText);
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterim('');
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [language]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Speech to Text</CardTitle>
        <CardDescription>
          Click the microphone to start recording. Speak in your selected language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Microphone button */}
        <div className="flex flex-col items-center py-8">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300',
              isRecording
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            )}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
          <p className="mt-3 text-sm text-gray-500">
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>

        {/* Interim */}
        {interim && (
          <div className={cn('mb-3 text-sm text-gray-400 italic', fontClass)}>
            {interim}
          </div>
        )}

        {/* Transcript */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Transcript</label>
          <div
            className={cn(
              'min-h-[120px] rounded-xl border border-gray-200 bg-gray-50 p-4',
              'text-indic-base leading-relaxed',
              fontClass
            )}
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            {transcript || <span className="text-gray-400">Transcribed text will appear here...</span>}
          </div>
        </div>

        {transcript && (
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(transcript)}
            >
              Copy Text
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setTranscript('')}>
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TextToSpeechPanel({ language }: { language: IndicLanguage }) {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const fontClass = getFontClass(language);

  const langCodes: Record<string, string> = {
    hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN',
    bn: 'bn-IN', mr: 'mr-IN', gu: 'gu-IN', pa: 'pa-IN', od: 'or-IN',
    as: 'as-IN', ur: 'ur-IN', sa: 'sa-IN', en: 'en-IN',
  };

  const speak = () => {
    if (!text.trim() || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCodes[language] || 'hi-IN';
    utterance.rate = speed;
    utterance.pitch = pitch;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  const sampleTexts: Partial<Record<IndicLanguage, string>> = {
    hi: 'नमस्ते, मैं भारतLM हूँ। मैं आपकी कैसे मदद कर सकता हूँ?',
    ta: 'வணக்கம், நான் பாரத்LM. நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    te: 'నమస్కారం, నేను భారత్LM. నేను మీకు ఎలా సహాయం చేయగలను?',
    kn: 'ನಮಸ್ಕಾರ, ನಾನು ಭಾರತ್LM. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    bn: 'নমস্কার, আমি ভারতLM। আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    en: 'Hello, I am BharatLM. How can I help you today?',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Speech</CardTitle>
        <CardDescription>
          Enter text in your selected language and listen to the pronunciation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          rows={5}
          indicFont={fontClass}
          className={language === 'ur' ? 'text-right' : ''}
        />

        {sampleTexts[language] && (
          <button
            onClick={() => setText(sampleTexts[language]!)}
            className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
          >
            Load sample text
          </button>
        )}

        {/* Controls */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Speed: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={speaking ? stop : speak}
            variant={speaking ? 'outline' : 'primary'}
            size="lg"
            disabled={!text.trim()}
          >
            {speaking ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                Speak
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
