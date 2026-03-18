'use client';

import React from 'react';
import { ChatInterface } from '@/components/shared/ChatInterface';

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-57px)]">
      <ChatInterface
        domain="general"
        title="Indic Language Chat"
        placeholder="Type your message in any Indian language..."
      />
    </div>
  );
}
