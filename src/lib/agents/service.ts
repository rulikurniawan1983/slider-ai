import { db } from "@/lib/database/client";
import { toolRegistry } from "@/lib/tools/registry";

export interface AgentInput {
  name: string;
  description?: string;
  avatar?: string;
  prompt: string;
  model?: string;
  temperature?: number;
  workspaceId?: string;
  userId?: string;
  toolIds?: string[];
}

export interface AgentExecuteInput {
  agentId: string;
  message: string;
  conversationId?: string;
}

export class AgentService {
  async create(input: AgentInput) {
    const agent = await db.agent.create({
      data: {
        name: input.name,
        description: input.description,
        avatar: input.avatar,
        prompt: input.prompt,
        model: input.model ?? "gpt-4o-mini",
        temperature: input.temperature ?? 0.7,
        workspaceId: input.workspaceId,
        userId: input.userId,
        isBuiltIn: false,
        isActive: true,
      },
    });

    if (input.toolIds?.length) {
      for (const toolId of input.toolIds) {
        await db.agentTool.create({
          data: { agentId: agent.id, toolId, isEnabled: true },
        });
      }
    }

    return agent;
  }

  async getById(id: string) {
    return db.agent.findUnique({
      where: { id },
      include: { tools: true },
    });
  }

  async list(workspaceId?: string) {
    const where: Record<string, unknown> = {};
    if (workspaceId) where.workspaceId = workspaceId;
    return db.agent.findMany({
      where,
      include: { tools: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: Partial<AgentInput>) {
    return db.agent.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return db.agent.delete({ where: { id } });
  }

  async getBuiltInAgents() {
    return db.agent.findMany({
      where: { isBuiltIn: true, isActive: true },
      include: { tools: true },
    });
  }

  async initializeBuiltInAgents(workspaceId: string) {
    const builtInAgents = [
      {
        name: "General Agent",
        description: "Assistant umum untuk tugas sehari-hari",
        prompt: "Anda adalah Assistant umum yang membantu pengguna dengan berbagai tugas.",
        model: "gpt-4o-mini",
        temperature: 0.7,
      },
      {
        name: "Research Agent",
        description: "Agent untuk riset dan penelitian mendalam",
        prompt: "Anda adalah Research Agent yang spesialis dalam riset dan analisis informasi.",
        model: "gpt-4o",
        temperature: 0.5,
      },
      {
        name: "Customer Support Agent",
        description: "Agent untuk layanan pelanggan",
        prompt: "Anda adalah Customer Support Agent yang membantu menjawab pertanyaan pelanggan.",
        model: "gpt-4o-mini",
        temperature: 0.3,
      },
      {
        name: "Sales Agent",
        description: "Agent untuk penjualan dan pemasaran",
        prompt: "Anda adalah Sales Agent yang membantu dalam proses penjualan.",
        model: "gpt-4o-mini",
        temperature: 0.6,
      },
      {
        name: "Marketing Agent",
        description: "Agent untuk strategi pemasaran",
        prompt: "Anda adalah Marketing Agent yang membantu membuat strategi pemasaran.",
        model: "gpt-4o-mini",
        temperature: 0.8,
      },
      {
        name: "Report Analyst Agent",
        description: "Agent untuk menganalisis laporan",
        prompt: "Anda adalah Report Analyst Agent yang menganalisis laporan dan data.",
        model: "gpt-4o",
        temperature: 0.4,
      },
      {
        name: "Knowledge Base Agent",
        description: "Agent untuk mengakses basis pengetahuan",
        prompt: "Anda adalah Knowledge Base Agent yang membantu mencari informasi dari basis pengetahuan.",
        model: "gpt-4o-mini",
        temperature: 0.5,
      },
    ];

    for (const agent of builtInAgents) {
      await db.agent.create({
        data: {
          ...agent,
          workspaceId,
          isBuiltIn: true,
          isActive: true,
        },
      });
    }
  }
}

export const agentService = new AgentService();
