# mcp-shakespeare-insult

shakespeare-insult MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `shakespeare_insult_generate` | Generate a Shakespearean insult. Classical mode (no target) uses authentic vocabulary. Targeted mode uses Haiku for bespoke devastation. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "shakespeare-insult": {
      "url": "https://gateway.pipeworx.io/shakespeare-insult/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use shakespeare-insult
```

## License

MIT
