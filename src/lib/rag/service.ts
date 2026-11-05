import { db } from "@/lib/database/client";
import { embeddingService } from "@/lib/rag/embedding";
import { chunkText } from "@/lib/rag/embedding";

export interface SearchResult {
  id: string;
  content: string;
  similarity: number;
  documentId: string;
  documentTitle: string;
  metadata: Record<string, unknown>;
}

export interface RagSearchInput {
  query: string;
  workspaceId?: string;
  documentIds?: string[];
  limit?: number;
  threshold?: number;
}

export class RagService {
  async search(input: RagSearchInput): Promise<SearchResult[]> {
    const queryEmbedding = await embeddingService.embedQuery(input.query);
    const limit = input.limit ?? 10;
    const threshold = input.threshold ?? 0.7;

    const where: Record<string, unknown> = {};
    if (input.workspaceId) {
      where.document = { workspaceId: input.workspaceId };
    }
    if (input.documentIds?.length) {
      where.documentId = { in: input.documentIds };
    }

    const chunks: any[] = await db.$queryRawUnsafe(
      `
      SELECT dc.id, dc.content, dc.metadata, d.id as document_id, d.title as document_title,
             (dc.embedding::vector <=> $1::vector) as distance
      FROM "DocumentChunk" dc
      JOIN "Document" d ON d.id = dc."documentId"
      WHERE dc.embedding IS NOT NULL
        ${input.workspaceId ? `AND d."workspaceId" = $2` : ""}
        ${input.documentIds?.length ? `AND dc."documentId" = ANY($3)` : ""}
      ORDER BY distance ASC
      LIMIT $4
      `,
      queryEmbedding,
      input.workspaceId,
      input.documentIds,
      limit
    );

    return chunks
      .filter((c: any) => 1 - c.distance >= threshold)
      .map((c: any) => ({
        id: c.id,
        content: c.content,
        similarity: 1 - c.distance,
        documentId: c.document_id,
        documentTitle: c.document_title,
        metadata: c.metadata ?? {},
      }));
  }

  async processDocument(documentId: string): Promise<void> {
    const document = await db.document.findUnique({
      where: { id: documentId },
    });

    if (!document) return;

    await db.document.update({
      where: { id: documentId },
      data: { status: "PROCESSING" },
    });

    try {
      const content = (document.metadata as any)?.content || "Document content placeholder";

      const { chunks } = chunkText({ text: content, metadata: { documentId } });

      const embeddings = await embeddingService.embedTexts({
        texts: chunks.map((c) => c.content),
      });

      for (let i = 0; i < chunks.length; i++) {
        await db.documentChunk.create({
          data: {
            documentId,
            content: chunks[i].content,
            contentType: "TEXT",
            chunkIndex: chunks[i].index,
            tokenCount: chunks[i].content.split(/\s+/).length,
            embedding: `[${embeddings.embeddings[i].join(",")}]`,
            metadata: chunks[i].metadata as any,
          },
        });
      }

      await db.document.update({
        where: { id: documentId },
        data: { status: "COMPLETED", chunkCount: chunks.length },
      });
    } catch (error) {
      await db.document.update({
        where: { id: documentId },
        data: { status: "FAILED" },
      });
      throw error;
    }
  }

  async getContext(query: string, workspaceId?: string): Promise<string> {
    const results = await this.search({
      query,
      workspaceId,
      limit: 5,
      threshold: 0.6,
    });

    if (results.length === 0) return "";

    return results
      .map((r, i) => `[Sumber ${i + 1}] ${r.content}\n`)
      .join("\n");
  }
}

export const ragService = new RagService();
