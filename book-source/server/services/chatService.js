const { JSONConversionAgent } = require('../agents/jsonConversionAgent');
const { AnswerAgent } = require('../agents/answerAgent');
const { ToneTester } = require('../agents/toneTester');
const { ProjectContextIndexer } = require('../utils/projectContextIndexer');

class ChatService {
  constructor() {
    this.jsonAgent = new JSONConversionAgent();
    this.answerAgent = new AnswerAgent();
    this.toneTester = new ToneTester();
    this.contextIndexer = new ProjectContextIndexer();
  }

  async processMessage(message, conversationHistory) {
    try {
      // Optimize: Run context indexing and quick tone check in parallel for faster response
      const [projectContext, quickToneCheck] = await Promise.all([
        this.contextIndexer.getRelevantContext(message),
        Promise.resolve(this.toneTester.quickToneCheck(message)) // Quick synchronous check
      ]);
      
      // Use quick tone check if confidence is high, otherwise do full AI check
      let toneResult = quickToneCheck;
      if (quickToneCheck.confidence < 0.7) {
        // Only do full AI-based tone check if quick check is uncertain
        toneResult = await this.toneTester.testTone(message, projectContext);
      }
      
      // Convert query to structured format
      const structuredQuery = await this.jsonAgent.convertQuery(message, {
        isInTone: toneResult.isInTone,
        confidence: toneResult.confidence,
        projectContext: projectContext.summary
      });
      
      // Generate answer using Answer Agent
      const answer = await this.answerAgent.generateAnswer({
        query: message,
        structuredQuery,
        toneResult,
        projectContext,
        conversationHistory
      });
      
      return {
        message: answer.text,
        isInTone: toneResult.isInTone,
        confidence: toneResult.confidence,
        sources: answer.sources || [],
        metadata: {
          structuredQuery,
          usedBrowserSearch: answer.usedBrowserSearch || false
        }
      };
    } catch (error) {
      console.error('Error in ChatService.processMessage:', error);
      throw error;
    }
  }
}

const chatService = new ChatService();

async function processChatMessage(message, conversationHistory) {
  return await chatService.processMessage(message, conversationHistory);
}

module.exports = { processChatMessage, ChatService };

