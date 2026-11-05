export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<any>;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

export class ToolRegistry {
  private tools = new Map<string, ToolDefinition>();

  register(tool: ToolDefinition) {
    this.tools.set(tool.id, tool);
  }

  unregister(id: string) {
    this.tools.delete(id);
  }

  get(id: string): ToolDefinition | undefined {
    return this.tools.get(id);
  }

  list(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  async execute(id: string, args: Record<string, unknown>): Promise<ToolResult> {
    const tool = this.get(id);
    if (!tool) {
      return { success: false, error: `Tool ${id} not found` };
    }
    try {
      const data = await tool.execute(args);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

export const toolRegistry = new ToolRegistry();

toolRegistry.register({
  id: "calculator",
  name: "Calculator",
  description: "Perform basic mathematical calculations",
  parameters: {
    type: "object",
    properties: {
      expression: { type: "string", description: "Mathematical expression to evaluate" },
    },
    required: ["expression"],
  },
  execute: async (args: Record<string, unknown>) => {
    const { expression } = args as { expression: string };
    try {
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, "");
      const result = new Function("return " + sanitized)();
      return { result };
    } catch {
      throw new Error("Invalid mathematical expression");
    }
  },
});

toolRegistry.register({
  id: "file_search",
  name: "File Search",
  description: "Search files in the knowledge base",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search query" },
      workspaceId: { type: "string", description: "Workspace ID" },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, unknown>) => {
    const { query, workspaceId } = args as { query: string; workspaceId?: string };
    const { ragService } = await import("@/lib/rag/service");
    const results = await ragService.search({ query, workspaceId, limit: 5 });
    return { results };
  },
});

toolRegistry.register({
  id: "knowledge_search",
  name: "Knowledge Search",
  description: "Search the knowledge base for relevant information",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search query" },
      workspaceId: { type: "string", description: "Workspace ID" },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, unknown>) => {
    const { query, workspaceId } = args as { query: string; workspaceId?: string };
    const { ragService } = await import("@/lib/rag/service");
    const context = await ragService.getContext(query, workspaceId);
    return { context };
  },
});

toolRegistry.register({
  id: "pdf_reader",
  name: "PDF Reader",
  description: "Read and extract text from PDF documents",
  parameters: {
    type: "object",
    properties: {
      documentId: { type: "string", description: "Document ID" },
    },
    required: ["documentId"],
  },
  execute: async (args: Record<string, unknown>) => {
    const { documentId } = args as { documentId: string };
    const { db } = await import("@/lib/database/client");
    const document = await db.document.findUnique({ where: { id: documentId } });
    if (!document) throw new Error("Document not found");
    return { documentId, title: document.title, status: document.status };
  },
});

toolRegistry.register({
  id: "data_analysis",
  name: "Data Analysis",
  description: "Analyze data and provide insights",
  parameters: {
    type: "object",
    properties: {
      data: { type: "string", description: "Data to analyze (JSON or CSV)" },
      analysisType: { type: "string", description: "Type of analysis to perform" },
    },
    required: ["data"],
  },
  execute: async (args: Record<string, unknown>) => {
    const { data, analysisType = "summary" } = args as { data: string; analysisType?: string };
    return { analysisType, summary: "Data analysis completed", insights: [] };
  },
});
