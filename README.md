# Slider AI

Slider AI adalah platform AI Workspace modern yang membantu individu, tim, dan perusahaan bekerja lebih cepat menggunakan AI Assistant, AI Agent, Knowledge Base, dan Workflow Automation dalam satu platform.

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **UI**: Tailwind CSS, Shadcn UI
- **Database**: PostgreSQL + pgvector
- **ORM**: Prisma ORM
- **Auth**: Auth.js (NextAuth)
- **AI SDK**: OpenAI SDK, Vercel AI SDK
- **Embeddings**: OpenAI Embeddings
- **Vector Search**: pgvector
- **Storage**: S3 Compatible Storage
- **Cache**: Redis
- **Deployment**: Docker, Docker Compose

## Fitur Utama

1. **AI Chat** - Multiple conversations, streaming response, markdown rendering, code highlighting
2. **AI Agents** - 7 built-in agents dengan custom tool access
3. **Knowledge Base** - Upload PDF, DOCX, XLSX, CSV, TXT dengan RAG pipeline
4. **RAG Engine** - Similarity, semantic, hybrid search with source citation
5. **Memory System** - Short-term & long-term memory
6. **Tool System** - Calculator, file search, knowledge search, document readers, data analysis
7. **Document Center** - Upload, delete, search, preview, folder management
8. **Workspace** - Per-user workspace isolation
9. **User Management** - Super Admin, Admin, User roles
10. **Admin Panel** - Dashboard statistik sistem

## Struktur Folder

```
src/
  app/          - Next.js App Router pages
  components/   - React components (ui, chat, dashboard, agents, documents, layout)
  lib/          - AI, auth, database, rag, memory, tools, storage, utils
  types/        - TypeScript type definitions
  hooks/        - Custom React hooks
prisma/
  schema.prisma - Database schema
  migrations/   - Database migrations
```

## Setup Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

## Docker Deployment

```bash
docker-compose up -d
```

## Testing

```bash
npm test
npm run test:coverage
```

## Dokumentasi

- `docs/product-architecture.md` - Product Architecture
- `docs/technical-architecture.md` - Technical Architecture
- `docs/api-design.md` - API Design
- `docs/ui-design-spec.md` - UI Design Specification
- `docs/auth-flow.md` - Authentication Flow
- `docs/rag-flow.md` - RAG Flow
- `docs/agent-flow.md` - Agent Flow
- `docs/security-guide.md` - Security Guide
- `docs/deployment-guide.md` - Deployment Guide
- `docs/production-guide.md` - Production Guide

## License

MIT
