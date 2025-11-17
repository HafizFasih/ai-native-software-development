const express = require('express');
const { generateSummary, getSummary } = require('../services/summaryService');

const router = express.Router();

// Generate summary for a specific page
router.post('/generate', async (req, res) => {
  try {
    const { pagePath, pageTitle } = req.body;

    if (!pagePath || typeof pagePath !== 'string') {
      return res.status(400).json({
        error: 'pagePath is required and must be a string'
      });
    }

    if (!pageTitle || typeof pageTitle !== 'string') {
      return res.status(400).json({
        error: 'pageTitle is required and must be a string'
      });
    }

    const summary = await generateSummary(pagePath, pageTitle);

    res.json({
      success: true,
      summary,
      pagePath
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      error: 'Failed to generate summary',
      message: error.message
    });
  }
});

// Check if summary exists for a page
router.get('/check', async (req, res) => {
  try {
    const { pagePath } = req.query;

    if (!pagePath || typeof pagePath !== 'string') {
      return res.status(400).json({
        error: 'pagePath is required and must be a string'
      });
    }

    const summary = await getSummary(pagePath);

    res.json({
      exists: !!summary,
      summary: summary || null,
      pagePath
    });
  } catch (error) {
    console.error('Error checking summary:', error);
    res.status(500).json({
      error: 'Failed to check summary',
      message: error.message
    });
  }
});

module.exports = { summaryRouter: router };
