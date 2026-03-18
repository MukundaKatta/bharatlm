# BharatLM

Multilingual Indian language AI platform supporting 13+ Indic languages with chat, translation, and voice capabilities.

<!-- Add screenshot here -->

## Features

- **Indic Language Chat** — Conversational AI in 13+ Indian languages with native script support
- **Script Converter** — Convert between Devanagari, Tamil, Telugu, Kannada, and more
- **Transliteration Engine** — Type in English and auto-convert to any Indic script in real time
- **Voice Assistant** — Speech-to-text and text-to-speech for all supported languages
- **Document Translation** — Translate government, legal, and official documents
- **NLP Benchmarks** — Evaluation metrics for Indic language models across NLP tasks
- **Education Module** — Language learning and educational content tools
- **Healthcare Module** — Medical terminology and healthcare communication support
- **Government Advisory** — Advisory tools for public sector language needs
- **API Documentation** — Developer-facing API docs for integration
- **Authentication** — Secure user login and session management

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Internationalization:** next-intl
- **Charts:** Recharts
- **Markdown:** react-markdown
- **Animation:** Framer Motion
- **Database:** Supabase (with SSR helpers)
- **Validation:** Zod
- **Notifications:** react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

```bash
git clone <repo-url>
cd bharatlm
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/(main)/
│   ├── chat/             # Multilingual chat interface
│   ├── converter/        # Script conversion tool
│   ├── transliteration/  # Real-time transliteration
│   ├── voice/            # Voice assistant
│   ├── translation/      # Document translation
│   ├── benchmark/        # NLP benchmark dashboard
│   ├── education/        # Learning tools
│   ├── healthcare/       # Healthcare module
│   ├── advisory/         # Government advisory
│   ├── api-docs/         # API documentation
│   └── auth/             # Authentication
├── components/           # Shared UI components
├── lib/                  # Languages config, utilities
└── utils/                # Helper functions
```

