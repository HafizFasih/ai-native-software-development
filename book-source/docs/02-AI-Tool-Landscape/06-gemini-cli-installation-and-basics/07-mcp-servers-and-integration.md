---
sidebar_position: 7
title: MCP Servers & Integration
---

# MCP Servers & Integration

**Duration**: 20 minutes

So far, you've used Gemini CLI with built-in tools (file operations, shell, web fetching, search). But what if you need to connect to external systems—like your company database, a specialized API, or advanced browser automation?

That's what **MCP** (Model Context Protocol) does. It's the standard way Gemini CLI connects to the outside world.

---

## Part 1: Understanding MCP

### What Is MCP?

**MCP** stands for **Model Context Protocol**—a standard that lets AI tools safely connect to external capabilities.

Think of it like **electrical outlets**:
- Your AI (Gemini CLI) has power but limited reach
- Outlets (MCP) are the standard connection points
- External tools (databases, APIs, browsers) plug in safely
- Power flows through a standardized, secure interface

### MCP Server vs Built-In Tools

**Built-in tools** (Lesson 3):
- File reading (what's on your computer)
- Shell execution (run local commands)
- Web fetching (simple HTTP requests)
- Search (Google Search results)

**MCP servers** provide:
- Advanced browser automation (Playwright)
- Real-time documentation access (Context7)
- Database connections
- Custom APIs
- Specialized capabilities

### Real-World Example

**Scenario**: You need to analyze 10 competitor websites for pricing.

**Without MCP**:
1. Fetch each URL individually (10 web fetch requests)
2. Manually navigate to pricing pages
3. Copy-paste prices
4. Create spreadsheet manually
5. Time: 1-2 hours

**With Playwright MCP**:
1. Tell Gemini to browse 10 competitor sites
2. Playwright navigates automatically, clicks buttons, extracts pricing
3. Gemini creates comparison table
4. Time: 5-10 minutes

---

## Part 2: CLI MCP Management Commands

The modern way to add MCP servers is **CLI commands**—not manual JSON editing.

### Adding MCP Servers

```bash
# Add stdio MCP server (local Python/Node.js)
gemini mcp add my-server python server.py --port 8080

# Add HTTP MCP server (remote API)
gemini mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer abc123"

# Add SSE MCP server (streaming)
gemini mcp add --transport sse events-api https://api.example.com/sse
```

**Transport types**:
- **Stdio**: Local process (Python script, Node.js server)
- **HTTP**: Remote HTTP server
- **SSE**: Server-Sent Events (real-time streaming)

### Listing MCP Servers

```bash
gemini mcp list
```

**Output**:
```
Connected MCP Servers:
- playwright (stdio) - connected
- context7 (http) - connected
- my-database (stdio) - connecting...
```

Shows status (connected/disconnected/connecting).

### Removing MCP Servers

```bash
gemini mcp remove server-name
```

Removes the server from your configuration.

### CLI vs Manual Configuration

**CLI approach** (recommended for beginners):
```bash
gemini mcp add playwright npx @playwright/mcp@latest
```

Simple, clear, immediate feedback.

**Manual JSON editing** (advanced):
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

More control, but error-prone for beginners. Lesson 4 covered configuration files if you need them.

---

## Part 3: OAuth for MCP Servers

Some MCP servers need **authentication**—API keys, cloud credentials, or OAuth tokens. Gemini CLI handles this automatically.

### Why OAuth Matters

**Problem**: External APIs need credentials to verify you.
- Database API key
- Google Drive access token
- Cloud service authentication

**Solution**: OAuth lets you authenticate securely without exposing secrets.

### Using OAuth: `/mcp auth`

```bash
/mcp auth
```

Lists servers that need authentication.

```bash
/mcp auth my-database-server
```

Authenticates with specific server:
1. Browser opens to OAuth provider (Google, GitHub, etc.)
2. You log in
3. Tokens stored automatically in `~/.gemini/mcp-oauth-tokens.json`
4. Tokens auto-refresh when needed

**Key point**: You never manage tokens manually. Gemini CLI handles it.

### When to Use OAuth

**You need OAuth when**:
- MCP server accesses user's Google Drive
- API requires authentication (GitHub, Stripe, etc.)
- Cloud service needs credentials
- Database access is controlled

**You don't need OAuth when**:
- Public APIs (most web browsing)
- Local tools (no external access)
- Open documentation (Context7)

---

## Part 4: Business Workflows

### Workflow 1: Competitive Research (Playwright)

**Goal**: Compare 5 competitors' pricing and features.

**Setup**:
```bash
gemini mcp add playwright npx @playwright/mcp@latest
```

**Prompt**:
```
Use the Playwright MCP server to analyze these 5 competitors:
1. https://competitor-a.com
2. https://competitor-b.com
3. https://competitor-c.com
4. https://competitor-d.com
5. https://competitor-e.com

For each site:
- Find their pricing page
- Extract all pricing tiers
- List key features per tier
- Note any current promotions

Create a comparison table.
```

**Result**: Structured competitive intelligence in minutes.

### Workflow 2: API Documentation Research (Context7)

**Goal**: Understand a new API before integration.

**Setup**:
```bash
gemini mcp add context7 npx -y @upstash/context7-mcp
```

**Prompt**:
```
Use Context7 to research Stripe's API:
1. What are the main endpoints?
2. What's the authentication method?
3. What are rate limits?
4. What's the most recent major version change?
5. Are there breaking changes I should know about?

Give me a summary suitable for a technical decision-maker.
```

**Result**: Current, accurate documentation without manually reading docs.

### Workflow 3: Multi-Tool Combination

**Goal**: Analyze market trends across multiple sources.

```
1. Use Playwright to browse 5 market research sites
2. Use shell to analyze local data files
3. Use Context7 to fetch industry documentation
4. Compile a market analysis report

Combine all three MCP capabilities in one workflow.
```

**Key insight**: MCP servers chain together. One prompt can use multiple capabilities.

---

## Red Flags to Watch

### "MCP server connection failed"
- Check server is running: `gemini mcp list`
- Verify command syntax: `gemini mcp add --help`
- Try manual configuration (Lesson 4 covers `settings.json`)

### "Authentication failed: Invalid token"
- Re-authenticate: `/mcp auth server-name`
- Check browser OAuth flow completed
- Verify no extra spaces in configuration

### "Playwright timeout: Browser not responding"
- Website may be slow or blocking automation
- Try shorter timeout: Check Lesson 4 configuration
- Test website manually first

### "Context7 not finding documentation"
- Verify MCP server connected: `gemini mcp list`
- Search term may not match indexed docs
- Try more specific queries

---

## Try With AI

### Prompt 1: Setting Up Your First MCP Server
```
I want to add the Playwright MCP server to browse websites.
Walk me through:
1. Exact command to add it
2. How to verify it's working
3. A test prompt to make sure it's connected
4. What to do if the connection fails
```

**Expected outcome**: Step-by-step setup with verification commands.

### Prompt 2: Choosing the Right MCP Server
```
I have this business need: [describe your need]

Examples:
- "Research 20+ competitor websites"
- "Stay current with API documentation"
- "Access our company database"

Which MCP server should I use? Why? How do I set it up?
```

**Expected outcome**: Specific recommendation with setup instructions.

### Prompt 3: Multi-Tool Workflow Design
```
I need to combine multiple MCP servers for this task: [describe]

Design a workflow that uses:
1. Which MCP servers? (Playwright, Context7, custom, etc.)
2. In what order?
3. How do they work together?
4. What's the exact prompt I give you?
5. What's the expected output?
```

**Expected outcome**: Complete workflow architecture.

### Prompt 4: Troubleshooting MCP Issues
```
I'm getting this error: [your error message]

After running: [your command]

Debug this for me. What's wrong? How do I fix it?
```

**Expected outcome**: Specific debugging steps for your error.

---

## Summary

MCP (Model Context Protocol) is **the bridge between Gemini CLI and the outside world**.

**Three transport types**:
- **Stdio**: Local tools (Python, Node.js)
- **HTTP**: Remote APIs
- **SSE**: Real-time streaming

**Key commands**:
- `gemini mcp add` - Connect new server
- `gemini mcp list` - View connected servers
- `gemini mcp remove` - Disconnect server
- `/mcp auth` - Handle OAuth authentication

**Real-world benefits**:
- Competitive research (Playwright)
- Current documentation (Context7)
- Database access
- Custom integrations

**Compared to Lesson 4 (Configuration)**:
- Lesson 4: How to configure Gemini CLI globally
- Lesson 7: How to extend Gemini CLI with external capabilities

---

## Next Lesson

**Lesson 8: Extensions, Security & IDE Integration** teaches you how to bundle MCP servers into extensions, filter tool access for security, and integrate with your IDE for seamless development.
