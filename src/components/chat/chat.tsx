"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Copy, Edit2, Trash2 } from "lucide-react";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";

export interface ChatProps {
  conversationId: string;
  agentId?: string;
}

export default function Chat({ conversationId, agentId }: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, error, sendMessage } = useChat({ conversationId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await sendMessage(inputValue, agentId);
    setInputValue("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 flex flex-col relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 h-1 bg-border" />
        <ScrollArea className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "USER" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs">
                {msg.role === "USER" ? "U" : "A"}
              </div>
              <div className="flex-1">
                <Card className={`${
                  msg.role === "USER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-foreground"
                } p-4 rounded-xl max-w-[85%]`}>
                  <MarkdownRenderer content={msg.content} />
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} className="cursor-pointer hover:text-primary" />
                    {msg.role === "USER" && (
                      <>
                        <Edit2 size={14} className="cursor-pointer" />
                        <Trash2 size={14} className="cursor-pointer text-destructive" />
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">A</div>
              <div className="flex-1">
                <Card className="bg-border p-4 rounded-xl animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </Card>
              </div>
            </div>
          )}
          {error && (
            <div className="flex gap-3 flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-xs text-destructive-foreground">!</div>
              <div className="flex-1">
                <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-xl text-red-500 text-sm">
                  {error}
                </Card>
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="border-t bg-background p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !inputValue.trim()}>
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
