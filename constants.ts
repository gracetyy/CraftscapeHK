import type { Craft, Event, Product, Artisan, Order, MessageThread, GlyphName } from './types';

export const CRAFTS: Craft[] = [
  {
    id: 1,
    name: { zh: "手繪瓷器 (Canton Porcelain)", en: "Hand-painted Porcelain (Canton Porcelain)" },
    artisan: { zh: "張師傅", en: "Master Zhang" },
    short_description: { zh: "百年傳承的釉上彩繪藝術", en: "A century-old art of on-glaze painting" },
    full_description: { zh: "廣彩，全稱「廣州織金彩瓷」，是清代以來在廣州地區發展起來的釉上彩繪瓷器工藝。它以色彩絢麗、構圖飽滿、金碧輝煌著稱，是東西方文化交融的結晶。", en: "Canton Porcelain, also known as 'Guangzhou Weaving Gold Painted Porcelain', is an on-glaze painted porcelain craft developed in Guangzhou since the Qing Dynasty. It is renowned for its brilliant colors, full compositions, and splendid golden decorations, representing a fusion of Eastern and Western cultures." },
    images: ["https://gw.alicdn.com/imgextra/i1/2356757853/O1CN01ejsxjZ27sixqTgpGx_!!0-item_pic.jpg_Q75.jpg_.webp", "https://picsum.photos/seed/porcelain2/800/1200", "https://picsum.photos/seed/porcelain3/800/1200"],
    history: { zh: "廣彩始於清朝康熙晚期，盛於雍正、乾隆年間。當時廣州作為唯一的對外通商口岸，將景德鎮的白瓷胎運來，根據外商訂單加以彩繪，再出口海外，風靡歐洲。", en: "Canton Porcelain originated in the late Kangxi period of the Qing Dynasty and flourished during the Yongzheng and Qianlong eras. At that time, Guangzhou was the sole port for foreign trade. White porcelain bodies from Jingdezhen were shipped here, painted according to foreign orders, and then exported, becoming highly popular in Europe." },
    story: { zh: "張師傅是廣彩世家的第三代傳人。他的祖父曾在廣州十三行開設瓷器作坊。張師傅從小耳濡μ染，不僅繼承了傳統技法，更嘗試將現代設計元素融入創作，希望這門古老手藝能被更多年輕人喜愛。", en: "Master Zhang is the third-generation heir of a Canton Porcelain family. His grandfather once ran a porcelain workshop in the Thirteen Factories of Canton. Master Zhang, immersed in this art from a young age, has not only inherited traditional techniques but also tries to integrate modern design elements into his creations, hoping this ancient craft will be appreciated by more young people." }
  },
  {
    id: 2,
    name: { zh: "霓虹燈招牌 (Neon Sign)", en: "Neon Sign" },
    artisan: { zh: "劉師傅", en: "Master Lau" },
    short_description: { zh: "點亮香港夜空的視覺符號", en: "The visual symbol that lights up Hong Kong's night sky" },
    full_description: { zh: "霓虹燈招牌曾是香港繁華都市景觀的代名詞。師傅們用火焰和巧手，將玻璃管彎曲成各種文字和圖案，再注入惰性氣體，通電後發出迷人光芒。", en: "Neon signs were once synonymous with Hong Kong's bustling cityscape. Artisans use flame and skill to bend glass tubes into various characters and patterns, then fill them with inert gas, which emits a charming glow when electrified." },
    images: ["https://images.unsplash.com/photo-1653402265323-669169d9e5c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://picsum.photos/seed/neon2/800/1200"],
    history: { zh: "1920年代，霓虹燈技術傳入香港，並在二戰後迎來黃金時代。大街小巷掛滿了各式各樣的霓虹招牌，成為香港獨特的賽博朋克美學象徵。然而，隨著LED等新技術的興起，這門手藝正瀕臨失傳。", en: "Neon technology was introduced to Hong Kong in the 1920s and saw its golden age after World War II. Streets and alleys were filled with various neon signs, becoming a unique symbol of Hong Kong's cyberpunk aesthetics. However, with the rise of new technologies like LED, this craft is on the verge of extinction." },
    story: { zh: "入行四十多年的劉師傅，見證了霓虹燈行業的起起落落。他堅持用傳統方法製作每一件作品，從吹管、屈管到抽真空、充電，一絲不苟。對他而言，霓虹燈不僅是照明工具，更是一種有溫度、有靈魂的藝術品。", en: "Master Lau, with over forty years in the industry, has witnessed the ups and downs of the neon sign business. He insists on using traditional methods for every piece, from glass blowing and bending to vacuuming and charging, with meticulous care. To him, a neon sign is not just a lighting tool but a warm, soulful piece of art." }
  },
  {
    id: 3,
    name: { zh: "手雕麻雀 (Mahjong Tile Carving)", en: "Hand-carved Mahjong Tiles" },
    artisan: { zh: "陳師傅", en: "Master Chan" },
    short_description: { zh: "指尖上的智慧與博弈", en: "Wisdom and strategy at your fingertips" },
    full_description: { zh: "在機器雕刻普及之前，每一隻麻雀牌都由師傅用雕刻刀在牛骨或塑膠上精心雕琢而成。這門手藝不僅考驗刀功，更需要極大的耐心和眼力。", en: "Before machine carving became common, each mahjong tile was meticulously carved by an artisan with a knife on bone or plastic. This craft requires not only excellent carving skills but also immense patience and sharp eyesight." },
    images: ["https://images.unsplash.com/photo-1698270931936-3b8ece9d981d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://picsum.photos/seed/mahjong2/800/1200", "https://picsum.photos/seed/mahjong3/800/1200"],
    history: { zh: "麻雀的歷史源遠流長，而手雕麻雀的技藝在20世紀中葉的香港最為鼎盛。當時麻雀是家家戶戶主要的娛樂活動，對麻雀牌的需求極大，養活了許多手雕師傅。", en: "Mahjong has a long history, and the art of hand-carving tiles peaked in Hong Kong in the mid-20th century. At that time, mahjong was a primary form of entertainment for households, creating a huge demand for tiles and supporting many carving masters." },
    story: { zh: "陳師傅是香港碩果僅存的手雕麻雀師傅之一。他的小店隱藏在九龍的舊區，幾十年來，工作台上堆滿了雕刻刀和牌塊。他感嘆現在已經很少有人願意入行，但他依然堅持，希望為後人留下這份屬於香港人的集體回憶。", en: "Master Chan is one of the last remaining hand-carved mahjong tile masters in Hong Kong. His small shop is hidden in an old district of Kowloon, his workbench piled high with carving tools and tiles for decades. He laments that few are willing to enter the trade now, but he perseveres, hoping to preserve this piece of collective memory for Hong Kongers." }
  },
  {
    id: 4,
    name: { zh: "中式長衫 (Cheongsam)", en: "Cheongsam Making" },
    artisan: { zh: "王師傅", en: "Master Wong" },
    short_description: { zh: "展現東方女性美的經典服飾", en: "Classic attire that showcases Eastern female beauty" },
    full_description: { zh: "香港的長衫製作技藝以其精湛的剪裁和手工聞名，被稱為「海派」風格。它貼合女性身體曲線，優雅含蓄，是中西合璧的時尚典範。", en: "Hong Kong's cheongsam-making is renowned for its exquisite tailoring and craftsmanship, known as the 'Shanghai style'. It fits the female body's curves, is elegant and subtle, and a prime example of fashion that blends Eastern and Western aesthetics." },
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/A_White_cheongsam_at_Shum_Shui_Po.jpg/1024px-A_White_cheongsam_at_Shum_Shui_Po.jpg?20211210172938", "https://picsum.photos/seed/cheongsam2/800/1200"],
    history: { zh: "1920年代，長衫在上海興起，後隨大量上海裁縫南下傳入香港，並在香港發揚光大。從日常穿著到電影《花樣年華》中的經典形象，長衫記錄了香港社會的變遷。", en: "The cheongsam rose to popularity in Shanghai in the 1920s and was later brought to Hong Kong by a large number of Shanghainese tailors, where it was further developed. From daily wear to the iconic images in the film 'In the Mood for Love', the cheongsam has recorded the changes in Hong Kong society." },
    story: { zh: "王師傅從16歲開始跟隨父親學習製作長衫，至今已有50個年頭。他堅持為每一位客人量身定做，從選料、畫樣、裁剪到縫製、盤扣，每一個步驟都親力為。他說，一件好的長衫是有生命的，能陪伴主人度過許多重要時刻。", en: "Master Wong began learning to make cheongsams from his father at the age of 16 and has been doing it for 50 years. He insists on custom-tailoring for every client, handling every step himself, from fabric selection and pattern drawing to cutting, sewing, and knot buttons. He says a good cheongsam has a life of its own and can accompany its owner through many important moments." }
  },
  {
      id: 5,
      name: { zh: "活字印刷 (Letterpress)", en: "Letterpress Printing" },
      artisan: { zh: "李師傅", en: "Master Lee" },
      short_description: { zh: "感受油墨與紙張的溫度", en: "Feel the warmth of ink and paper" },
      full_description: { zh: "活字印刷是一種古老的印刷技術，透過將凸起的鉛字或圖案壓印在紙張上，留下深刻而有質感的印記。每一個字、每一條線條都充滿了手工的溫度與不完美的美。", en: "Letterpress printing is an ancient printing technique that creates a deep, tactile impression by pressing raised type or images onto paper. Every character and line is filled with the warmth of handcraft and the beauty of imperfection." },
      images: ["https://images.unsplash.com/photo-1653888702916-599a590837c2", "https://images.unsplash.com/photo-1595142571206-88f8c64a9845", "https://picsum.photos/seed/letterpress3/800/1200"],
      history: { zh: "活字印刷術由畢昇發明，後經古騰堡改良傳至西方。在數碼印刷興起前，它是書籍、報紙和各種印刷品的主要生產方式。香港的印刷業曾十分輝煌，許多小型印刷廠都以活字印刷為生。", en: "Invented by Bi Sheng and later refined by Gutenberg in the West, letterpress was the primary method for producing books, newspapers, and other printed materials before the rise of digital printing. Hong Kong's printing industry was once glorious, with many small print shops relying on letterpress." },
      story: { zh: "李師傅的印刷廠是他父親留下來的。面對數碼時代的衝擊，他沒有放棄，反而將傳統工藝轉化為一種藝術體驗。他開放工作室，舉辦工作坊，讓更多人能親手操作沉重的印刷機，感受鉛字的重量和油墨的芳香，重新發現慢下來的美好。", en: "Master Lee's printing press was passed down from his father. Facing the challenges of the digital age, he didn't give up. Instead, he transformed the traditional craft into an artistic experience. He opened his studio for workshops, allowing people to operate the heavy machinery, feel the weight of lead type, and smell the ink, rediscovering the beauty of slowing down." },
      category: "letterpress"
  },
];

export const ARTISANS: Artisan[] = [
    { id: 1, name: { zh: "張師傅", en: "Master Zhang" }, bio: "廣彩世家第三代傳人，致力於將現代設計融入傳統工藝。", image: "https://picsum.photos/seed/artisan1/200/200", craftIds: [1] },
    { id: 2, name: { zh: "劉師傅", en: "Master Lau" }, bio: "四十年經驗的霓虹燈藝術家，堅持傳統手工製作。", image: "https://picsum.photos/seed/artisan2/200/200", craftIds: [2] },
    { id: 3, name: { zh: "陳師傅", en: "Master Chan" }, bio: "香港碩果僅存的手雕麻雀師傅之一，守護著香港人的集體回憶。", image: "https://picsum.photos/seed/artisan3/200/200", craftIds: [3] },
    { id: 4, name: { zh: "王師傅", en: "Master Wong" }, bio: "五十年經驗的海派長衫裁縫，相信每一件長衫都有生命。", image: "https://picsum.photos/seed/artisan4/200/200", craftIds: [4] },
    { id: 5, name: { zh: "李師傅", en: "Master Lee" }, bio: "堅守傳統活字印刷的工匠，將舊技術轉化為新時代的藝術體驗。", image: "https://picsum.photos/seed/artisan5/200/200", craftIds: [5] },
];

export const PRODUCTS: Product[] = [
  { 
    id: 7, 
    name: { zh: "麻雀雕刻", en: "Mahjong Tile Carving" }, 
    price: 4560, 
    priceDisplay: { zh: "HKD $30-50 / 隻", en: "HKD $30-50 / tile" },
    priceSubDisplay: { zh: "HKD $4560 / 副", en: "HKD $4560 / set" },
    image: "https://i.imgur.com/J2Ndpxa.jpeg", 
    artisan: { zh: "Polar wafter 師傅", en: "Master Polar Wafter" }, 
    full_description: { zh: `打牌打到好悶，想雕翻啲百撘同朋友打到天昏地暗？🤑
生日紀念日，唔知送咩俾個雀精好？🤫
突然有靈感，想自己設計一副麻雀？🤔
無論你想喺麻雀上面雕百撘，雕翻人名/公仔送禮定係雕啲新搞作
呢到全部都可以幫到你！🤓`, en: `Bored of playing mahjong and want to carve some custom tiles to play with friends? 🤑
Anniversary or birthday coming up, and don't know what to get for a mahjong enthusiast? 🤫
Suddenly inspired and want to design your own set of mahjong? 🤔
Whether you want to carve wild cards, names/characters for a gift, or something entirely new,
we can help you with all of it! 🤓` }
  },
  {
    id: 8,
    name: { zh: "小巴車頭牌", en: "Minibus Signboard" },
    price: 88,
    priceDisplay: { zh: "HKD $88 起", en: "From HKD $88" },
    priceSubDisplay: { zh: "匙扣・中牌・大牌", en: "Keychain・Medium・Large" },
    image: "https://i.imgur.com/4X4sl42.jpeg",
    artisan: { zh: "Polar wafter 師傅", en: "Master Polar Wafter" },
    full_description: { zh: `我哋仲有另一樣香港特色嘅 - 小巴牌🤨
排板🖌️/顏色🎨/大細🔍都可以自訂
唔似市面上一啲印刷嘅版本咁🙅🏻‍♂️
我哋嘅小巴牌係人手一筆一筆咁油顏色油上去🤓
摸上去真係有凹凸嘅手感🤩`, en: `We also have another Hong Kong specialty - minibus signs 🤨
Layout 🖌️ / Color 🎨 / Size 🔍 can all be customized.
Unlike some printed versions on the market 🙅🏻‍♂️,
our minibus signs are hand-painted, one stroke at a time 🤓.
You can really feel the textured surface 🤩.` }
  },
  {
    id: 9,
    name: { zh: "手工雨傘", en: "Handmade Umbrella" },
    price: 418,
    priceDisplay: { zh: "HKD $418起", en: "From HKD $418" },
    priceSubDisplay: { zh: "高爾夫長遮、縮骨遮、長遮、拐杖遮", en: "Golf, foldable, standard, and cane umbrellas" },
    image: "https://xn--zzvu34dizc.com/cdn/shop/files/18A1E420-BAA3-4C74-9E9D-68338466EC48_600x.jpg?v=1712039918",
    artisan: { zh: "梁蘇記 師傅", en: "Master from Leung So Kee" },
    full_description: { zh: `梁蘇記遮廠(創於1885年) 人手製造，骨架永久免費維修(遮頭﹑遮尾及遮布除外)。 於1880年代，梁智華(別字「蘇」)，主要買賣二手商品及提供維修服務，當中包括洋傘。`, en: `Leung So Kee Umbrella Factory (est. 1885). Handmade, with lifetime free repairs for the frame (excluding handle, tip, and fabric). In the 1880s, Leung Chi-wah (So) primarily dealt in second-hand goods and repair services, including Western umbrellas.` }
  },
  {
    id: 10,
    name: { zh: "手作霓虹燈", en: "Handmade Neon Light" },
    price: 0,
    priceDisplay: { zh: "時價", en: "Price on request" },
    priceSubDisplay: { zh: "自家手作冷光線霓虹燈 ", en: "Handmade portable EL neon light" },
    image: "https://i.imgur.com/4D9Sjub.png",
    artisan: { zh: "Neonlitehk 師傅", en: "Master from Neonlitehk" },
    full_description: { zh: `自家手作冷光線霓虹燈
Handmade portable EL neon light decoration`, en: `Custom handmade EL wire neon lights.
Handmade portable EL neon light decoration.` }
  },
  { id: 1, name: { zh: "廣彩龍鳳呈祥茶具套裝", en: "Canton Porcelain Dragon & Phoenix Tea Set" }, price: 1888, priceDisplay: { zh: "HK$ 1,888", en: "HK$ 1,888" }, image: "https://picsum.photos/seed/product1/400/400", artisan: { zh: "張師傅", en: "Master Zhang" }, full_description: { zh: "一套精緻的廣彩茶具，繪有龍鳳圖案，寓意吉祥如意。適合自用或作為高雅禮品。", en: "An exquisite Canton Porcelain tea set, painted with dragon and phoenix motifs, symbolizing good fortune. Perfect for personal use or as an elegant gift." } },
  { id: 2, name: { zh: "客製化中文霓虹燈", en: "Custom Chinese Neon Sign" }, price: 2500, priceDisplay: { zh: "HK$ 2,500 起", en: "From HK$ 2,500" }, image: "https://picsum.photos/seed/product2/400/400", artisan: { zh: "劉師傅", en: "Master Lau" }, full_description: { zh: "根據您的要求，由劉師傅親手打造獨一無二的中文霓虹燈。無論是您的名字、喜愛的詩句，都能化為閃爍的光影藝術。", en: "A unique Chinese neon sign handcrafted by Master Lau according to your specifications. Whether it's your name or a favorite poem, it can be transformed into sparkling light art." } },
  { id: 3, name: { zh: "手雕牛骨麻雀", en: "Hand-Carved Bone Mahjong Set" }, price: 4800, priceDisplay: { zh: "HK$ 4,800", en: "HK$ 4,800" }, image: "https://picsum.photos/seed/product3/400/400", artisan: { zh: "陳師傅", en: "Master Chan" }, full_description: { zh: "由陳師傅精心雕琢的全副牛骨麻雀，手感溫潤，字體深刻。不僅是娛樂工具，更是值得收藏的藝術品。", en: "A full set of ox bone mahjong tiles meticulously carved by Master Chan, with a warm feel and deeply engraved characters. Not just a game, but a collectible work of art." } },
  { id: 4, name: { zh: "真絲手繪長衫訂製", en: "Custom Silk Hand-Painted Cheongsam" }, price: 6800, priceDisplay: { zh: "HK$ 6,800 起", en: "From HK$ 6,800" }, image: "https://picsum.photos/seed/product4/400/400", artisan: { zh: "王師傅", en: "Master Wong" }, full_description: { zh: "王師傅為您量身定做海派長衫，選用頂級真絲面料，並可根據您的喜好手繪圖案，打造專屬於您的優雅。", en: "Master Wong will custom-tailor a Shanghai-style cheongsam for you, using top-grade silk fabric. It can be hand-painted with a design of your choice to create your own unique elegance." } },
  { id: 5, name: { zh: "廣彩花鳥圖案咖啡杯", en: "Canton Porcelain Flora & Fauna Coffee Cup" }, price: 580, priceDisplay: { zh: "HK$ 580", en: "HK$ 580" }, image: "https://picsum.photos/seed/product5/400/400", artisan: { zh: "張師傅", en: "Master Zhang" }, full_description: { zh: "將傳統廣彩藝術融入現代生活，這款咖啡杯繪有精美的花鳥圖案，為您的咖啡時光增添一抹東方韻味。", en: "Integrating traditional Canton Porcelain art into modern life, this coffee cup features exquisite flora and fauna patterns, adding a touch of Eastern charm to your coffee time." } },
  { id: 6, name: { zh: "迷你桌面霓虹燈飾", en: "Mini Desktop Neon Light" }, price: 890, priceDisplay: { zh: "HK$ 890", en: "HK$ 890" }, image: "https://picsum.photos/seed/product6/400/400", artisan: { zh: "劉師傅", en: "Master Lau" }, full_description: { zh: "小巧精緻的桌面霓虹燈，可選擇預設圖案或簡單訂製，為您的書桌或床頭增添一抹賽博朋克風格的亮色。", en: "A small and exquisite desktop neon light. Choose from preset designs or simple customizations to add a touch of cyberpunk brightness to your desk or bedside." } },
    { id: 11, name: { zh: "活字印刷體驗工作坊", en: "Letterpress Printing Workshop" }, price: 680, priceDisplay: { zh: "HK$ 680 / 位", en: "HK$ 680 / person" }, image: "https://images.unsplash.com/photo-1620027934326-9f8742d45a7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", artisan: { zh: "李師傅", en: "Master Lee" }, full_description: { zh: "親手操作百年歷史的印刷機，從揀字、排版到上墨、印刷，製作屬於你自己的活字印刷卡片。體驗每一個步驟，感受文字的觸感和油墨的香氣。", en: "Operate a century-old printing press yourself. From type-picking and typesetting to inking and printing, create your own letterpress cards. Experience every step and feel the texture of words and the aroma of ink." } },
];


export const EVENTS: Event[] = [
  {
    id: 1,
    title: { zh: "《身臨夢境：1950年代至今的女性藝術家環境作品》", en: "Dream Rooms: Environments by Women Artists from the 1950s to Now" },
    date: "2025.09.20 - 2026.01.18",
    time: { zh: "見官網", en: "See official website" },
    location: { zh: "西九文化區 M+ 博物館", en: "M+ Museum, West Kowloon Cultural District" },
    description: { zh: "「環境」是一種由觀者主動參與的藝術作品。當觀者在環境作品中穿梭或在其四周行走時，會感受到物件、光、流動影像和聲音的刺激。自二十世紀中葉以來，環境一直是全球藝術的重要一門，為今日風靡一時的沉浸式體驗奠下基礎。", en: "An 'environment' is a work of art that the viewer actively participates in. As viewers move through or around an environmental work, they are stimulated by objects, light, moving images, and sound. Since the mid-twentieth century, environments have been an important part of global art, laying the foundation for today's popular immersive experiences." },
    organizer: "M+博物館",
    organizer_icon: "https://picsum.photos/seed/mplus/100/100",
    image: "https://media.art-mate.net/uploads/artmate/202506/20250625_172042_iaPqfrcw5B_p.png",
    region: "九龍",
    type: "展覽",
    isFeatured: true,
    url: "https://www.mplus.org.hk/tc/exhibitions/dream-rooms-environments-by-women-artists/",
  },
  {
    id: 2,
    title: { zh: "《鑑古識今──敏求精舍六十五周年》", en: "Engaging the Past, Enlightening the Present – The 65th Anniversary of the Min Chiu Society" },
    date: "2025.08.30 - 2026.01.14",
    time: { zh: "見官網", en: "See official website" },
    location: { zh: "尖沙咀 香港藝術館", en: "Hong Kong Museum of Art, Tsim Sha Tsui" },
    description: { zh: "金文中的「鑑」，如俯身凝視銅盆中的倒影，此字後來更延伸至對人心的觀照。若器物囿於功用，終究只為凡物，然若經精工細琢，既合實用，又藏深意，正是「器以載道」。", en: "The character '鑑' in bronze inscriptions, like looking down at one's reflection in a bronze basin, later extended to the contemplation of the human heart. If an object is confined to its function, it is merely a common thing; but if it is finely crafted, practical, and holds deep meaning, it truly 'carries the Way'." },
    organizer: "香港藝術館",
    organizer_icon: "https://picsum.photos/seed/hkmuseumofart/100/100",
    image: "https://media.art-mate.net/uploads/artmate/202509/thumbnail/20250903_141146_tRwlGVyvjl_p_0_300.jpg",
    region: "九龍",
    type: "展覽",
    isFeatured: true,
    url: "https://hk.art.museum/tc/web/ma/exhibitions-and-events/engaging-past-wisdom.html",
  },
  {
    id: 3,
    title: { zh: "和太鼓倭《火の鳥》", en: "Yamato - The Drummers of Japan 'Hinotori'" },
    date: "2025.11.07 - 08",
    time: { zh: "晚上", en: "Evening" },
    location: { zh: "香港文化中心", en: "Hong Kong Cultural Centre" },
    description: { zh: "來自日本的太鼓表演，將傳統藝術以充滿力量和現代感的舞台效果呈現，是「亞藝無疆」藝術節的亮點。", en: "A taiko performance from Japan, presenting traditional art with powerful and modern stage effects, a highlight of the 'Asia+ Festival'." },
    organizer: "亞藝無疆藝術節",
    organizer_icon: "https://picsum.photos/seed/asiaplus/100/100",
    image: "https://media.art-mate.net/uploads/artmate/202507/20250714_153940_tgdLzmAEas_p.jpg",
    region: "九龍",
    type: "展覽",
    isFeatured: true,
    url: "https://www.urbtix.hk/",
  },
  {
    id: 4,
    title: { zh: "TATTOUR HK 2025 國際紋身藝術博覽會", en: "TATTOUR HK 2025 International Tattoo Convention" },
    date: "2025.11.14 - 16",
    time: { zh: "全日", en: "All Day" },
    location: { zh: "中環 PMQ元創方", en: "PMQ, Central" },
    description: { zh: "國際級的紋身藝術博覽會，匯聚全球頂尖紋身藝術家，結合潮流市集、音樂與美食。", en: "An international-level tattoo art expo, gathering top tattoo artists from around the globe, combined with a trendy market, music, and food." },
    organizer: "PMQ元創方",
    organizer_icon: "https://picsum.photos/seed/pmq/100/100",
    image: "https://cdn.am730.com.hk/s3fs-public/styles/article_image/public/2025-09/Picture%204.jpg?itok=3jawrfJZ&timestamp=1759233267",
    region: "港島",
    type: "展覽",
    isFeatured: true,
    url: "https://www.pmq.org.hk/",
  },
  {
    id: 8,
    title: { zh: "Obellery 金工銀飾製作工作坊", en: "Obellery Metal & Silver Jewellery Workshop" },
    date: "需預約",
    time: { zh: "見官網", en: "See official website" },
    location: { zh: "中環", en: "Central" },
    description: { zh: "學習基本的金工技術，如鋸切、鍛敲、焊接和打磨，親手用純銀或黃銅等材料製作戒指、手鐲或吊墜。", en: "Learn basic metalworking techniques such as sawing, forging, soldering, and polishing to create your own rings, bracelets, or pendants from sterling silver or brass." },
    organizer: "Obellery",
    organizer_icon: "https://picsum.photos/seed/obellery/100/100",
    image: "https://www.pmq.org.hk/media/upload/H403_Obellery_Beginner-Jewellery-Workshop-by-Obellery_updated_20230601_KV.jpg",
    region: "港島",
    type: "工作坊",
    url: "https://obellery.com/",
  },
];

export const ORDERS: Order[] = [
    {
        id: "HK2024-001",
        customerName: "陳小姐",
        product: PRODUCTS.find(p => p.id === 1)!,
        quantity: 1,
        total: 1888,
        date: "2024-07-20",
        status: "待處理"
    },
    {
        id: "HK2024-002",
        customerName: "Mr. Smith",
        product: PRODUCTS.find(p => p.id === 5)!,
        quantity: 2,
        total: 1160,
        date: "2024-07-19",
        status: "已發貨"
    },
    {
        id: "HK2024-003",
        customerName: "王先生",
        product: PRODUCTS.find(p => p.id === 1)!,
        quantity: 1,
        total: 1888,
        date: "2024-07-18",
        status: "已完成"
    },
    {
        id: "HK2024-004",
        customerName: "李小姐",
        product: PRODUCTS.find(p => p.id === 5)!,
        quantity: 4,
        total: 2320,
        date: "2024-07-15",
        status: "已取消"
    },
];

export const MESSAGE_THREADS: MessageThread[] = [
    {
        id: "MSG-001",
        customerName: "陳小姐",
        lastMessage: "你好！請問關於廣彩茶具，可以訂製圖案嗎？",
        timestamp: "下午 3:45",
        unread: true,
        avatar: "https://picsum.photos/seed/msg1/100/100",
        productId: 1
    },
    {
        id: "MSG-002",
        customerName: "Mr. Smith",
        lastMessage: "Thank you for the quick shipping!",
        timestamp: "上午 11:20",
        unread: true,
        avatar: "https://picsum.photos/seed/msg2/100/100",
        productId: 5
    },
    {
        id: "MSG-003",
        customerName: "設計師 Ada",
        lastMessage: "你好，上次關於AI創作的聯絡，想討論一下實體化的可能性...",
        timestamp: "昨天",
        unread: true,
        avatar: "https://picsum.photos/seed/msg3/100/100",
        productId: 2
    },
    {
        id: "MSG-004",
        customerName: "王先生",
        lastMessage: "收到了，非常滿意！",
        timestamp: "星期二",
        unread: false,
        avatar: "https://picsum.photos/seed/msg4/100/100",
        productId: 1
    },
];

// TextLab Glyph Library
export const GLYPH_LIBRARY: { name: string; glyph: GlyphName }[] = [
  { name: '手', glyph: 'shou' },
  { name: '田', glyph: 'tian' },
  { name: '水', glyph: 'shui' },
  { name: '口', glyph: 'kou' },
  { name: '廿', glyph: 'nian' },
  { name: '卜', glyph: 'bu' },
  { name: '山', glyph: 'shan' },
  { name: '戈', glyph: 'ge' },
  { name: '人', glyph: 'ren' },
  { name: '心', glyph: 'xin' },
  { name: '日', glyph: 'ri' },
  { name: '尸', glyph: 'shi' },
  { name: '木', glyph: 'mu' },
  { name: '火', glyph: 'huo' },
  { name: '土', glyph: 'tu' },
  { name: '竹', glyph: 'zhu' },
  { name: '大', glyph: 'da' },
  { name: '中', glyph: 'zhong' },
  { name: '金', glyph: 'jin' },
  { name: '女', glyph: 'nu' },
  { name: '月', glyph: 'yue' },
  { name: '弓', glyph: 'gong' },
  { name: '一', glyph: 'heng' },
  { name: '丨', glyph: 'shu' },
  { name: '丿', glyph: 'pie' },
  { name: '㇏', glyph: 'na' },
  { name: '㇔', glyph: 'dian' },
  { name: '𠃋', glyph: 'ti' },
];
