import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    sessionId: typeof window !== "undefined" ? localStorage.getItem("jeju.sessionId") : null,
    messages: [],
    sessions: [],
    isSending: false,

    setSessionId: (id) => {
        if (typeof window !== "undefined") {
            if (id) localStorage.setItem("jeju.sessionId", id);
            else localStorage.removeItem("jeju.sessionId");
        }
        set({ sessionId: id });
    },
    setMessages: (msgs) => set({ messages: msgs }),
    addMessage: (msg) => set({ messages: [...get().messages, msg] }),
    setSessions: (list) => set({ sessions: list }),
    setSending: (v) => set({ isSending: v }),
    reset: () => set({ sessionId: null, messages: [] }),
}));