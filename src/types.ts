/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'dome' | 'bullet' | 'ptz' | 'nvr' | 'accessories' | 'package';
  image: string;
  stock: number;
  features: string[];
  resolution: string;
  isWireless: boolean;
  rating: number;
  modelNumber: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  basePrice: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'security' | 'technology' | 'installation' | 'corporate';
  author: string;
  date: string;
  image: string;
  isNews?: boolean;
  isEvent?: boolean;
  eventDate?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  category: 'enterprise' | 'installation' | 'products' | 'team';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'technical' | 'billing' | 'installation' | 'general';
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'mpesa_stk' | 'mpesa_c2b' | 'whatsapp';
  paymentStatus: 'pending' | 'completed' | 'failed';
  date: string;
  invoiceNumber: string;
  receiptNumber?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  type: 'create' | 'update' | 'delete' | 'payment' | 'email' | 'system';
  user: string;
  timestamp: string;
  details: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebook: string;
  twitter: string;
  tiktok: string;
  instagram: string;
}

export interface SystemStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalBlogs: number;
  visitorsToday: number;
  pendingInstallations: number;
}
