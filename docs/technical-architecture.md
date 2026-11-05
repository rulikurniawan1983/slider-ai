# Slider AI - Technical Architecture

## 1. Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| UI | Tailwind CSS, Shadcn UI |
| Database | PostgreSQL + pgvector |
| ORM | Prisma ORM |
| Auth | Auth.js (NextAuth) |
| AI SDK | OpenAI SDK, Vercel AI SDK |
| Embeddings | OpenAI Embeddings (text-embedding-3-small) |
| Vector Search | pgvector |
| Storage | S3 Compatible Storage |
| Cache | Redis |
| Deployment | Docker, Docker Compose |

## 2. Architecture Diagram (Layered)

```
┌─────────────────────────────────────────────────────┐
│                    Presentation Layer               │
│  Next.js 15 (Server & Client Components, App Router)│
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│                    API Layer                        │
│  Route Handlers (REST), WebSockets (streaming)      │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│                  Application Layer                  │
│  AI Service, RAG Service, Agent Service,            │
│  Memory Service, Tool Service, Storage Service      │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│                  Data Layer                         │
│  PostgreSQL (pgvector), Redis, S3 Storage           │
└─────────────────────────────────────────────────────┘
```

## 3. Data Flow

### Chat Flow
Client → API Route → AI Service → LLM (streaming) → Client (Vercel AI SDK)

### RAG Flow
Upload → Extract → Chunk → Embed → Store (pgvector) → Search → Retrieve → Context → LLM

### Agent Flow
User Request → Agent Selection → Tool Calling → Execution → Result → LLM → Response

## 4. Security
- Auth.js with JWT strategy
- Password hashing (bcrypt)
- CSRF protection
- XSS protection (sanitize HTML)
- Rate limiting (Redis)
- Input validation (Zod)
- Encrypted API keys (AES-256)

## 5. Performance
- Server Components by default
- Streaming responses (AI SDK)
- Lazy loading (next/dynamic)
- Pagination (cursor-based)
- Caching (Redis + Next.js ISR)
- Optimistic updates
