/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isSale?: boolean;
  isNew?: boolean;
  stock: number;
  description: string;
  features: string[]; // key-value features e.g. ["Handmade premium finish", "Water-resistant coating"]
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  views: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: 'bkash' | 'nagad' | 'card' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  transactionId?: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export type FontPairing = 'classic' | 'modern' | 'editorial' | 'minimalist';

export interface ThemeSettings {
  announcementText: string;
  announcementBg: string;
  announcementColor: string;
  showAnnouncement: boolean;
  
  logoText: string;
  accentColor: string;
  primaryBg: string;
  cardBg: string;
  textColor: string;
  fontPairing: FontPairing;
  
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBtnText: string;
  heroBgUrl: string;
  
  showFeatures: boolean;
  showAbout: boolean;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  aboutLinkText: string;
  
  // Custom theme section order sorting
  sections: string[]; // e.g., ["announcement", "header", "hero", "features", "products", "blog", "about", "payment_bar", "footer"]
}
