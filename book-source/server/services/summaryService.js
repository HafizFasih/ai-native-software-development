const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

class SummaryService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    this.summaryDir = path.join(__dirname, '../../summary');
  }

  async ensureSummaryDirectory() {
    try {
      await fs.mkdir(this.summaryDir, { recursive: true });
    } catch (error) {
      console.error('Error creating summary directory:', error);
    }
  }

  getSummaryFilePath(pagePath, size = 'medium') {
    // Convert page path to a safe filename
    // e.g., "docs/01-Introducing-AI-Driven-Development/01-ai-development-revolution/readme.md"
    // becomes "01-Introducing-AI-Driven-Development__01-ai-development-revolution__readme__medium.json"
    const sanitized = pagePath
      .replace(/^docs\//, '') // Remove leading "docs/"
      .replace(/\//g, '__')    // Replace / with __
      .replace(/\.md$/, '')    // Remove .md extension
      + `__${size}.json`;

    return path.join(this.summaryDir, sanitized);
  }

  async getSummary(pagePath, size = 'medium') {
    try {
      await this.ensureSummaryDirectory();
      const filePath = this.getSummaryFilePath(pagePath, size);

      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      return data.summary;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return null
        return null;
      }
      throw error;
    }
  }

  async saveSummary(pagePath, summary, size = 'medium') {
    try {
      await this.ensureSummaryDirectory();
      const filePath = this.getSummaryFilePath(pagePath, size);

      const data = {
        pagePath,
        summary,
        size,
        generatedAt: new Date().toISOString()
      };

      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

      return true;
    } catch (error) {
      console.error('Error saving summary:', error);
      throw error;
    }
  }

  async readMarkdownFile(pagePath) {
    try {
      // pagePath is like "docs/01-Introducing-AI-Driven-Development/01-ai-development-revolution/readme.md"
      const fullPath = path.join(__dirname, '../../', pagePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error reading markdown file:', error);
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  async generateSummary(pagePath, pageTitle, size = 'short') {
    try {
      console.log('\n🎯 [Service] generateSummary called with:', {
        pagePath,
        pageTitle,
        size,
      });

      // Map size to format configurations
      const sizeConfig = {
        bulleted: {
          format: 'bulleted',
          instruction: 'Provide a concise bulleted list summary with the most important points. Keep each bullet point brief and focused. Use markdown bullet points (-).',
          wordLimit: null,
          example: '- Key concept one explained concisely\n- Important point two with context\n- Critical takeaway three\n- Additional insight four'
        },
        short: {
          format: 'paragraph',
          instruction: 'Provide a short paragraph summary of up to 200 words covering the key points and main takeaways.',
          wordLimit: 200,
          example: 'This technology revolutionizes software development through AI collaboration. It enables faster iteration and better code quality. Developers write specifications first before generating code. The approach reduces errors and improves maintainability.'
        },
        long: {
          format: 'paragraph',
          instruction: 'Provide a comprehensive paragraph summary of up to 400 words covering all important concepts, details, and implications.',
          wordLimit: 400,
          example: 'This technology revolutionizes software development through AI collaboration. It enables faster iteration and better code quality. Developers write specifications first before generating code. The approach reduces errors and improves maintainability. Teams can scale development while maintaining high standards. The methodology has proven effective across various project sizes. Implementation involves careful planning and execution. Results demonstrate significant productivity improvements.'
        }
      };

      const config = sizeConfig[size] || sizeConfig['short'];

      console.log('⚙️ [Service] Using config:', {
        size,
        format: config.format,
        wordLimit: config.wordLimit,
      });

      // Check if summary already exists for this size
      const existingSummary = await this.getSummary(pagePath, size);
      if (existingSummary) {
        console.log(`✅ [Service] Summary already exists for ${pagePath} (${size}), returning cached version`);
        const stats = config.format === 'bulleted'
          ? `${this.countBulletPoints(existingSummary)} bullet points`
          : `${this.countWords(existingSummary)} words`;
        console.log(`📊 [Service] Cached summary has ${stats}`);
        return existingSummary;
      }

      console.log('🆕 [Service] No cache found, generating new summary...');

      // Read the raw markdown file from filesystem
      const pageContent = await this.readMarkdownFile(pagePath);

      // Generate format-specific prompt
      const prompt = config.format === 'bulleted'
        ? `You are a summarization expert. Create a concise bulleted list summary.

===== CRITICAL RULES (MUST FOLLOW) =====

1. OUTPUT FORMAT:
   - Use markdown bullet points (- ) ONLY
   - Each bullet should be on its own line
   - Start each line with "- " (dash space)
   - 4-6 bullet points maximum
   - Each bullet point should be concise and focused
   - NO headings, NO numbered lists, NO other formatting

2. BULLET POINT STRUCTURE:
   - Keep each bullet under 25 words
   - Focus on key concepts and takeaways
   - Professional and clear language
   - Direct statements (no fluff)

3. EXAMPLE OUTPUT FORMAT:
"${config.example}"

4. CONTENT RULES:
   - Extract the most important information
   - No meta-commentary about the content
   - No introductory or closing statements
   - Professional tone

===== PAGE CONTENT TO SUMMARIZE =====
${pageContent}

===== YOUR TASK =====
${config.instruction}
Output ONLY the bulleted list, nothing else.

OUTPUT (bulleted list):`
        : `You are a summarization expert. Create a ${config.wordLimit}-word paragraph summary.

===== CRITICAL RULES (MUST FOLLOW) =====

1. OUTPUT FORMAT:
   - Plain text paragraph ONLY
   - NO markdown (#, ##, *, -, etc.)
   - NO bullet points or lists
   - NO tables, NO code blocks
   - Just flowing sentences with periods

2. WORD LIMIT (MOST IMPORTANT):
   - Maximum ${config.wordLimit} words
   - Count every word before submitting
   - Better to be slightly under than over

3. EXAMPLE OUTPUT:
"${config.example}"

4. CONTENT RULES:
   - Focus on key concepts and main points
   - No meta-commentary
   - Professional tone
   - Clear and concise
   - Logical flow between sentences

===== PAGE CONTENT TO SUMMARIZE =====
${pageContent}

===== YOUR TASK =====
${config.instruction}
Output ONLY the paragraph summary, nothing else.

OUTPUT (up to ${config.wordLimit} words):`;

      console.log('🤖 [Service] Calling Gemini AI...');

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      let summary = response.text().trim();

      console.log('📝 [Service] Raw AI response length:', summary.length);
      console.log('📝 [Service] Raw AI response preview:', summary.substring(0, 200) + '...');

      // Process based on format
      if (config.format === 'bulleted') {
        // For bulleted format, preserve markdown bullets but clean up
        summary = this.cleanBulletedSummary(summary);
        const bulletCount = this.countBulletPoints(summary);
        console.log(`📊 [Service] Bulleted summary has ${bulletCount} bullet points`);
        console.log('✅ [Service] Final summary:', summary);
      } else {
        // For paragraph format, strip markdown and enforce word limit
        summary = this.stripMarkdown(summary);
        console.log('🧹 [Service] After markdown strip length:', summary.length);

        const beforeEnforce = this.countWords(summary);
        summary = this.enforceWordLimit(summary, config.wordLimit);
        const afterEnforce = this.countWords(summary);

        console.log(`📊 [Service] Word count: ${beforeEnforce} → ${afterEnforce} (limit: ${config.wordLimit})`);
        console.log('✅ [Service] Final summary:', summary);
      }

      // Save the generated summary
      await this.saveSummary(pagePath, summary, size);

      const stats = config.format === 'bulleted'
        ? `${this.countBulletPoints(summary)} bullet points`
        : `${this.countWords(summary)} words`;
      console.log(`✓ Generated and saved ${size} summary (${stats}) for ${pagePath}`);

      return summary;
    } catch (error) {
      console.error('Error generating summary with Gemini:', error);
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
  }

  stripMarkdown(text) {
    let clean = text;

    // Remove headings (# ## ###)
    clean = clean.replace(/^#+\s+/gm, '');

    // Remove bold/italic (** __ * _)
    clean = clean.replace(/(\*\*|__)(.*?)\1/g, '$2');
    clean = clean.replace(/(\*|_)(.*?)\1/g, '$2');

    // Remove bullet points (- * +)
    clean = clean.replace(/^[\s]*[-*+]\s+/gm, '');

    // Remove numbered lists (1. 2. etc)
    clean = clean.replace(/^\d+\.\s+/gm, '');

    // Remove code blocks (``` or `)
    clean = clean.replace(/`{3}[\s\S]*?`{3}/g, '');
    clean = clean.replace(/`([^`]+)`/g, '$1');

    // Remove links [text](url)
    clean = clean.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // Remove tables
    clean = clean.replace(/\|.*\|/g, '');
    clean = clean.replace(/^\|.*$/gm, '');

    // Remove multiple newlines
    clean = clean.replace(/\n{2,}/g, ' ');

    // Remove extra whitespace
    clean = clean.replace(/\s+/g, ' ');

    return clean.trim();
  }

  countSentences(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.length;
  }

  enforceSentenceCount(text, targetCount) {
    // Split by sentence-ending punctuation (., !, ?)
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

    // Remove empty or whitespace-only sentences
    const validSentences = sentences
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Truncate to target count if too long
    if (validSentences.length > targetCount) {
      return validSentences.slice(0, targetCount).join(' ');
    }

    // Return as-is if correct count or too short (we trust AI for correct generation)
    return validSentences.join(' ');
  }

  countWords(text) {
    // Split by whitespace and filter out empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  enforceWordLimit(text, maxWords) {
    const words = text.trim().split(/\s+/);

    if (words.length <= maxWords) {
      return text;
    }

    // Truncate to word limit
    const truncated = words.slice(0, maxWords);
    let result = truncated.join(' ');

    // Ensure it ends with proper punctuation
    if (!/[.!?]$/.test(result)) {
      result += '.';
    }

    return result;
  }

  countBulletPoints(text) {
    // Count lines that start with "- " (markdown bullets)
    const bullets = text.split('\n').filter(line => line.trim().startsWith('- '));
    return bullets.length;
  }

  cleanBulletedSummary(text) {
    // Split into lines and process each
    const lines = text.split('\n');
    const cleanedLines = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) continue;

      // Ensure line starts with "- "
      if (trimmed.startsWith('- ')) {
        cleanedLines.push(trimmed);
      } else if (trimmed.startsWith('-')) {
        // Fix missing space after dash
        cleanedLines.push('- ' + trimmed.substring(1).trim());
      } else if (trimmed.startsWith('* ')) {
        // Convert asterisk to dash
        cleanedLines.push('- ' + trimmed.substring(2));
      } else if (trimmed.startsWith('•')) {
        // Convert bullet character to dash
        cleanedLines.push('- ' + trimmed.substring(1).trim());
      } else {
        // Line doesn't start with bullet marker - add one
        cleanedLines.push('- ' + trimmed);
      }
    }

    return cleanedLines.join('\n');
  }
}

const summaryService = new SummaryService();

async function generateSummary(pagePath, pageTitle, size = 'short') {
  return await summaryService.generateSummary(pagePath, pageTitle, size);
}

async function getSummary(pagePath, size = 'short') {
  return await summaryService.getSummary(pagePath, size);
}

module.exports = { generateSummary, getSummary, SummaryService };
