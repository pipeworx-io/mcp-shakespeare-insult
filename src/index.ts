interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * shakespeare-insult MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Generate a Shakespearean insult. Classical mode (no target) uses authentic vocab
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'shakespeare_insult_generate',
    description: 'Generate a Shakespearean insult. Classical mode (no target) uses authentic vocabulary. Targeted mode uses Haiku for bespoke devastation.',
    inputSchema: {
      type: 'object' as const,
      properties: {"target": {"type": "string", "description": "Target for a bespoke insult. Omit for classical random."}, "severity": {"type": "string", "enum": ["mild", "medium", "devastating", "nuclear"]}, "recipient": {"type": "string", "enum": ["colleague", "ex", "traffic", "software", "abstract_concept", "the_universe"]}, "translate": {"type": "boolean", "description": "Include modern English translation"}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('shakespeare-insult API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'shakespeare_insult_generate':
      return callApi('https://api.stupidapis.com/shakespeare-insult/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
