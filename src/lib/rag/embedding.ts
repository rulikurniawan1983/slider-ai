import { OpenAI } from "openai";

export interface EmbeddingInput {
  texts: string[];
}

export interface EmbeddingOutput {
  embeddings: number[][];
}

export class EmbeddingService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }

  async embedTexts(inputs: EmbeddingInput): Promise<EmbeddingOutput> {
    const embeddings: number[][] = [];
    for (const text of inputs.texts) {
      const response = await this.openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });
      embeddings.push(response.data[0].embedding);
    }
    return { embeddings };
  }

  async embedQuery(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  }
}

export const embeddingService = new EmbeddingService();

export interface ChunkInput {
  text: string;
  metadata?: Record<string, unknown>;
}

export interface ChunkOutput {
  chunks: { content: string; index: number; metadata?: Record<string, unknown> }[];
}

export function chunkText(
  input: ChunkInput,
  maxChunkSize = 1000,
  overlap = 200
): ChunkOutput {
  const { text, metadata } = input;
  const chunks: { content: string; index: number; metadata?: Record<string, unknown> }[] = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + maxChunkSize, text.length);
    let chunk = text.slice(start, end);

    if (end < text.length) {
      const lastPeriod = chunk.lastIndexOf(". ");
      if (lastPeriod !== -1 && lastPeriod > chunk.length * 0.5) {
        chunk = chunk.slice(0, lastPeriod + 1);
      }
    }

    chunks.push({ content: chunk.trim(), index, metadata });
    index++;
    start = end - overlap;
    if (start < 0) start = 0;
    if (start >= text.length) break;
  }

  return { chunks };
}
