// Advanced backend server with database, authentication, and API documentation
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config.cjs');
const { GoogleGenAI } = require('@google/genai');
const { sequelize, Craft, Product, Event, Artisan, Order, MessageThread } = require('./database.cjs');
const { setupAuthRoutes, authenticateToken, requireRole } = require('./auth.cjs');

const app = express();
const port = config.server.port;

const aiImageModel = config.ai.imageModel || 'imagen-4.0-nano-banana-001';
const aiClient = config.ai.enabled
  ? new GoogleGenAI({ apiKey: config.ai.apiKey })
  : null;

if (!config.ai.enabled) {
  console.warn('⚠️ Google AI API key not configured. Image generation endpoint will return 503.');
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CraftsHK API',
      version: '1.0.0',
      description: 'API documentation for CraftsHK - Hong Kong Traditional Crafts Platform',
      contact: {
        name: 'CraftsHK Team',
        email: 'api@craftshk.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./server-advanced.cjs', './auth.cjs'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors({
  origin: config.cors.origins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'CraftsHK API Documentation'
}));

// Setup authentication routes
setupAuthRoutes(app);

async function generateCraftImageWithGoogleAi(craftName, userPrompt) {
  if (!aiClient) {
    const error = new Error('AI service not configured. Please set GOOGLE_AI_API_KEY.');
    error.statusCode = 503;
    throw error;
  }

  const fullPrompt = `A high-quality, artistic image of a modern interpretation of a traditional Hong Kong craft: ${craftName}. The design is inspired by: "${userPrompt}". Focus on intricate details, cinematic lighting, and authentic craftsmanship.`;

  const response = await aiClient.models.generateImages({
    model: aiImageModel,
    prompt: fullPrompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '3:4',
    },
  });

  const generatedImage = response?.generatedImages?.[0]?.image;

  if (!generatedImage?.imageBytes) {
    throw new Error('Google GenAI returned an empty response for image generation.');
  }

  const mimeType = generatedImage.mimeType || 'image/png';

  return {
    imageUrl: `data:${mimeType};base64,${generatedImage.imageBytes}`,
    finalPrompt: fullPrompt,
  };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Craft:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: object
 *           properties:
 *             zh:
 *               type: string
 *             en:
 *               type: string
 *         artisan:
 *           type: object
 *           properties:
 *             zh:
 *               type: string
 *             en:
 *               type: string
 *         short_description:
 *           type: object
 *         full_description:
 *           type: object
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         history:
 *           type: object
 *         story:
 *           type: object
 */

/**
 * @swagger
 * /api/crafts:
 *   get:
 *     summary: Get all crafts
 *     tags: [Crafts]
 *     responses:
 *       200:
 *         description: List of all crafts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Craft'
 */
app.get('/api/crafts', async (req, res) => {
  try {
    const crafts = await Craft.findAll();
    res.json(crafts);
  } catch (error) {
    console.error('Error fetching crafts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/crafts/{id}:
 *   get:
 *     summary: Get craft by ID
 *     tags: [Crafts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Craft details
 *       404:
 *         description: Craft not found
 */
app.get('/api/crafts/:id', async (req, res) => {
  try {
    const craft = await Craft.findByPk(req.params.id);
    if (!craft) {
      return res.status(404).json({ error: 'Craft not found' });
    }
    res.json(craft);
  } catch (error) {
    console.error('Error fetching craft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 */
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/artisans:
 *   get:
 *     summary: Get all artisans
 *     tags: [Artisans]
 *     responses:
 *       200:
 *         description: List of all artisans
 */
app.get('/api/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.findAll();
    res.json(artisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (requires authentication)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Authentication required
 */
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Product]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get message threads (requires authentication)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of message threads
 *       401:
 *         description: Authentication required
 */
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await MessageThread.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/ai/generate-image:
 *   post:
 *     summary: Generate craft image using AI
 *     tags: [AI Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - craftName
 *               - userPrompt
 *             properties:
 *               craftName:
 *                 type: string
 *                 description: Name of the craft
 *               userPrompt:
 *                 type: string
 *                 description: User's creative input
 *     responses:
 *       200:
 *         description: Generated image URL
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Authentication required
 *       503:
 *         description: AI service not available
 */
app.post('/api/ai/generate-image', async (req, res) => {
  try {
    const { craftName, userPrompt } = req.body;
    
    if (!craftName || !userPrompt) {
      return res.status(400).json({ error: 'craftName and userPrompt are required' });
    }

    if (!config.ai.enabled) {
      return res.status(503).json({ 
        error: 'AI service not available. Please configure GOOGLE_AI_API_KEY.' 
      });
    }

    console.log(`AI Image request: ${craftName} - ${userPrompt}`);
    const { imageUrl, finalPrompt } = await generateCraftImageWithGoogleAi(craftName, userPrompt);

    res.json({ 
      imageUrl,
      metadata: {
        craftName,
        userPrompt,
        finalPrompt,
        generatedAt: new Date().toISOString(),
        userId: 'test-user',
        model: aiImageModel,
        provider: 'google-genai'
      }
    });
  } catch (error) {
    console.error('Error generating image:', error);
    const status = error?.statusCode || error?.status || 500;
    const message = error?.message || 'Internal server error';
    res.status(status).json({ error: message });
  }
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System health status
 */
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();
    
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      ai_service: config.ai.enabled ? 'available' : 'disabled'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync database schema (create tables if they don't exist)
    await sequelize.sync({ alter: false });
    console.log('✅ Database schema synchronized');

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Advanced backend server running on http://localhost:${port}`);
      console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${port}/health`);
      console.log('\n📊 Available API endpoints:');
      console.log('   🔓 GET  /api/crafts');
      console.log('   🔓 GET  /api/products');
      console.log('   🔓 GET  /api/events');
      console.log('   🔓 GET  /api/artisans');
      console.log('   🔐 GET  /api/orders');
      console.log('   🔐 GET  /api/messages');
  console.log('   🔐 POST /api/ai/generate-image');
      console.log('\n🔐 Authentication endpoints:');
      console.log('   POST /api/auth/register');
      console.log('   POST /api/auth/login');
      console.log('   GET  /api/auth/profile');
      console.log('   PUT  /api/auth/profile');
      console.log('\n💡 Use the API documentation for testing: http://localhost:' + port + '/api-docs');
    });

  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
