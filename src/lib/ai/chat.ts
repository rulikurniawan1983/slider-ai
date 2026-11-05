import { OpenAI } from "openai";
import { db } from "@/lib/database/client";

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export interface ChatRequest {
  message: string;
  conversationId: string;
  agentId?: string;
  model?: string;
  temperature?: number;
}

export interface ChatResponse {
  text: string;
  conversationId: string;
  messageId: string;
}

export async function generateChatResponse(req: ChatRequest & { userId: string }): Promise<ChatResponse> {
  const conversation = await db.conversation.findUnique({
    where: { id: req.conversationId },
    include: { messages: { orderBy: { createdAt: "asc" }, take: 20 } },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const agent = req.agentId
    ? await db.agent.findUnique({ where: { id: req.agentId } })
    : null;

  const systemPrompt = agent
    ? agent.prompt
    : "You are a helpful AI assistant in Slider AI workspace. Answer in the user's language (Indonesian or English).";

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...conversation.messages.map((m: any) => ({
      role: m.role as "user" | "assistant" | "system" | "tool",
      content: m.content,
    })),
    { role: "user" as const, content: req.message },
  ];

  const completion = await getOpenAI().chat.completions.create({
    model: req.model || agent?.model || "gpt-4o-mini",
    messages: messages as any,
    temperature: req.temperature ?? agent?.temperature ?? 0.7,
    stream: true,
  });

  // Save user message
  const userMessage = await db.message.create({
    data: {
      conversationId: req.conversationId,
      userId: req.userId,
      role: "USER",
      content: req.message,
    },
  });

  let fullText = "";
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || "";
    fullText += content;
  }

  const assistantMessage = await db.message.create({
    data: {
      conversationId: req.conversationId,
      userId: req.userId,
      role: "ASSISTANT",
      content: fullText,
    },
  });

  await db.conversation.update({
    where: { id: req.conversationId },
    data: { updatedAt: new Date() },
  });

  return {
    text: fullText,
    conversationId: req.conversationId,
    messageId: assistantMessage.id,
  };
}

export async function getConversationMessages(conversationId: string) {
  return db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createConversation(data: {
  userId: string;
  title?: string;
  agentId?: string;
  workspaceId?: string;
}) {
  return db.conversation.create({
    data: {
      title: data.title ?? "New Conversation",
      userId: data.userId,
      agentId: data.agentId,
      workspaceId: data.workspaceId,
    },
  });
}
