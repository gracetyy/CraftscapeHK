// Configuration file for the application
require('dotenv').config();

const config = {
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'sqlite:./database.sqlite',
    type: 'sqlite',
    database: './database.sqlite',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  },

  // Server Configuration
  server: {
    port: process.env.API_PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Frontend Configuration
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },

  // AI Service Configuration
  ai: {
    apiKey: process.env.GOOGLE_AI_API_KEY,
    enabled: !!process.env.GOOGLE_AI_API_KEY,
    imageModel: process.env.GOOGLE_AI_IMAGE_MODEL || 'imagen-4.0-generate-001',
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // CORS Configuration
  cors: {
    origins: process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:5173'],
  },
};

module.exports = config;
