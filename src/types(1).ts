/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CctvProduct {
  id: string;
  name: string;
  category: 'Bullet' | 'Dome' | 'PTZ' | 'NVR/DVR' | 'Accessories';
  brand: 'Hikvision' | 'Dahua' | 'Muratech Pro' | 'Anker' | 'UniView';
  description: string;
  price: number; // in KES (Kenyan Shillings)
  image: string;
  stock: number;
  resolution?: string; // e.g. "4K (8MP)", "5MP", "1080p"
  features: string[];
  salesCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Industrial' | 'Corporate Office' | 'Retail' | 'Residential';
  image: string;
  description: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: 'Surveillance Tech' | 'Enterprise Security' | 'Local Events' | 'Maintenance Tips';
  date: string;
  author: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Installation' | 'Pricing & Payment' | 'Technical Support' | 'Warranty';
}

export interface CartItem {
  product: CctvProduct;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: 'MPESA_STK' | 'WHATSAPP_CONFIRM';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  deliveryStatus: 'PROCESSING' | 'DISPATCHED' | 'INSTALLED';
  createdAt: string;
  mpesaReceiptNumber?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: 'UPDATE_INVENTORY' | 'CREATE_PRODUCT' | 'DELETE_PRODUCT' | 'PAYMENT_RECEIVED' | 'SEND_EMAIL' | 'CONTENT_CHANGE' | 'SYSTEM_INITIALIZATION';
  user: string;
  details: string;
}

export interface AnalyticsSummary {
  totalSales: number;
  totalOrders: number;
  totalVisitors: number;
  productPerformance: {
    productId: string;
    name: string;
    salesCount: number;
    revenue: number;
  }[];
}
