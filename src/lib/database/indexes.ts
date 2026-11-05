// Slider AI - Database Indexes & Constraints Helper

export const INDEXES = {
  user: ["email", "role", "deletedAt"],
  workspace: ["slug", "ownerId", "deletedAt"],
  conversation: ["userId", "workspaceId", "agentId", "isArchived", "deletedAt", "updatedAt"],
  message: ["conversationId", "role", "createdAt", "deletedAt"],
  document: ["workspaceId", "userId", "status", "deletedAt"],
  documentChunk: ["documentId", "chunkIndex"],
  agent: ["workspaceId", "userId", "isBuiltIn", "isActive", "deletedAt"],
  memory: ["userId", "workspaceId", "type", "createdAt"],
  task: ["userId", "status", "type", "createdAt"],
  apiKey: ["userId", "isActive"],
  auditLog: ["userId", "workspaceId", "action", "createdAt"],
} as const;

export const SOFT_DELETE_MODELS = [
  "User",
  "Workspace",
  "Conversation",
  "Message",
  "Document",
  "Agent",
] as const;
