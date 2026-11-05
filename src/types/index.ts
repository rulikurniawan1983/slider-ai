export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type MemberRole = "OWNER" | "ADMIN" | "MEMBER";
export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM" | "TOOL";
export type MessageContentType = "TEXT" | "MARKDOWN" | "CODE" | "IMAGE" | "FILE";
export type DocumentStatus = "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED" | "ARCHIVED";
export type ChunkContentType = "TEXT" | "TABLE" | "IMAGE";
export type MemoryType = "PREFERENCE" | "FACT" | "INTERACTION" | "WORKFLOW";
export type TaskStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  contentType?: MessageContentType;
  toolCalls?: any;
  toolResult?: any;
  citations?: any[];
  createdAt: Date;
}

export interface ConversationWithMessages {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export interface AgentConfig {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  prompt: string;
  model: string;
  temperature: number;
  tools: string[];
}

export interface RAGResult {
  content: string;
  metadata: any;
  similarity: number;
  source: string;
  documentId: string;
  chunkId: string;
}

export interface MemoryEntry {
  id: string;
  content: string;
  type: MemoryType;
  importance: number;
  source?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}
