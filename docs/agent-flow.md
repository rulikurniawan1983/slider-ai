# Slider AI - Agent Flow

## Agent Architecture

```
User Request → Agent Selection → Prompt Construction → Tool Calling → Execution → Result → LLM → Response
```

## Built-in Agents

| Agent | Model | Temperature | Use Case |
|-------|-------|-------------|----------|
| General Agent | gpt-4o-mini | 0.7 | General tasks |
| Research Agent | gpt-4o | 0.5 | Deep research |
| Customer Support | gpt-4o-mini | 0.3 | Customer service |
| Sales Agent | gpt-4o-mini | 0.6 | Sales process |
| Marketing Agent | gpt-4o-mini | 0.8 | Marketing strategy |
| Report Analyst | gpt-4o | 0.4 | Data analysis |
| Knowledge Base | gpt-4o-mini | 0.5 | KB search |

## Agent Configuration
Each agent has:
- Name, Description, Avatar
- System Prompt
- Model selection
- Temperature (0-1)
- Tool Access list
- Built-in flag

## Tool Calling Flow

1. User sends message to agent
2. System constructs prompt with available tools
3. LLM decides whether to call a tool
4. Tool executed via ToolRegistry
5. Tool result fed back to LLM
6. LLM generates final response
7. Response streamed to user

## Available Tools

| Tool | Description |
|------|-------------|
| Calculator | Mathematical calculations |
| File Search | Search files in knowledge base |
| Knowledge Search | RAG-based knowledge retrieval |
| PDF Reader | Read PDF document content |
| Word Reader | Read DOCX document content |
| Excel Reader | Read XLSX/CSV content |
| Data Analysis | Analyze data and provide insights |

## Adding Custom Tools

1. Create tool definition with id, name, description, parameters, execute function
2. Register with ToolRegistry
3. Assign to agents via AgentTool relation

## Agent Initialization
Built-in agents automatically created for each new workspace during user registration.
