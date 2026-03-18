import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BharatLM — Multilingual Indian Language AI Platform',
  description: 'AI-powered tools for 13+ Indian languages — chat, translate, convert scripts, voice assistant, and more.',
  keywords: [
    'Indian languages', 'AI', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam',
    'Bengali', 'NLP', 'translation', 'transliteration', 'Indic', 'BharatLM',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
