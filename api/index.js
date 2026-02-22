/**
 * Vercel Serverless Function - Main API endpoint
 * This handles all API requests for the RAG application
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET requests - health check
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'ok',
      message: 'RAG API is running',
      version: '1.0.0'
    });
    return;
  }

  // Handle POST requests
  if (req.method === 'POST') {
    try {
      const { query, action } = req.body || {};

      if (!action) {
        res.status(400).json({
          error: 'Missing required field: action'
        });
        return;
      }

      // Route to different handlers based on action
      switch (action) {
        case 'health':
          res.status(200).json({
            status: 'ok',
            message: 'RAG API is running'
          });
          return;

        case 'query':
          // TODO: Implement RAG query handler
          // For now, return a placeholder response
          res.status(200).json({
            message: 'RAG query endpoint - implementation needed',
            query: query || 'No query provided'
          });
          return;

        default:
          res.status(400).json({
            error: `Unknown action: ${action}`
          });
          return;
      }
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
      return;
    }
  }

  // Method not allowed
  res.status(405).json({
    error: 'Method not allowed'
  });
}

