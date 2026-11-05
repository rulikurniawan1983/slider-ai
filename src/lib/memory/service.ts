import { db } from "@/lib/database/client";

export interface MemoryInput {
  userId: string;
  workspaceId?: string;
  content: string;
  type: "PREFERENCE" | "FACT" | "INTERACTION" | "WORKFLOW";
  importance?: number;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface MemorySearchInput {
  userId: string;
  query?: string;
  workspaceId?: string;
  type?: "PREFERENCE" | "FACT" | "INTERACTION" | "WORKFLOW";
  limit?: number;
}

export class MemoryService {
  async create(input: MemoryInput) {
    return db.memory.create({
      data: {
        userId: input.userId,
        workspaceId: input.workspaceId,
        content: input.content,
        type: input.type,
        importance: input.importance ?? 1,
        source: input.source,
        metadata: input.metadata as any,
      },
    });
  }

  async search(input: MemorySearchInput) {
    const where: Record<string, unknown> = { userId: input.userId };
    if (input.workspaceId) where.workspaceId = input.workspaceId;
    if (input.type) where.type = input.type;

    return db.memory.findMany({
      where,
      orderBy: [{ importance: "desc" }, { createdAt: "desc" }],
      take: input.limit ?? 10,
    });
  }

  async getRelevantMemory(userId: string, query: string, workspaceId?: string) {
    // Simple keyword-based relevance; in production use embedding similarity
    const memories = await this.search({ userId, query, workspaceId, limit: 5 });
    return memories.map((m: any) => m.content);
  }

  async update(id: string, data: Partial<MemoryInput>) {
    const { userId, workspaceId, ...rest } = data;
    return db.memory.update({
      where: { id },
      data: {
        ...(rest as any),
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return db.memory.delete({ where: { id } });
  }
}

export const memoryService = new MemoryService();
