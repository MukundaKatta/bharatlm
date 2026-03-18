import { create } from 'zustand';
import { IndicLanguage, ChatMessage, ChatSession } from '@/types';

interface AppState {
  // Language
  currentLanguage: IndicLanguage;
  setLanguage: (lang: IndicLanguage) => void;

  // Chat
  sessions: ChatSession[];
  activeSessionId: string | null;
  addSession: (session: ChatSession) => void;
  setActiveSession: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  clearSession: (sessionId: string) => void;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Language
  currentLanguage: 'hi',
  setLanguage: (lang) => set({ currentLanguage: lang }),

  // Chat
  sessions: [],
  activeSessionId: null,
  addSession: (session) =>
    set((state) => ({
      sessions: [session, ...state.sessions],
      activeSessionId: session.id,
    })),
  setActiveSession: (id) => set({ activeSessionId: id }),
  addMessage: (sessionId, message) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId
          ? { ...s, messages: [...s.messages, message], updatedAt: new Date() }
          : s
      ),
    })),
  clearSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [] } : s
      ),
    })),

  // UI
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
