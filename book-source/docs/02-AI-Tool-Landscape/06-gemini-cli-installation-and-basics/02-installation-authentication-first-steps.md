---
sidebar_position: 2
title: Installation, Authentication & First Steps
---

# Installation, Authentication & First Steps

> **A Word Before We Begin**
> 
> Installing Gemini CLI is like meeting a new colleague—someone who's available 24/7 to help with your work, answer questions, and solve problems. In this lesson, you'll install and launch Gemini CLI, which will then automatically guide you through authentication. You'll be up and running in minutes.


## Prerequisites: What You Need

Make sure you have these before starting:

| Requirement | What It Is | How to Check |
|------------|-----------|-------------|
| **Node.js 20+** | Runtime for JavaScript applications | Open terminal, type: `node --version` |
| **npm** | Package manager (comes with Node.js) | Open terminal, type: `npm --version` |
| **Internet connection** | For installation and Google authentication | You have this already ✓ |
| **Google account** | For secure authentication | Gmail, YouTube, or any Google account |

### Don't Have Node.js 20+?

1. Visit [nodejs.org](https://nodejs.org/en/download)
2. Download the **LTS version** (Long Term Support—the stable version)
3. Follow the installer steps for your operating system
4. When asked about npm, keep the checkbox checked
5. Restart your computer

### Opening Your Terminal

**Windows:** Search "PowerShell" in your Start menu and open it

**macOS:** Press Cmd+Space, type "Terminal", press Enter

**Linux:** Press Ctrl+Alt+T (most distributions)

---

## Installation Methods

There are three ways to install Gemini CLI, depending on your needs:

### Method 1: Global Installation (Recommended)

This installs Gemini CLI permanently on your system, making it available from any directory:

```bash
npm install -g @google/gemini-cli
```

This command downloads and installs Gemini CLI globally on your computer. You'll see text flowing by—this is normal. Wait for it to complete (usually takes 30-60 seconds).

**When to use**: When you plan to use Gemini CLI regularly across multiple projects.

### Method 2: Run Without Installing (npx)

You can run Gemini CLI without installing it permanently using `npx`:

```bash
npx @google/gemini-cli
```

This downloads and runs the latest version temporarily. Each time you run this command, it checks for the latest version.

**When to use**:
- When you want to try Gemini CLI without committing to installation
- When testing different versions
- On shared/temporary systems where you can't install globally

### Method 3: Install Specific Version

You can install a specific version or release tag:

```bash
# Install latest stable version explicitly
npm install -g @google/gemini-cli@latest

# Install preview/beta version
npm install -g @google/gemini-cli@preview

# Install nightly build (bleeding edge, may be unstable)
npm install -g @google/gemini-cli@nightly
```

**When to use**: When you need a specific version for compatibility or testing purposes.

### Verify Installation

After installation completes (or when using npx), verify it worked:

```bash
# If installed globally
gemini -v

# If using npx
npx @google/gemini-cli --version
```

You should see a version number like `0.4.0` or higher. If you see this, you're ready! ✓

---

## Authentication & First Launch

Now comes the magic—Gemini CLI handles authentication automatically. Simply type:

```bash
gemini
```

When you run this command for the first time, Gemini CLI launches and **automatically guides you through setup**:

### Step 1: Choose Your Theme

Gemini CLI will ask you to select a visual theme for the terminal interface. Choose whichever you prefer—this is just cosmetic. Use arrow keys to select and press Enter.

### Step 2: Choose Authentication Method

You'll see options for authentication:
- **Google login** (free tier: 60 requests/min, 1,000 requests/day)
- **Gemini API Key** (requires API setup)
- **Vertex AI** (requires Google Cloud Project)

**Select "Google login"** for the free tier. This is the beginner-friendly option.

### Step 3: Browser Opens

Your default web browser will automatically open with Google's login page. Simply:
1. Enter your Google account email
2. Enter your password
3. Click "Allow" when Google asks for permission

### Step 4: You're In!

After you authorize, your terminal displays the Gemini CLI interface. You'll see something like this:

```
 ███            █████████  ██████████ ██████   ██████ █████ ██████   █████ █████
░░░███         ███░░░░░███░░███░░░░░█░░██████ ██████ ░░███ ░░██████ ░░███ ░░███
  ░░░███      ███     ░░░  ░███  █ ░  ░███░█████░███  ░███  ░███░███ ░███  ░███
    ░░░███   ░███          ░██████    ░███░░███ ░███  ░███  ░███░░███░███  ░███
     ███░    ░███    █████ ░███░░█    ░███ ░░░  ░███  ░███  ░███ ░░██████  ░███
   ███░      ░░███  ░░███  ░███ ░   █ ░███      ░███  ░███  ░███  ░░█████  ░███
 ███░         ░░█████████  ██████████ █████     █████ █████ █████  ░░█████ █████
░░░            ░░░░░░░░░  ░░░░░░░░░░ ░░░░░     ░░░░░ ░░░░░ ░░░░░    ░░░░░ ░░░░░

Tips for getting started:
1. Ask questions, edit files, or run commands.
2. Be specific for the best results.
3. /help for more information.

╭────────────────────────────────────────────────────────────────────────╮
│ >   Type your message or @path/to/file                                 │
╰────────────────────────────────────────────────────────────────────────╯
 ~/Your/Current/Directory       no sandbox       auto
```

**What you see:**
- **Logo**: The "GEMINI" banner at the top
- **Tips**: Quick start guidance (3 tips)
- **Input Box**: Where you type your messages
- **Status Bar** (bottom):
  - Left: Current directory (your actual location)
  - Middle: Sandbox status (`no sandbox` by default)
  - Right: Mode (`auto` by default)

**Note**: You might also see:
- Context info like "Using: X context files" if you have GEMINI.md files
- "X MCP server" if you've configured MCP servers (covered in Lesson 7)
- Update notifications if a newer version is available
- Git branch info if you're in a git repository

**Update Notifications**: You may see a box suggesting updates—this is normal. You can update later with your package manager.

#### 💬 AI Colearning Prompt
> "Why does Gemini CLI use browser-based authentication instead of asking for a password directly in the terminal? What security advantages does this provide?"

---

## Understanding the Gemini CLI Interface

Now that you're inside Gemini CLI, let's understand what you're looking at:

### The Input Box

The main area where you interact:
```
╭────────────────────────────────────────────────────────────────────────╮
│ >   Type your message or @path/to/file                                 │
╰────────────────────────────────────────────────────────────────────────╯
```

- Type your questions or commands here
- Use `@path/to/file` to reference specific files
- Press Enter to send your message

### Status Bar (Bottom)

The status bar shows three important pieces of information:

```
 ~/Documents/development (main*)       no sandbox       auto
```

- **Left**: Current working directory and git branch
  - `~/Documents/development` = your location
  - `(main*)` = git branch (asterisk means uncommitted changes)
- **Middle**: Sandbox mode
  - `no sandbox` = not using containerized environment
  - `docker` or `gvisor` when sandbox is active
- **Right**: Tool execution mode
  - `auto` = Gemini automatically decides when to use tools
  - `manual` = You approve each tool use

### Context Information (When Configured)

Once you configure Gemini CLI (in later lessons), you'll see context information at startup:
```
Using: 2 context files | 1 MCP server
```

- **Context files**: GEMINI.md or CONTEXT.md files (covered in Lesson 5)
- **MCP servers**: Connected external tool servers (covered in Lesson 7)

**For first-time users**: This line won't appear until you add context files or MCP servers. That's normal!

### Slash Commands

Type these commands at the prompt:

- `/help` - See all available commands
- `/tools` - View available tools
- `/stats` - Session statistics
- `/memory show` - Display persistent context
- `/chat save <name>` - Save current conversation
- `/quit` - Exit Gemini CLI

**Shell Mode:**
- Type `!` followed by a command to run terminal commands
- Example: `!ls -la` to list files

#### 🎓 Expert Insight
> In AI-native development, you don't memorize commands like `/help` or `/tools`—you explore conversationally. If you forget a command, just ask: "What commands are available?" Your AI partner tells you. The skill isn't memorization; it's knowing how to ask.

---

## Your First Task with Gemini

Now that you're inside Gemini CLI, you're ready to put your AI collaborator to work. Simply type your question or request and press Enter:

```
Help me understand what artificial intelligence means
```

Gemini will respond with an explanation. That's it—you're using Gemini CLI!

---

## Understanding the Gemini CLI Session

When you run `gemini`, you're entering an interactive session. Inside this session, you have access to powerful commands and can ask Gemini multiple questions without exiting.

### Basic Session Commands

These slash commands work inside Gemini CLI:

- `/help` - See all available commands and shortcuts
- `/tools` - View all available tools Gemini can use
- `/stats` - See session statistics (tokens used, duration, etc.)
- `/quit` - Exit Gemini CLI and return to your terminal

### How to Exit Gemini

To exit Gemini CLI, simply type:

```
/quit
```

Or press **Ctrl+C twice** to force quit.

### Shell Mode (Running Terminal Commands)

You can run terminal commands directly inside Gemini without exiting:

- Type `!` to enter shell mode
- Run any terminal command
- Press **ESC** to exit shell mode and return to Gemini

#### 🤝 Practice Exercise

> **Ask your AI**: "I'm inside Gemini CLI for the first time. Walk me through: (1) checking what tools are available, (2) seeing session stats, and (3) asking you a test question about machine learning. Then explain what each command does."

**Expected Outcome**: You'll practice using `/tools`, `/stats`, and natural conversation while your AI explains each interaction—building familiarity through guided exploration.

---

## Real-World Workflow: Inside a Gemini Session

Here's what a typical session looks like:

**Step 1: Launch Gemini**
```bash
gemini
```

**Step 2: Inside the session, ask your first question**
```
Explain machine learning to me in simple terms with a real example
```

**Step 3: Gemini responds**
```
Machine learning is a method where computers learn from data...
[Gemini's detailed response]
```

**Step 4: Ask a follow-up question**
```
What are some real-world applications of machine learning?
```

**Step 5: Continue the conversation** (you can ask as many questions as you want)
```
How do companies use machine learning to recommend products?
```

**Step 6: When you're done, exit**
```
/quit
```

---

## Troubleshooting Common Issues

If you encounter problems, here are solutions to common issues:

### Issue 1: "npm: command not found"

**Problem**: You don't have Node.js installed or it's not in your PATH.

**Solution**:
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal after installation
3. Verify with `node --version`

### Issue 2: "EACCES: permission denied" (macOS/Linux)

**Problem**: npm doesn't have permission to install globally.

**Solution**:
```bash
# Option 1: Use sudo (requires admin password)
sudo npm install -g @google/gemini-cli

# Option 2: Configure npm to use a different directory (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @google/gemini-cli
```

### Issue 3: "Cannot find module" after installation

**Problem**: npm cache is corrupted.

**Solution**:
```bash
npm cache clean --force
npm install -g @google/gemini-cli
```

### Issue 4: Authentication fails or browser doesn't open

**Problem**: Browser not opening or OAuth flow not completing.

**Solution**:
1. Make sure your default browser is set
2. Try running `gemini` again
3. If browser still doesn't open, manually copy the URL shown in terminal
4. Check firewall settings aren't blocking the OAuth redirect

---

## Uninstalling Gemini CLI

If you need to uninstall Gemini CLI:

### Uninstall Global Installation

```bash
npm uninstall -g @google/gemini-cli
```

### Clear npx Cache

If you used `npx`, clear the cache:

**macOS/Linux:**
```bash
rm -rf "$(npm config get cache)/_npx"
```

**Windows PowerShell:**
```powershell
Remove-Item -Path (Join-Path $env:LocalAppData "npm-cache\_npx") -Recurse -Force
```

**Windows Command Prompt:**
```cmd
rmdir /s /q "%LocalAppData%\npm-cache\_npx"
```

### Complete Cleanup (Fresh Start)

For a complete uninstall and reinstall:

```bash
# Uninstall
npm uninstall -g @google/gemini-cli

# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @google/gemini-cli
```

---

## Try With AI

Now that you've installed Gemini CLI, try these prompts to explore what your AI collaborator can do.

### Prompt 1: Learn a New Concept
```
Explain machine learning to me in simple terms with a real example. Then give me 3 real-world applications of machine learning.
```

**Expected outcome**: Clear explanation with concrete examples and practical applications you can understand.

### Prompt 2: Write Professional Content
```
Write a professional email to my manager about my project status. The project is [describe your situation]. Make it concise and positive.
```

**Expected outcome**: Well-structured professional email you can use or adapt.

### Prompt 3: Problem Solving
```
I'm getting an error when I try to install a package. The error message is: [paste error]. What does it mean and how do I fix it?
```

**Expected outcome**: Clear explanation of the error and step-by-step solution.

### Prompt 4: Plan and Organize
```
I want to learn programming. What programming language should I start with and why? Give me a 4-week learning plan with specific goals for each week.
```

**Expected outcome**: Personalized learning recommendation with structured plan you can follow immediately.

