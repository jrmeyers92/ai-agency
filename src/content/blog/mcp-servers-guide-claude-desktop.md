---
title: "Building MCP Servers for Claude Desktop: A Developer's Guide 2025"
description: "Learn how to create custom Model Context Protocol (MCP) servers to extend Claude Desktop with your own tools and data sources. Includes TypeScript examples, deployment strategies, and real-world use cases from a St. Louis freelance developer."
pubDate: 2025-01-10
image: "/blog/mcp-servers.jpg"
tags: ["MCP", "Claude Desktop", "TypeScript", "AI Integration", "Model Context Protocol", "Freelance Developer", "API Development"]
author: "Jake Meyers"
---

# Building MCP Servers for Claude Desktop: A Developer's Guide

The Model Context Protocol (MCP) is revolutionizing how we integrate AI assistants with external tools and data sources. As one of the first developers to work extensively with MCP servers, I've learned valuable lessons about building robust, scalable integrations for Claude Desktop.

In this guide, I'll share everything you need to know to build your own MCP servers.

## What is the Model Context Protocol?

MCP is an open protocol that allows AI assistants like Claude to securely connect to external data sources and tools. Think of it as a standardized way to give Claude "superpowers" specific to your business or use case.

Key benefits of MCP:
- **Security**: Controlled access to your resources
- **Flexibility**: Support for any data source or API
- **Standardization**: One protocol works across different AI assistants
- **Performance**: Efficient data exchange and caching

## MCP Server Architecture

An MCP server consists of three main components:

### 1. Resources
Static or dynamic data that Claude can read (files, database records, API responses)

### 2. Tools
Functions that Claude can execute (API calls, database queries, file operations)

### 3. Prompts
Pre-defined prompt templates with parameters

## Building Your First MCP Server

Let's build a simple MCP server that connects to a company's internal API:

### Setup

```bash
npm init -y
npm install @modelcontextprotocol/sdk
npm install -D typescript @types/node
```

### Basic Server Structure

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

class CompanyDataServer {
  private server: Server;
  
  constructor() {
    this.server = new Server(
      {
        name: 'company-data-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );
    
    this.setupHandlers();
  }

  private setupHandlers() {
    // Resource handlers
    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      async () => ({
        resources: [
          {
            uri: 'company://employees',
            mimeType: 'application/json',
            name: 'Employee Directory',
            description: 'Company employee information'
          }
        ]
      })
    );

    // Tool handlers
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: [
          {
            name: 'search_employees',
            description: 'Search for employees by name or department',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
                department: { type: 'string' }
              },
              required: ['query']
            }
          }
        ]
      })
    );

    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        if (request.params.name === 'search_employees') {
          return await this.searchEmployees(request.params.arguments);
        }
        throw new Error(`Unknown tool: ${request.params.name}`);
      }
    );
  }

  private async searchEmployees(args: any) {
    // Implement your API call here
    const results = await fetch(`/api/employees?search=${args.query}`);
    const data = await results.json();
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new CompanyDataServer();
server.run().catch(console.error);
```

## Advanced Features

### Database Integration

Here's how to connect your MCP server to a PostgreSQL database:

```typescript
import { Pool } from 'pg';

class DatabaseMCPServer {
  private db: Pool;

  constructor() {
    this.db = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  private async queryDatabase(args: any) {
    const { query, params } = args;
    
    try {
      const result = await this.db.query(query, params || []);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.rows, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }
}
```

### File System Access

```typescript
private async readFile(args: any) {
  const { path } = args;
  
  try {
    const content = await fs.readFile(path, 'utf-8');
    return {
      content: [
        {
          type: 'text',
          text: content
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error reading file: ${error.message}`
        }
      ],
      isError: true
    };
  }
}
```

## Configuration and Security

### Claude Desktop Configuration

Add your MCP server to Claude Desktop's config file:

```json
{
  "mcpServers": {
    "company-data": {
      "command": "node",
      "args": ["path/to/your/server.js"],
      "env": {
        "DATABASE_URL": "postgresql://...",
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

### Security Best Practices

1. **Environment Variables**: Never hardcode secrets
2. **Input Validation**: Validate all tool parameters
3. **Rate Limiting**: Implement request throttling
4. **Access Control**: Restrict resource access as needed

```typescript
private validateInput(schema: any, input: any): boolean {
  // Implement JSON schema validation
  return true; // Simplified
}

private async callTool(request: any) {
  if (!this.validateInput(schema, request.params.arguments)) {
    throw new Error('Invalid input parameters');
  }
  
  // Rate limiting
  await this.rateLimiter.checkLimit(request.clientId);
  
  // Process request...
}
```

## Real-World Examples

### Customer Support Integration

I built an MCP server for a client that integrates with their customer support system:

- **Resources**: Access to ticket history, knowledge base articles
- **Tools**: Create tickets, update customer records, search FAQs
- **Results**: 60% reduction in support response time

### E-commerce Analytics

Another project involved connecting Claude to Shopify analytics:

- **Resources**: Sales data, inventory levels, customer metrics
- **Tools**: Generate reports, update product information
- **Results**: Automated daily reporting, improved decision-making

## Testing and Development

### Local Testing

```typescript
// test.ts
import { CompanyDataServer } from './server.js';

const server = new CompanyDataServer();

// Test tool calls
const testCall = {
  params: {
    name: 'search_employees',
    arguments: { query: 'john' }
  }
};

server.callTool(testCall)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Debugging Tips

1. **Logging**: Add comprehensive logging throughout your server
2. **Error Handling**: Always return user-friendly error messages
3. **Type Safety**: Use TypeScript for better development experience

## Deployment Strategies

### Local Development
- Run directly from your development machine
- Easy debugging and rapid iteration

### Server Deployment
- Deploy to cloud servers for team access
- Use process managers like PM2 for reliability

### Docker Containers
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
```

## Performance Optimization

### Caching Strategies

```typescript
class CacheableMCPServer {
  private cache = new Map();
  
  private async getCachedResource(uri: string) {
    if (this.cache.has(uri)) {
      return this.cache.get(uri);
    }
    
    const data = await this.fetchResource(uri);
    this.cache.set(uri, data);
    
    // Cache for 5 minutes
    setTimeout(() => this.cache.delete(uri), 5 * 60 * 1000);
    
    return data;
  }
}
```

### Connection Pooling

For database connections, always use connection pooling to optimize performance and resource usage.

## Future of MCP

The MCP ecosystem is rapidly evolving. Keep an eye on:

- **Multi-modal support**: Image and file handling
- **Streaming responses**: Real-time data updates  
- **Enhanced security**: OAuth integration, fine-grained permissions
- **Performance improvements**: Better caching and connection management

## Need Help Building MCP Servers?

I specialize in building custom MCP servers that integrate Claude Desktop with your specific business systems. From simple API connections to complex multi-source integrations, I can help you unlock the full potential of AI in your workflows.

[Contact me](/contact) to discuss your MCP server requirements.

---

*MCP servers open up endless possibilities for AI integration. Start with simple use cases and gradually build more sophisticated integrations as your needs evolve.*