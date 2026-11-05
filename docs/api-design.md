# Slider AI - API Design

## Base URL
`http://localhost:3000/api`

## Authentication
All API routes require a valid session cookie (JWT) except auth routes.

## Endpoints

### Conversations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/conversations | List user conversations |
| POST | /api/conversations | Create new conversation |
| GET | /api/conversations/:id/messages | Get conversation messages |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat | Send message and get AI response |

### Agents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/agents | List agents |
| POST | /api/agents | Create agent |
| GET | /api/agents/:id | Get agent details |
| PUT | /api/agents/:id | Update agent |
| DELETE | /api/agents/:id | Delete agent |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/documents | List documents |
| POST | /api/documents | Upload document |
| GET | /api/documents/:id | Get document presigned URL |
| DELETE | /api/documents/:id | Delete document |

### Memory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/memory | List user memories |
| POST | /api/memory | Create memory |

### API Keys
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/keys | List user API keys |
| POST | /api/keys | Create API key |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/stats | Get system statistics |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | /api/auth/[...nextauth] | NextAuth handler |
| GET | /api/auth/session | Get current session |

## Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

## Rate Limits
- Auth: 5 requests per minute per IP
- API: 100 requests per minute per user
