'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllLanguages, getFontClass } from '@/lib/languages';
import { getMockChatResponse } from '@/utils/mock-data';
import { ChatMessage, IndicLanguage } from '@/types';
import { cn } from '@/utils/cn';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  domain?: 'general' | 'agriculture' | 'education' | 'healthcare';
  title?: string;
  placeholder?: string;
  systemPrompt?: string;
  className?: string;
}

export function ChatInterface({
  domain = 'general',
  title,
  placeholder = 'Type your message...',
  systemPrompt,
  className,
}: ChatInterfaceProps) {
  const { currentLanguage, switchLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const fontClass = getFontClass(currentLanguage);
  const languages = getAllLanguages();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: input.trim(),
      language: currentLanguage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call API or use mock
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          language: currentLanguage,
          domain,
          systemPrompt,
          history: messages.slice(-10),
        }),
      });

      let content: string;
      if (response.ok) {
        const data = await response.json();
        content = data.content;
      } else {
        // Fallback to mock
        content = getMockChatResponse(userMessage.content, currentLanguage);
      }

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content,
        language: currentLanguage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallback = getMockChatResponse(userMessage.content, currentLanguage);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: fallback,
          language: currentLanguage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50/50">
        {title && <h2 className="font-semibold text-gray-900">{title}</h2>}
        <Select
          value={currentLanguage}
          onChange={(e) => switchLanguage(e.target.value as IndicLanguage)}
          options={languages.map((l) => ({
            value: l.code,
            label: `${l.nativeName} (${l.name})`,
          }))}
          className="w-48"
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bharat-saffron/20 via-white to-bharat-green/20 flex items-center justify-center">
              <span className={cn('text-2xl font-bold text-gray-600', fontClass)}>भा</span>
            </div>
            <p className="text-sm max-w-xs">
              Start a conversation in {languages.find(l => l.code === currentLanguage)?.name || 'your language'}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md',
                getFontClass(msg.language)
              )}
              dir={msg.language === 'ur' ? 'rtl' : 'ltr'}
            >
              <p className="text-indic-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={cn(
                'text-[10px] mt-1.5',
                msg.role === 'user' ? 'text-indigo-200' : 'text-gray-400'
              )}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className={cn(
              'flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3',
              'text-indic-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200',
              'max-h-32 transition-colors',
              fontClass
            )}
            dir={currentLanguage === 'ur' ? 'rtl' : 'ltr'}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            variant="primary"
            size="lg"
            loading={loading}
            className="rounded-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
