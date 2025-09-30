// Simple backend server using Express.js as fallback
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import mock data
const constantsPath = path.join(__dirname, 'constants.ts');
let CRAFTS = [], PRODUCTS = [], EVENTS = [], ORDERS = [], ARTISANS = [], MESSAGE_THREADS = [];

// Simple mock data (fallback if constants.ts can't be read)
const mockData = {
  crafts: [
    { id: 1, name: { zh: "手繪瓷器", en: "Hand-painted Porcelain" }, artisan: { zh: "張師傅", en: "Master Zhang" } }
  ],
  products: [
    { id: 1, name: { zh: "廣彩茶具", en: "Canton Porcelain Tea Set" }, price: 1888 }
  ],
  events: [
    { id: 1, title: { zh: "工藝展覽", en: "Craft Exhibition" }, date: "2025-01-01" }
  ],
  orders: [],
  artisans: [],
  messageThreads: []
};

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.get('/api/crafts', (req, res) => {
  res.json(mockData.crafts);
});

app.get('/api/products', (req, res) => {
  res.json(mockData.products);
});

app.get('/api/events', (req, res) => {
  res.json(mockData.events);
});

app.get('/api/orders', (req, res) => {
  res.json(mockData.orders);
});

app.get('/api/artisans', (req, res) => {
  res.json(mockData.artisans);
});

app.get('/api/messages', (req, res) => {
  res.json(mockData.messageThreads);
});

app.post('/api/ai/generate-image', (req, res) => {
  // Mock AI image generation
  const { craftName, userPrompt } = req.body;
  console.log(`AI Image request: ${craftName} - ${userPrompt}`);
  
  // Return a placeholder image
  res.json({ 
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' 
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Simple backend server running on http://localhost:${port}`);
  console.log(`📊 API endpoints available:`);
  console.log(`   GET /api/crafts`);
  console.log(`   GET /api/products`);
  console.log(`   GET /api/events`);
  console.log(`   POST /api/ai/generate-image`);
  console.log(`   GET /health`);
});
