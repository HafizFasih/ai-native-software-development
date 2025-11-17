require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { chatRouter } = require('./routes/chat');
const { summaryRouter } = require('./routes/summary');
const { assessmentRouter } = require('./routes/assessment');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' })); // Increase limit for page content

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chatbot API is running' });
});

// API routes
app.use('/api/chat', chatRouter);
app.use('/api/assessment', assessmentRouter);

// Summary routes
app.use('/api/summary', summaryRouter);

app.listen(PORT, () => {
  console.log(`🚀 Chatbot API server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure to set GEMINI_API_KEY in your .env file`);
});

