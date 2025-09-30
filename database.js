// Database setup with Sequelize and SQLite
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: config.database.logging ? console.log : false,
});

// Define User model for authentication
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'artisan', 'admin'),
    defaultValue: 'user',
  },
  profile: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});

// Define Craft model
const Craft = sequelize.define('Craft', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  artisan: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  short_description: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  full_description: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  history: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  story: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Define Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  priceDisplay: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  priceSubDisplay: {
    type: DataTypes.JSON,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artisan: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  full_description: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Define Event model
const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  location: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizer_icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  url: {
    type: DataTypes.STRING,
  },
});

// Define Artisan model
const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  craftIds: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Define Order model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define MessageThread model
const MessageThread = sequelize.define('MessageThread', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unread: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
Order.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order, { foreignKey: 'productId' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Craft,
  Product,
  Event,
  Artisan,
  Order,
  MessageThread,
};
