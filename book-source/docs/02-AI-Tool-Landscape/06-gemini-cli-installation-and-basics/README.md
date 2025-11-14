---
sidebar_position: 6
title: "Chapter 6: Google Gemini CLI: Open Source and Everywhere"
---

# Chapter 6: Google Gemini CLI: Open Source and Everywhere

Google didn't just follow—they went big. Gemini CLI is fully open source under Apache 2.0 license, bringing the power of Gemini directly into developers' terminals with built-in tools for Google Search grounding, file operations, shell commands, and web fetching.

What makes Gemini CLI particularly compelling is its accessibility. Developers get 60 model requests per minute and 1,000 requests per day at no charge simply by logging in with a personal Google account. That's roughly double the average number of requests developers typically make, according to Google.

This chapter isn't about replacing Claude Code. It's about understanding **when to use each tool** and building the judgment to choose the right AI assistant for every development scenario you encounter.

By the end of this chapter, you'll have two powerful AI development tools at your command, each suited to different workflows and challenges.

## Chapter Structure: 8 Lessons (137-150 minutes total)

### Foundation Tier (Lessons 1-3: Understanding & Setup)
- **Lesson 1: Why Gemini CLI Matters** (15 min) - Positioning, free tier advantages, ecosystem
- **Lesson 2: Installation, Authentication & First Steps** (15 min) - Platform-specific setup, OAuth flow, troubleshooting
- **Lesson 3: Built-In Tools Deep Dive** (20-25 min) - File operations, shell, web fetch, search grounding

### Configuration Tier (Lessons 4-5: Customization & Management)
- **Lesson 4: Configuration & Settings** (15-17 min) - 7-level hierarchy, .env files, security
- **Lesson 5: Memory & Context Management** (18-20 min) - Context management, `/clear`, `/compress`, GEMINI.md

### Extension Tier (Lessons 6-8: Capability Expansion)
- **Lesson 6: Custom Slash Commands** (16-18 min) - TOML, injection patterns, namespacing
- **Lesson 7: MCP Servers & Integration** (20 min) - CLI commands, OAuth, workflows
- **Lesson 8: Extensions, Security & IDE Integration** (18-20 min) - Extension lifecycle, tool filtering, IDE

## Learning Outcomes

By completing this chapter, you'll be able to:

- **Install and verify Gemini CLI** on Windows, macOS, and Linux
- **Authenticate securely** using OAuth with free tier understanding (60 req/min, 1000 req/day)
- **Master built-in tools**: File ops, shell, web fetch, search grounding
- **Configure Gemini CLI** using 7-level hierarchy with environment settings
- **Manage context** using `/clear`, `/compress`, `/chat` commands
- **Create custom commands** with TOML and injection patterns
- **Connect MCP servers** (Playwright, Context7, custom) using CLI
- **Build and secure extensions** with tool filtering and IDE integration
- **Choose the right tool** for different development scenarios

## Key Concepts

**Context Window**: Gemini CLI offers 1M tokens (~750K words or 100K lines of code)

**Configuration Hierarchy**: 7-level precedence (CLI flags override everything down to system settings)

**MCP**: Open standard connecting AI to external capabilities (browsers, APIs, databases)

**Custom Commands**: Reusable prompts with `{{args}}`, `!{shell}`, `@{file}` injection

**Extensions**: Pre-configured bundles of MCP servers, commands, and context

## Chapter Verification Checklist

By the end, verify you can:

- [ ] Install Gemini CLI and run `gemini -v`
- [ ] Use `/help` and built-in commands
- [ ] Create custom commands with injection patterns
- [ ] Add MCP servers with `gemini mcp add`
- [ ] Configure project settings with `.env`
- [ ] Use `/chat save` and `/chat resume`
- [ ] Enable IDE integration in VS Code
- [ ] Explain tool filtering concepts
- [ ] Evaluate tool selection based on project requirements


