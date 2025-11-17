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

  getSummaryFilePath(pagePath) {
    // Convert page path to a safe filename
    // e.g., "docs/01-Introducing-AI-Driven-Development/01-ai-development-revolution/readme.md"
    // becomes "01-Introducing-AI-Driven-Development__01-ai-development-revolution__readme.json"
    const sanitized = pagePath
      .replace(/^docs\//, '') // Remove leading "docs/"
      .replace(/\//g, '__')    // Replace / with __
      .replace(/\.md$/, '')    // Remove .md extension
      + '.json';

    return path.join(this.summaryDir, sanitized);
  }

  async getSummary(pagePath) {
    try {
      await this.ensureSummaryDirectory();
      const filePath = this.getSummaryFilePath(pagePath);

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

  async saveSummary(pagePath, summary) {
    try {
      await this.ensureSummaryDirectory();
      const filePath = this.getSummaryFilePath(pagePath);

      const data = {
        pagePath,
        summary,
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

  async generateSummary(pagePath, pageTitle) {
    try {
      // Check if summary already exists
      const existingSummary = await this.getSummary(pagePath);
      if (existingSummary) {
        console.log(`Summary already exists for ${pagePath}, returning cached version`);
        return existingSummary;
      }

      // Read the raw markdown file from filesystem
      const pageContent = await this.readMarkdownFile(pagePath);

      const prompt = `Create a comprehensive, well-structured summary of the following page content.

REQUIREMENTS:
1. Maximum length: 500 words
2. The first line MUST be: # ${pageTitle}
3. After the title, structure the summary with clear sections using markdown headings (##, ###)
4. Focus on key concepts, main ideas, and actionable takeaways
5. Use bullet points for lists and important points
6. Maintain technical accuracy and clarity
7. Make it readable and scannable
8. Do NOT include any meta-commentary (like "This page discusses..." or "The content covers...")
9. Summarize ONLY the content below, nothing else
10. Start the summary content immediately after the title

PAGE CONTENT:
${pageContent}

Generate the summary now (remember to start with # ${pageTitle}):`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const summary = response.text();

      // Save the generated summary
      await this.saveSummary(pagePath, summary);

      console.log(`✓ Generated and saved summary for ${pagePath}`);

      return summary;
    } catch (error) {
      console.error('Error generating summary with Gemini:', error);
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
  }
}

const summaryService = new SummaryService();

async function generateSummary(pagePath, pageTitle) {
  return await summaryService.generateSummary(pagePath, pageTitle);
}

async function getSummary(pagePath) {
  return await summaryService.getSummary(pagePath);
}

module.exports = { generateSummary, getSummary, SummaryService };
