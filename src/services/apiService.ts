import { Product, BlogPost, FAQItem, Testimonial, Order, AuditLog, ContactInfo, SEOSettings } from '../types';

// The default Spring Boot API endpoint URL
// In production, this can be customized, or left relative to point to an NGINX reverse-proxy
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

class ApiService {
  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = sessionStorage.getItem('muratech_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Products Endpoints ---
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  }

  async updateProduct(product: Product): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  }

  async deleteProduct(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- Blog Posts Endpoints ---
  async getBlogs(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  }

  async addBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(blog),
    });
    if (!response.ok) throw new Error('Failed to create blog post');
    return response.json();
  }

  async updateBlog(blog: BlogPost): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blogs/${blog.id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(blog),
    });
    if (!response.ok) throw new Error('Failed to update blog post');
    return response.json();
  }

  async deleteBlog(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- FAQ Endpoints ---
  async getFaqs(): Promise<FAQItem[]> {
    const response = await fetch(`${API_BASE_URL}/faqs`);
    if (!response.ok) throw new Error('Failed to fetch FAQs');
    return response.json();
  }

  async addFaq(faq: Omit<FAQItem, 'id'>): Promise<FAQItem> {
    const response = await fetch(`${API_BASE_URL}/faqs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(faq),
    });
    if (!response.ok) throw new Error('Failed to add FAQ');
    return response.json();
  }

  async updateFaq(faq: FAQItem): Promise<FAQItem> {
    const response = await fetch(`${API_BASE_URL}/faqs/${faq.id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(faq),
    });
    if (!response.ok) throw new Error('Failed to update FAQ');
    return response.json();
  }

  async deleteFaq(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- Testimonials Endpoints ---
  async getTestimonials(): Promise<Testimonial[]> {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  }

  async addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) throw new Error('Failed to add testimonial');
    return response.json();
  }

  async updateTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const response = await fetch(`${API_BASE_URL}/testimonials/${testimonial.id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) throw new Error('Failed to update testimonial');
    return response.json();
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- Orders Endpoints ---
  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }

  async placeOrder(order: Omit<Order, 'id'>): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to place order');
    return response.json();
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  }

  async deleteOrder(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- Settings (Contact & SEO) Endpoints ---
  async getContactInfo(): Promise<ContactInfo> {
    const response = await fetch(`${API_BASE_URL}/settings/contact`);
    if (!response.ok) throw new Error('Failed to fetch contact details');
    return response.json();
  }

  async updateContactInfo(info: ContactInfo): Promise<ContactInfo> {
    const response = await fetch(`${API_BASE_URL}/settings/contact`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(info),
    });
    if (!response.ok) throw new Error('Failed to update contact info');
    return response.json();
  }

  async getSeoSettings(): Promise<SEOSettings> {
    const response = await fetch(`${API_BASE_URL}/settings/seo`);
    if (!response.ok) throw new Error('Failed to fetch SEO metadata');
    return response.json();
  }

  async updateSeoSettings(seo: SEOSettings): Promise<SEOSettings> {
    const response = await fetch(`${API_BASE_URL}/settings/seo`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(seo),
    });
    if (!response.ok) throw new Error('Failed to update SEO settings');
    return response.json();
  }

  // --- Audit Logs Endpoints ---
  async getAuditLogs(): Promise<AuditLog[]> {
    const response = await fetch(`${API_BASE_URL}/audit-logs`);
    if (!response.ok) throw new Error('Failed to fetch audit trails');
    return response.json();
  }

  async addAuditLog(log: Omit<AuditLog, 'id'>): Promise<AuditLog> {
    const response = await fetch(`${API_BASE_URL}/audit-logs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(log),
    });
    if (!response.ok) throw new Error('Failed to upload audit log');
    return response.json();
  }

  async clearAuditLogs(): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/audit-logs`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // --- Admin Authentication Endpoints ---
  async login(password: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Access Denied' }));
      throw new Error(err.error || 'Authentication failure');
    }
    return response.json();
  }

  async changePassword(oldPassword: String, newPassword: String): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username: 'admin', oldPassword, newPassword }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Failed to update credentials' }));
      throw new Error(err.error || 'Password update failed');
    }
    return response.json();
  }
}

export const apiService = new ApiService();
