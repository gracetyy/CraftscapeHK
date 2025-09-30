# 🚀 CraftsHK AI - 部署與使用指南

## 📋 項目概覽

CraftsHK AI 是一個完整的全棧應用程式，展示香港傳統工藝品。包含：
- 🎨 React + TypeScript 前端
- 🔧 Express + SQLite 後端
- 🔐 JWT 認證系統
- 📚 Swagger API 文檔

## 🏗️ 系統架構

```
Frontend (Vite + React)  ←→  Backend (Express + SQLite)
     :3000                        :3001
     
     ↓
   用戶界面
   - Tinder式卡片瀏覽
   - 產品市場
   - 活動資訊
   - 工匠資料
   - AI工作室
```

## 🚀 快速啟動

### 1. 啟動後端
```bash
cd /Users/havertz/GenAI_Hackathon
node server-advanced.cjs
```

### 2. 啟動前端
```bash
cd /Users/havertz/GenAI_Hackathon
npx vite --host --port 3000
```

### 3. 訪問應用程式
- **前端應用**: http://localhost:3000
- **API文檔**: http://localhost:3001/api-docs
- **健康檢查**: http://localhost:3001/health

## 🧪 測試帳號

| 角色 | 電子郵件 | 密碼 | 權限 |
|-----|---------|------|------|
| 用戶 | user@example.com | password123 | 基本功能 |
| 工匠 | zhang@craftshk.com | password123 | 工匠模式 |
| 管理員 | admin@craftshk.com | password123 | 完整權限 |

## 📱 功能測試清單

### ✅ 已實現功能

#### 🎯 核心功能
- [x] Tinder式卡片瀏覽工藝品
- [x] 滑動互動（左拒絕/右喜歡/點擊詳情）
- [x] 產品市場瀏覽
- [x] 活動資訊展示
- [x] 多語言支援（中/英）
- [x] 深色/淺色主題切換

#### 🔐 認證系統
- [x] 用戶註冊/登入
- [x] JWT令牌管理
- [x] 自動登出機制
- [x] 角色權限控制

#### 💾 資料管理
- [x] SQLite資料庫持久化
- [x] RESTful API
- [x] 即時資料同步
- [x] 錯誤處理機制

#### 🎨 工匠模式
- [x] 儀表板概覽
- [x] 產品管理
- [x] 訂單管理
- [x] 客戶訊息

#### 📖 開發工具
- [x] Swagger API文檔
- [x] 熱重載開發
- [x] TypeScript支援
- [x] ESLint代碼檢查

## 🔧 API 端點

### 🔓 公開端點
```
GET  /api/crafts      - 獲取工藝品列表
GET  /api/products    - 獲取產品列表
GET  /api/events      - 獲取活動列表
GET  /api/artisans    - 獲取工匠列表
GET  /health          - 系統健康檢查
```

### 🔐 需要認證
```
GET  /api/orders           - 訂單管理
GET  /api/messages         - 訊息管理
POST /api/ai/generate-image - AI圖片生成
```

### 👤 認證相關
```
POST /api/auth/register    - 用戶註冊
POST /api/auth/login       - 用戶登入
GET  /api/auth/profile     - 獲取用戶資料
PUT  /api/auth/profile     - 更新用戶資料
```

## 🛠️ 開發環境需求

- **Node.js**: v18+
- **NPM**: v8+
- **瀏覽器**: Chrome, Firefox, Safari (現代瀏覽器)

## 📦 依賴包

### 前端
```json
{
  "react": "^19.1.1",
  "framer-motion": "^12.23.19",
  "typescript": "~5.8.2",
  "vite": "^6.2.0"
}
```

### 後端
```json
{
  "express": "latest",
  "sequelize": "latest",
  "sqlite3": "^5.1.6",
  "jsonwebtoken": "latest",
  "bcryptjs": "latest",
  "swagger-ui-express": "latest"
}
```

## 🐛 故障排除

### 前端空白頁面
1. 檢查瀏覽器控制台錯誤
2. 確認後端API正常運行
3. 清除瀏覽器快取 (Cmd+Shift+R)

### 後端連接失敗
1. 檢查端口3001是否被占用: `lsof -i :3001`
2. 確認資料庫檔案存在: `ls -la database.sqlite`
3. 檢查依賴安裝: `npm install`

### 認證問題
1. 檢查JWT token是否過期
2. 確認測試帳號密碼正確
3. 清除localStorage: 開發者工具 > Application > Storage

## 🚀 生產部署建議

### 環境變數設置
```bash
export NODE_ENV=production
export JWT_SECRET=your-secure-secret-key
export DATABASE_URL=your-production-database-url
export GOOGLE_AI_API_KEY=your-ai-api-key
```

### 建議的技術棧
- **前端**: Vercel, Netlify
- **後端**: Railway, Heroku, DigitalOcean
- **資料庫**: PostgreSQL, MongoDB
- **監控**: Sentry, LogRocket

## 📊 性能優化

### 已實現
- [x] 代碼分割 (Code Splitting)
- [x] 圖片懶加載
- [x] API回應快取
- [x] 資料庫索引優化

### 可優化項目
- [ ] CDN整合
- [ ] Service Worker快取
- [ ] 圖片壓縮
- [ ] 資料庫查詢優化

## 🔮 未來功能

### 待開發功能
- [ ] 即時聊天系統
- [ ] 支付整合
- [ ] 推薦演算法
- [ ] 社交分享
- [ ] PWA支援
- [ ] 多語言擴展

### AI功能增強
- [ ] 智能推薦
- [ ] 圖片識別
- [ ] 自然語言搜尋
- [ ] 個性化內容

## 📞 支援

如有問題，請檢查：
1. **API文檔**: http://localhost:3001/api-docs
2. **健康檢查**: http://localhost:3001/health
3. **瀏覽器控制台**: F12 開發者工具
4. **後端日誌**: 終端輸出訊息

---

## 🎉 恭喜！

你的 CraftsHK AI 應用程式已成功部署！這是一個功能完整的現代化全棧應用程式，具備：

✅ 完整的前後端分離架構  
✅ 現代化的用戶界面  
✅ 安全的認證系統  
✅ 完整的API文檔  
✅ 生產級別的錯誤處理  

開始探索你的香港工藝品世界吧！🎨
