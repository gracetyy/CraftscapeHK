

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface Craft {
  id: number;
  name: LocalizedString;
  artisan: LocalizedString;
  short_description: LocalizedString;
  full_description: LocalizedString;
  images: string[];
  history: LocalizedString;
  story: LocalizedString;
  category?: string;
}

export interface Artisan {
  id: number;
  name: LocalizedString;
  bio: string;
  image: string;
  craftIds: number[];
}

export interface Event {
  id: number;
  title: LocalizedString;
  date: string;
  time: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  organizer: string;
  organizer_icon: string;
  image: string;
  region: '港島' | '九龍' | '新界' | '線上';
  type: '工作坊' | '展覽' | '講座';
  isFeatured?: boolean;
  url: string;
}

export interface Product {
  id: number;
  name: LocalizedString;
  price: number;
  priceDisplay: LocalizedString;
  priceSubDisplay?: LocalizedString;
  image: string;
  artisan: LocalizedString;
  full_description: LocalizedString;
  category?: string;
}

export type OrderStatus = '待處理' | '已發貨' | '已完成' | '已取消';

export interface Order {
    id: string;
    customerName: string;
    product: Product;
    quantity: number;
    total: number;
    date: string;
    status: OrderStatus;
}

export interface MessageThread {
    id: string;
    customerName: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    avatar: string;
    productId: number;
}

export interface AiCreation {
  id: string;
  craftId: number;
  craftName: string;
  prompt: string;
  imageUrl: string;
}

// TextLab specific types
export type GlyphName = 
  | 'shou' | 'tian' | 'shui' | 'kou' | 'nian' | 'bu' | 'shan' | 'ge' | 'ren' | 'xin'
  | 'ri' | 'shi' | 'mu' | 'huo' | 'tu' | 'zhu' | 'da' | 'zhong' | 'jin' | 'nu'
  | 'yue' | 'gong' | 'heng' | 'shu' | 'pie' | 'na' | 'dian' | 'ti';

export interface CanvasElement {
  id: string;
  glyph: GlyphName;
  char: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
  fontWeight: number;
  isMirror: boolean;
  isOutline: boolean;
}

export interface AiLayout {
  description: string;
  elements: Omit<CanvasElement, 'id' | 'zIndex' | 'char'>[];
}
