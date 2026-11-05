# Slider AI - Product Architecture

## 1. Vision
Platform AI Workspace modern yang menggabungkan kemampuan ChatGPT, Claude, Microsoft Copilot, Notion AI, Perplexity, dan Cursor AI dalam satu platform enterprise-grade.

## 2. Target Audience
- Individu (freelancer, peneliti, pengembang)
- Tim kecil & menengah (startup, agency)
- Perusahaan besar (enterprise)

## 3. Core Features
| Fitur | Deskripsi |
|-------|-----------|
| AI Chat | Multi-conversation, streaming, markdown, code highlighting |
| AI Agents | 7 built-in agents dengan custom tools |
| Knowledge Base | Upload dokumen, extract, chunking, embedding, vector search |
| RAG Engine | Similarity, semantic, hybrid search, source citation |
| Memory System | Short-term (conversation) & long-term (user preferences) |
| Tool System | Calculator, file/knowledge/document search, data analysis |
| Document Center | Upload, delete, search, preview, folder management |
| Workspace | Per-user workspace isolasi |
| User Management | Super Admin, Admin, User roles |
| Admin Panel | Dashboard statistik, API usage, token, storage |

## 4. User Roles
- **Super Admin**: Akses penuh semua workspace dan sistem
- **Admin**: Kelola user, team, permission dalam workspace
- **User**: Akses fitur standar (chat, agent, dokumen)

## 5. Non-Functional Requirements
- Dark mode, light mode, responsive, mobile-first
- Streaming response, server components, lazy loading, pagination, caching
- JWT secure, CSRF, XSS, rate limiting, input validation, encrypted API keys
- Docker & Docker Compose deployment
- Test coverage minimal 80%
