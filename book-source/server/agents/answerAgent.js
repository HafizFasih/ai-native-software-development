const { GoogleGenerativeAI } = require('@google/generative-ai');
const { BrowserSearch } = require('../utils/browserSearch');

class AnswerAgent {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    this.browserSearch = new BrowserSearch();
  }

  async generateAnswer({ query, structuredQuery, toneResult, projectContext, conversationHistory }) {
    try {
      let contextToUse = projectContext.content || '';
      let usedBrowserSearch = false;
      let externalInfo = '';

      // If out-of-tone, perform browser search but relate back to project
      if (!toneResult.isInTone && toneResult.confidence < 0.5) {
        console.log('Query is out-of-tone, performing browser search...');
        externalInfo = await this.browserSearch.search(query, {
          projectDomain: 'AI Native Software Development',
          projectTopics: ['AI-driven development', 'Python', 'TypeScript', 'Agentic AI', 'Spec-driven development']
        });
        usedBrowserSearch = true;
      }

      // Build conversation history context
      const historyContext = conversationHistory
        .slice(-5) // Last 5 messages
        .map(msg => `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`)
        .join('\n');

      const systemPrompt = `You are an intelligent AI assistant for the "AI Native Software Development" book and documentation platform.

PROJECT CONTEXT:
This is a comprehensive book and learning platform about:
- AI-Driven Development (AIDD) and AI-Native Development
- Python programming for AI agents
- TypeScript for realtime and interaction layers
- Spec-Driven Development methodology
- OpenAI Agents SDK, Google Gemini, MCP (Model Context Protocol)
- Building agentic AI systems, realtime agents, voice agents
- Containerization, orchestration, event-driven architectures

Your role is to:
1. Answer questions based on the project's codebase, documentation, and content
2. Provide accurate, helpful, and contextually relevant answers
3. When information is not in the project, use external knowledge but relate it back to the project's domain
4. Be conversational, clear, and educational

${toneResult.isInTone 
  ? 'This query is RELATED to the project context. Use the provided project context to answer.'
  : 'This query is LESS RELATED to the project. Use external information but connect it back to AI Native Software Development concepts when possible.'
}

PROJECT CONTEXT DATA:
${contextToUse || 'No specific project context found for this query.'}

${externalInfo ? `\nEXTERNAL INFORMATION (for context):\n${externalInfo}\n\nRemember to relate this back to the project domain when relevant.` : ''}

${historyContext ? `\nCONVERSATION HISTORY:\n${historyContext}\n` : ''}

STRUCTURED QUERY ANALYSIS:
- Intent: ${structuredQuery.intent}
- Topics: ${structuredQuery.topics.join(', ') || 'General'}
- Complexity: ${structuredQuery.complexity}
- Expected Response: ${structuredQuery.expectedResponseType}

Now, provide a helpful, accurate answer to the user's query: "${query}"

Format your response naturally and conversationally. If you reference external information, explain how it relates to AI Native Software Development.`;

      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const answerText = response.text();

      // Extract sources if mentioned
      const sources = this.extractSources(answerText, projectContext);

      return {
        text: answerText,
        sources,
        usedBrowserSearch
      };
    } catch (error) {
      console.error('Error in AnswerAgent:', error);
      throw new Error(`Failed to generate answer: ${error.message}`);
    }
  }

  extractSources(text, projectContext) {
    const sources = [];
    
    // Check if project context has file references
    if (projectContext.files && projectContext.files.length > 0) {
      projectContext.files.slice(0, 3).forEach(file => {
        if (file.path) {
          sources.push({
            type: 'project_file',
            path: file.path,
            title: file.title || file.path
          });
        }
      });
    }

    return sources;
  }
}

module.exports = { AnswerAgent };

