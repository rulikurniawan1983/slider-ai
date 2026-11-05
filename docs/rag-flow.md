# Slider AI - RAG Flow

## Document Processing Pipeline

```
Upload → Extract Text → Chunking → Embedding → Store Vector → Search → Retrieve Context → LLM
```

## Step-by-Step

### 1. Upload
- User uploads file (PDF, DOCX, XLSX, CSV, TXT)
- File stored in S3-compatible storage
- Document record created with status UPLOADED

### 2. Extract Text
- Extract text content from file based on MIME type
- PDF: pdf-parse or similar
- DOCX: mammoth or similar
- XLSX/CSV: SheetJS or similar
- TXT: plain text reading

### 3. Chunking
- Text split into chunks (max 1000 chars, 200 char overlap)
- Each chunk gets index and metadata
- Chunks stored in DocumentChunk table

### 4. Embedding
- OpenAI Embeddings (text-embedding-3-small)
- Each chunk embedded into 1536-dimensional vector
- Vector stored in pgvector column

### 5. Vector Search
- User query embedded into vector
- Cosine similarity search against stored vectors
- pgvector `<=>` operator for distance calculation
- Top-K results returned with similarity scores

### 6. Context Retrieval
- Top chunks combined into context string
- Source citations attached to each chunk
- Context length limited to fit model context window

### 7. LLM Generation
- System prompt includes retrieved context
- User query appended
- Streaming response via Vercel AI SDK
- Citations included in final response

## Search Types
- Similarity Search: Cosine distance on vectors
- Semantic Search: Embedding-based similarity
- Hybrid Search: Vector + keyword search (future)

## Source Citation
Each response includes:
- Document title
- Chunk content excerpt
- Similarity score
- Document ID
