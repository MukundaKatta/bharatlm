-- ============================================================
-- BharatLM Supabase Schema
-- ============================================================

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  preferred_language TEXT DEFAULT 'hi',
  api_key TEXT UNIQUE,
  usage_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  domain TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  language TEXT NOT NULL,
  translated_content TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document translations
CREATE TABLE IF NOT EXISTS public.document_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  original_text TEXT NOT NULL,
  translated_text TEXT,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  domain TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending',
  progress REAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- API usage tracking
CREATE TABLE IF NOT EXISTS public.api_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  endpoint TEXT NOT NULL,
  language TEXT NOT NULL,
  tokens INTEGER DEFAULT 0,
  latency_ms INTEGER DEFAULT 0,
  status TEXT DEFAULT 'success',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Benchmark results
CREATE TABLE IF NOT EXISTS public.benchmark_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  language TEXT NOT NULL,
  task TEXT NOT NULL,
  model TEXT NOT NULL,
  score REAL NOT NULL,
  bleu REAL,
  rouge REAL,
  f1 REAL,
  accuracy REAL,
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own sessions" ON public.chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own messages" ON public.chat_messages
  FOR SELECT USING (
    session_id IN (SELECT id FROM public.chat_sessions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    session_id IN (SELECT id FROM public.chat_sessions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can read own translations" ON public.document_translations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create translations" ON public.document_translations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own usage" ON public.api_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Public read for benchmark results
CREATE POLICY "Anyone can read benchmarks" ON public.benchmark_results
  FOR SELECT TO PUBLIC USING (true);

-- Indexes
CREATE INDEX idx_chat_sessions_user ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id);
CREATE INDEX idx_api_usage_user ON public.api_usage(user_id);
CREATE INDEX idx_api_usage_endpoint ON public.api_usage(endpoint);
CREATE INDEX idx_api_usage_language ON public.api_usage(language);
CREATE INDEX idx_benchmark_language ON public.benchmark_results(language);
