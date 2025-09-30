// Seed script to populate the database with initial data
const bcrypt = require('bcryptjs');
const { sequelize, User, Craft, Product, Event, Artisan, Order, MessageThread } = require('./database.cjs');

// Import mock data from constants
const fs = require('fs');
const path = require('path');

// Helper function to extract data from constants.ts file
function extractConstantsData() {
  try {
    // Read constants.ts file
    const constantsPath = path.join(__dirname, 'constants.ts');
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Extract array data using regex (simplified approach)
    const extractArray = (varName) => {
      const regex = new RegExp(`export const ${varName}: .*?\\[(.*?)\\];`, 's');
      const match = constantsContent.match(regex);
      if (match) {
        try {
          // This is a simplified extraction - would need proper TypeScript parsing for production
          return JSON.parse(`[${match[1]}]`);
        } catch (e) {
          console.warn(`Failed to parse ${varName} data, using fallback`);
          return [];
        }
      }
      return [];
    };

    return {
      crafts: extractArray('CRAFTS'),
      products: extractArray('PRODUCTS'),
      events: extractArray('EVENTS'),
      artisans: extractArray('ARTISANS'),
      orders: extractArray('ORDERS'),
      messageThreads: extractArray('MESSAGE_THREADS'),
    };
  } catch (error) {
    console.warn('Failed to read constants.ts, using fallback data');
    return getFallbackData();
  }
}

// Fallback data if constants.ts can't be read
function getFallbackData() {
  return {
    crafts: [
      {
        id: 1,
        name: { zh: "手繪瓷器 (Canton Porcelain)", en: "Hand-painted Porcelain (Canton Porcelain)" },
        artisan: { zh: "張師傅", en: "Master Zhang" },
        short_description: { zh: "百年傳承的釉上彩繪藝術", en: "A century-old art of on-glaze painting" },
        full_description: { zh: "廣彩，全稱「廣州織金彩瓷」，是清代以來在廣州地區發展起來的釉上彩繪瓷器工藝。", en: "Canton Porcelain, also known as 'Guangzhou Weaving Gold Painted Porcelain', is an on-glaze painted porcelain craft developed in Guangzhou since the Qing Dynasty." },
        images: ["https://gw.alicdn.com/imgextra/i1/2356757853/O1CN01ejsxjZ27sixqTgpGx_!!0-item_pic.jpg_Q75.jpg_.webp"],
        history: { zh: "廣彩始於清朝康熙晚期，盛於雍正、乾隆年間。", en: "Canton Porcelain originated in the late Kangxi period of the Qing Dynasty and flourished during the Yongzheng and Qianlong eras." },
        story: { zh: "張師傅是廣彩世家的第三代傳人。", en: "Master Zhang is the third-generation heir of a Canton Porcelain family." }
      }
    ],
    products: [
      {
        id: 1,
        name: { zh: "廣彩龍鳳呈祥茶具套裝", en: "Canton Porcelain Dragon & Phoenix Tea Set" },
        price: 1888,
        priceDisplay: { zh: "HK$ 1,888", en: "HK$ 1,888" },
        image: "https://picsum.photos/seed/product1/400/400",
        artisan: { zh: "張師傅", en: "Master Zhang" },
        full_description: { zh: "一套精緻的廣彩茶具，繪有龍鳳圖案，寓意吉祥如意。", en: "An exquisite Canton Porcelain tea set, painted with dragon and phoenix motifs, symbolizing good fortune." }
      }
    ],
    events: [
      {
        id: 1,
        title: { zh: "工藝展覽", en: "Craft Exhibition" },
        date: "2025-01-01",
        time: { zh: "全日", en: "All Day" },
        location: { zh: "香港", en: "Hong Kong" },
        description: { zh: "香港傳統工藝展覽", en: "Hong Kong Traditional Crafts Exhibition" },
        organizer: "香港工藝協會",
        organizer_icon: "https://picsum.photos/seed/org1/100/100",
        image: "https://picsum.photos/seed/event1/800/600",
        region: "港島",
        type: "展覽",
        isFeatured: true
      }
    ],
    artisans: [
      {
        id: 1,
        name: { zh: "張師傅", en: "Master Zhang" },
        bio: "廣彩世家第三代傳人，致力於將現代設計融入傳統工藝。",
        image: "https://picsum.photos/seed/artisan1/200/200",
        craftIds: [1]
      }
    ],
    orders: [],
    messageThreads: []
  };
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database schema
    await sequelize.sync({ force: true });
    console.log('✅ Database schema synchronized');

    // Get data
    const data = getFallbackData(); // Using fallback data for now

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.bulkCreate([
      {
        username: 'demo_user',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user',
        profile: {
          name: '示範用戶',
          avatar: 'https://picsum.photos/seed/user1/200/200'
        }
      },
      {
        username: 'master_zhang',
        email: 'zhang@craftshk.com',
        password: hashedPassword,
        role: 'artisan',
        profile: {
          name: '張師傅',
          avatar: 'https://picsum.photos/seed/artisan1/200/200',
          craft: 'Canton Porcelain'
        }
      },
      {
        username: 'admin',
        email: 'admin@craftshk.com',
        password: hashedPassword,
        role: 'admin',
        profile: {
          name: '系統管理員',
          avatar: 'https://picsum.photos/seed/admin/200/200'
        }
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Seed crafts
    if (data.crafts.length > 0) {
      await Craft.bulkCreate(data.crafts);
      console.log(`✅ Seeded ${data.crafts.length} crafts`);
    }

    // Seed products
    if (data.products.length > 0) {
      await Product.bulkCreate(data.products);
      console.log(`✅ Seeded ${data.products.length} products`);
    }

    // Seed events
    if (data.events.length > 0) {
      await Event.bulkCreate(data.events);
      console.log(`✅ Seeded ${data.events.length} events`);
    }

    // Seed artisans
    if (data.artisans.length > 0) {
      await Artisan.bulkCreate(data.artisans);
      console.log(`✅ Seeded ${data.artisans.length} artisans`);
    }

    // Seed sample orders
    const sampleOrders = [
      {
        id: 'HK2024-001',
        customerName: '陳小姐',
        productId: 1,
        quantity: 1,
        total: 1888.00,
        date: '2024-12-20',
        status: '待處理'
      }
    ];
    await Order.bulkCreate(sampleOrders);
    console.log(`✅ Seeded ${sampleOrders.length} orders`);

    // Seed sample message threads
    const sampleMessages = [
      {
        id: 'MSG-001',
        customerName: '陳小姐',
        lastMessage: '你好！請問關於廣彩茶具，可以訂製圖案嗎？',
        timestamp: '下午 3:45',
        unread: true,
        avatar: 'https://picsum.photos/seed/msg1/100/100',
        productId: 1
      }
    ];
    await MessageThread.bulkCreate(sampleMessages);
    console.log(`✅ Seeded ${sampleMessages.length} message threads`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo accounts created:');
    console.log('👤 User: user@example.com / password123');
    console.log('🎨 Artisan: zhang@craftshk.com / password123');
    console.log('🔧 Admin: admin@craftshk.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
