import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface UseChatOptions {
  conversationId: string;
  onMessage?: (message: any) => void;
}

export function useChat({ conversationId, onMessage }: UseChatOptions) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`);
      if (!res.ok) throw new Error("Failed to load messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    }
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [conversationId, loadMessages]);

  const sendMessage = useCallback(
    async (text: string, agentId?: string) => {
      if (!text.trim()) return;
      setLoading(true);
      setError(null);

      const optimisticMessage = {
        id: "optimistic-" + Date.now(),
        role: "USER",
        content: text,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, conversationId, agentId }),
        });

        if (!res.ok) throw new Error("Failed to send message");

        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === optimisticMessage.id ? { ...m, id: data.messageId } : m
          )
        );

        await loadMessages();

        onMessage?.(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
      } finally {
        setLoading(false);
      }
    },
    [conversationId, loadMessages, onMessage]
  );

  return { messages, loading, error, sendMessage, reload: loadMessages };
}
