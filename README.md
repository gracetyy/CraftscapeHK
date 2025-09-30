# Craftscape HK (藝守) – Project Story

## Inspiration  
Hong Kong’s traditional crafts—such as **hand-carved mahjong tiles, painted porcelain, cheongsam, and neon sign**—are fading due to shrinking markets and an aging artisan community. 
**More than 70%** of craft shops have shut in recent years as demand wanes and rents spike, typical **revenues have fallen 30–50%** amid mass-produced competition, and **80% of artisans** say their children won’t continue the trade because of long hours, low pay, and little recognition. 
We wanted to build a bridge between the past and the future, enabling young people and global visitors to not only appreciate but also interact with these disappearing arts, and translating the appreciation into tangible support. **Because the most meaningful way to preserve a craft is to create a thriving economy around it.**

## What it does  
Craftscape HK is an **AI + AR e-commerce platform** where users can:  
- Explore craft stories through a swipe-card interface (like Tinder).  
- Use the **AI Creation Studio** to design their own craft pieces and directly commission artisans to bring them to life.  
- Experience **AR interactive virtual exhibitions** with 360° product views, real-world photo integration, and immersive storytelling.  
- Access a **city-wide cultural events calendar** for exhibitions, workshops, and community activities.  
- Support artisans by purchasing products, attending workshops, and visiting virtual/AR exhibitions.  

## How we built it  
- **Frontend**: A React 19 + TypeScript interface bundled with Vite, styled through Tailwind CSS (via CDN) and Framer Motion for micro-interactions to deliver the swipeable, mobile-first experience.
- **Backend - Platform APIs & data layer**: Modular NestJS endpoints for crafts, products, events, orders, and messaging run on TypeORM with a SQLite store, exposing REST routes that the frontend consumes via a typed API client with authenticated fetch helpers and offline fallbacks.
- **Function - AI Creation Studio**: A NestJS AI microservice wraps Google’s Imagen 4.0 (exposed through the @google/genai SDK) and returns base64 renders that the AiStudio view consumes and stores in the shared context, so artisans receive customizable design briefs.
- **Function - AR & experiential layer**: The Play screen ships downloadable USDZ assets (scanned by Reality Composer with iPhone)so visitors can launch Quick Look/WebAR sessions from their phones, complementing the narrative exhibition content in-app.

## Challenges we ran into  
- Limited digital archives for crafts like hand-carved mahjong required manual data collection.  
- Many artisans are elderly and unfamiliar with digital tools, so onboarding needed special care and training.  
- Balancing **AI-generated creativity** with respect for authentic craft aesthetics was challenging.  
- Ensuring sustainability: making the platform engaging for users while providing artisans with fair income.  

## Accomplishments that we're proud of  
- Built an early prototype of the **AI Creation Studio** that generates personalized craft designs.  
- Successfully piloted a working **AR exhibition demo** with 360° artifact viewing and real-world photo integration.  
- Engaged real artisans in co-design workshops to validate cultural and practical feasibility.  
- Developed a model for integrating cultural heritage into everyday digital life.  

## What we learned  
- Technology must act as a **bridge, not a replacement**, for traditional knowledge.  
- AR is powerful for creating immersive cultural experiences that attract young users.  
- The sustainability of cultural projects depends on building both **emotional connection** and **economic value** for artisans.  
- Community collaboration is as important as technical innovation.  

## What's next for Craftscape HK  
- Expand our dataset of traditional crafts by partnering with museums, NGOs, and cultural heritage groups.  
- Refine the **AI Creation Studio** to support more customization and multi-modal input (sketch + text).  
- Launch **pilot AR exhibitions** in collaboration with local cultural centers and schools.  
- Explore monetization pathways to ensure artisans benefit directly from sales and commissions.  
- Scale Craftscape HK into a **global platform for cultural heritage preservation**, starting with Hong Kong but extending to other endangered crafts worldwide.

## Quick Start

### System Requirements
- **Node.js** v18+
- **npm** v8+
- Modern browser (Chrome, Firefox, Safari)

### Installation & Setup

1. **Clone the Project**
   ```bash
   git clone https://github.com/gracetyy/CraftscapeHK
   cd GenAI_Hackathon
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   
   **Option A: Using .env file (Recommended)**
   ```bash
   # Create a .env file in the root directory
   echo "GOOGLE_AI_API_KEY=your_api_key" > .env
   echo "GOOGLE_AI_IMAGE_MODEL=imagen-4.0-nano-banana-001" >> .env
   ```
   
   **Option B: Using system environment variables**
   ```bash
   # Windows
   setx GOOGLE_AI_API_KEY "your_api_key"
   setx GOOGLE_AI_IMAGE_MODEL "imagen-4.0-nano-banana-001"
   
   # macOS/Linux
   export GOOGLE_AI_API_KEY="your_api_key"
   export GOOGLE_AI_IMAGE_MODEL="imagen-4.0-nano-banana-001"
   ```

   > **Note**: The .env file method is simpler and doesn't require reopening terminals. Make sure to add `.env` to your `.gitignore` file to keep your API keys secure.

4. **Seed Database**
   ```bash
   cd server && npm run seed
   ```

5. **Start Backend**
   ```bash
   cd server && npm run start:dev
   ```

6. **Start Frontend**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - 🌐 **Frontend**: http://localhost:3000
   - 🚀 **Backend API**: http://localhost:3001/api

## License
Released under the MIT License.

<div align="center">
  <p>🎨 Made with ❤️ for Hong Kong Traditional Crafts 🇭🇰</p>
  <p>由 Winter Club 團隊開發</p>
</div>
