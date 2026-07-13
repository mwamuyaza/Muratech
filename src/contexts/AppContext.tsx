/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ServiceItem, 
  BlogPost, 
  GalleryItem, 
  FAQItem, 
  Testimonial, 
  Order, 
  AuditLog, 
  SEOSettings, 
  ContactInfo,
  SystemStats
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_GALLERY, 
  INITIAL_FAQS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_SEO_SETTINGS, 
  INITIAL_CONTACT_INFO 
} from '../data';
import { apiService } from '../services/apiService';

interface AppContextProps {
  dbMode: 'local' | 'mysql';
  toggleDbMode: () => void;
  products: Product[];
  services: ServiceItem[];
  blogs: BlogPost[];
  gallery: GalleryItem[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  seoSettings: SEOSettings;
  orders: Order[];
  auditLogs: AuditLog[];
  cart: { product: Product; quantity: number }[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  systemStats: SystemStats;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Checkout Process
  placeOrder: (name: string, phone: string, email: string, paymentMethod: 'mpesa_stk' | 'mpesa_c2b' | 'whatsapp') => Promise<Order>;
  
  // Admin Operations (CRUD)
  addProduct: (p: Omit<Product, 'id'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  
  addBlogPost: (b: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (b: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  addGalleryItem: (g: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (g: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  
  addFAQItem: (f: Omit<FAQItem, 'id'>) => void;
  updateFAQItem: (f: FAQItem) => void;
  deleteFAQItem: (id: string) => void;

  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  
  updateContactInfo: (info: ContactInfo) => void;
  updateSEOSettings: (settings: SEOSettings) => void;
  
  // Logs & Simulation
  addAuditLog: (action: string, type: AuditLog['type'], details: string) => void;
  clearAuditLogs: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load initial states from localStorage if they exist, otherwise use static data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('muratech_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('muratech_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('muratech_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });
  
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('muratech_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });
  
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('muratech_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('muratech_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });
  
  const [contactInfo, setContactInfoState] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('muratech_contact_info');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_INFO;
  });
  
  const [seoSettings, setSeoSettingsState] = useState<SEOSettings>(() => {
    const saved = localStorage.getItem('muratech_seo_settings');
    return saved ? JSON.parse(saved) : INITIAL_SEO_SETTINGS;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('muratech_orders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('muratech_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-initial',
        action: 'System Bootstrapped',
        type: 'system',
        user: 'Enterprise Security Daemon',
        timestamp: new Date().toISOString(),
        details: 'Muratech CCTV database engine successfully started. Secure endpoints configured.'
      }
    ];
  });

  const [dbMode, setDbMode] = useState<'local' | 'mysql'>(() => {
    return (localStorage.getItem('muratech_db_mode') as 'local' | 'mysql') || 'local';
  });

  const toggleDbMode = () => {
    const nextMode = dbMode === 'local' ? 'mysql' : 'local';
    setDbMode(nextMode);
    localStorage.setItem('muratech_db_mode', nextMode);
    addAuditLog('Database Mode Toggle', 'system', `Switched global connection standard to ${nextMode.toUpperCase()}`);
    // Refresh page to trigger initial reload of the correct mode
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Synchronize data from Spring Boot if in mysql mode
  useEffect(() => {
    if (dbMode === 'mysql') {
      const loadDataFromApi = async () => {
        try {
          const fetchedProducts = await apiService.getProducts();
          if (fetchedProducts && fetchedProducts.length > 0) setProducts(fetchedProducts);
          
          const fetchedBlogs = await apiService.getBlogs();
          if (fetchedBlogs && fetchedBlogs.length > 0) setBlogs(fetchedBlogs);

          const fetchedFaqs = await apiService.getFaqs();
          if (fetchedFaqs && fetchedFaqs.length > 0) setFaqs(fetchedFaqs);

          const fetchedTestimonials = await apiService.getTestimonials();
          if (fetchedTestimonials && fetchedTestimonials.length > 0) setTestimonials(fetchedTestimonials);

          const fetchedContact = await apiService.getContactInfo();
          if (fetchedContact) setContactInfoState(fetchedContact);

          const fetchedSeo = await apiService.getSeoSettings();
          if (fetchedSeo) setSeoSettingsState(fetchedSeo);

          const fetchedOrders = await apiService.getOrders();
          if (fetchedOrders) setOrders(fetchedOrders);

          const fetchedLogs = await apiService.getAuditLogs();
          if (fetchedLogs) setAuditLogs(fetchedLogs);

          addAuditLog('SQL Synced', 'system', 'Successfully fetched synchronized records from live MySQL database via Spring Boot.');
        } catch (err) {
          console.error("Failed to connect to Spring Boot API, using local mock data:", err);
          addAuditLog('Connection Failed', 'system', 'Failed to reach Spring Boot API server on port 8080. Operating on standard local storage sandbox.');
        }
      };

      loadDataFromApi();
    }
  }, [dbMode]);
  
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalBlogs: 0,
    visitorsToday: 1420,
    pendingInstallations: 4
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('muratech_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('muratech_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('muratech_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('muratech_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('muratech_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('muratech_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('muratech_contact_info', JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem('muratech_seo_settings', JSON.stringify(seoSettings));
  }, [seoSettings]);

  useEffect(() => {
    localStorage.setItem('muratech_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('muratech_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Dynamic system stats calculation
  useEffect(() => {
    const totalSales = orders
      .filter(o => o.paymentStatus === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders = orders.length;
    const pendingInstallations = orders.filter(o => o.paymentStatus === 'completed').length + 3;
    
    setSystemStats({
      totalSales,
      totalOrders,
      totalProducts: products.length,
      totalBlogs: blogs.length,
      visitorsToday: 1420 + orders.length * 15,
      pendingInstallations
    });
  }, [orders, products, blogs]);

  // Audit Logger Helper
  const addAuditLog = (action: string, type: AuditLog['type'], details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      action,
      type,
      user: 'Administrator',
      timestamp: new Date().toISOString(),
      details
    };
    
    if (dbMode === 'mysql') {
      apiService.addAuditLog(newLog).catch(err => {
        console.error("Failed to push audit log to MySQL:", err);
      });
    }

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const clearAuditLogs = async () => {
    if (dbMode === 'mysql') {
      try {
        await apiService.clearAuditLogs();
      } catch (err) {
        console.error("Failed to clear MySQL audit logs:", err);
      }
    }
    setAuditLogs([]);
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
    addAuditLog('Cart Modification', 'system', `Added ${quantity}x ${product.name} to active user cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addAuditLog('Cart Modification', 'system', `Removed product ID: ${productId} from active user cart.`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: Math.min(item.product.stock, quantity) }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout Protocol Simulation (Supports STK Push, C2B, WhatsApp)
  const placeOrder = async (
    name: string, 
    phone: string, 
    email: string, 
    paymentMethod: 'mpesa_stk' | 'mpesa_c2b' | 'whatsapp'
  ): Promise<Order> => {
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const id = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const invoiceNumber = `INV-2026-${Date.now().toString().slice(-5)}`;
    const receiptNumber = paymentMethod !== 'whatsapp' ? `REC-MPESA-${Date.now().toString().slice(-5)}` : undefined;

    // Build the Order object
    const newOrder: Order = {
      id,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      items: orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'mpesa_stk' || paymentMethod === 'mpesa_c2b' ? 'completed' : 'pending',
      date: new Date().toISOString(),
      invoiceNumber,
      receiptNumber
    };

    // Deduct stock for items
    setProducts(prev => prev.map(p => {
      const orderedItem = orderItems.find(o => o.productId === p.id);
      if (orderedItem) {
        return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
      }
      return p;
    }));

    // Save order
    if (dbMode === 'mysql') {
      try {
        await apiService.placeOrder(newOrder);
      } catch (err) {
        console.error("Failed to sync order to Spring Boot", err);
      }
    }

    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrder(newOrder);

    // Audit Log Entry
    addAuditLog(
      'Transaction Complete',
      'payment',
      `New order ${id} created via ${paymentMethod.toUpperCase()} by ${name} (${phone}). Total KSh ${totalAmount.toLocaleString()}.`
    );

    // If WhatsApp Checkout selected, we trigger the redirect helper
    if (paymentMethod === 'whatsapp') {
      const message = `Hello Muratech CCTV, I would like to purchase the following items:\n\n` +
        orderItems.map(i => `- ${i.quantity}x ${i.name} (KSh ${i.price.toLocaleString()})`).join('\n') +
        `\n\n*Total Amount:* KSh ${totalAmount.toLocaleString()}` +
        `\n*Order ID:* ${id}` +
        `\n*My Name:* ${name}` +
        `\n*Phone:* ${phone}` +
        `\n*Email:* ${email}` +
        `\n\nPlease send me the invoice and payment instructions.`;
      
      const whatsappUrl = `https://wa.me/254729716092?text=${encodeURIComponent(message)}`;
      
      // Delay slightly and open WhatsApp in a safe manner
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1500);
    }

    clearCart();
    return newOrder;
  };

  // CRUD Operations - Products
  const addProduct = async (p: Omit<Product, 'id'>) => {
    let newProd: Product = {
      ...p,
      id: `prod-${Date.now()}`
    };
    if (dbMode === 'mysql') {
      try {
        const saved = await apiService.addProduct(p);
        newProd = saved;
      } catch (err) {
        console.error("Failed to add product to Spring Boot:", err);
      }
    }
    setProducts(prev => [...prev, newProd]);
    addAuditLog('Product Created', 'create', `Added new product ${newProd.name} under category ${newProd.category.toUpperCase()}.`);
  };

  const updateProduct = async (p: Product) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateProduct(p);
      } catch (err) {
        console.error("Failed to update product in Spring Boot:", err);
      }
    }
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
    addAuditLog('Product Updated', 'update', `Modified product details for ${p.name} (ID: ${p.id}).`);
  };

  const deleteProduct = async (id: string) => {
    const target = products.find(p => p.id === id);
    if (dbMode === 'mysql') {
      try {
        await apiService.deleteProduct(id);
      } catch (err) {
        console.error("Failed to delete product from Spring Boot:", err);
      }
    }
    setProducts(prev => prev.filter(item => item.id !== id));
    if (target) {
      addAuditLog('Product Deleted', 'delete', `Removed product ${target.name} (ID: ${id}) from warehouse inventory.`);
    }
  };

  // CRUD Operations - Blog Posts
  const addBlogPost = async (b: Omit<BlogPost, 'id'>) => {
    let newBlog: BlogPost = {
      ...b,
      id: `blog-${Date.now()}`
    };
    if (dbMode === 'mysql') {
      try {
        const saved = await apiService.addBlog(b);
        newBlog = saved;
      } catch (err) {
        console.error("Failed to add blog to Spring Boot:", err);
      }
    }
    setBlogs(prev => [newBlog, ...prev]);
    addAuditLog('Blog Created', 'create', `Published new article: "${newBlog.title}".`);
  };

  const updateBlogPost = async (b: BlogPost) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateBlog(b);
      } catch (err) {
        console.error("Failed to update blog in Spring Boot:", err);
      }
    }
    setBlogs(prev => prev.map(item => item.id === b.id ? b : item));
    addAuditLog('Blog Updated', 'update', `Edited blog article: "${b.title}" (ID: ${b.id}).`);
  };

  const deleteBlogPost = async (id: string) => {
    const target = blogs.find(b => b.id === id);
    if (dbMode === 'mysql') {
      try {
        await apiService.deleteBlog(id);
      } catch (err) {
        console.error("Failed to delete blog from Spring Boot:", err);
      }
    }
    setBlogs(prev => prev.filter(item => item.id !== id));
    if (target) {
      addAuditLog('Blog Deleted', 'delete', `Removed blog article: "${target.title}" (ID: ${id}).`);
    }
  };

  // CRUD Operations - Gallery
  const addGalleryItem = (g: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...g,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [...prev, newItem]);
    addAuditLog('Gallery Added', 'create', `Added new ${g.type} to gallery under category ${g.category.toUpperCase()}.`);
  };

  const updateGalleryItem = (g: GalleryItem) => {
    setGallery(prev => prev.map(item => item.id === g.id ? g : item));
    addAuditLog('Gallery Updated', 'update', `Updated gallery item caption: "${g.caption}".`);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
    addAuditLog('Gallery Deleted', 'delete', `Deleted gallery item (ID: ${id}).`);
  };

  // CRUD Operations - FAQs
  const addFAQItem = async (f: Omit<FAQItem, 'id'>) => {
    let newItem: FAQItem = {
      ...f,
      id: `faq-${Date.now()}`
    };
    if (dbMode === 'mysql') {
      try {
        const saved = await apiService.addFaq(f);
        newItem = saved;
      } catch (err) {
        console.error("Failed to add FAQ to Spring Boot:", err);
      }
    }
    setFaqs(prev => [...prev, newItem]);
    addAuditLog('FAQ Created', 'create', `Created new FAQ: "${f.question}".`);
  };

  const updateFAQItem = async (f: FAQItem) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateFaq(f);
      } catch (err) {
        console.error("Failed to update FAQ in Spring Boot:", err);
      }
    }
    setFaqs(prev => prev.map(item => item.id === f.id ? f : item));
    addAuditLog('FAQ Updated', 'update', `Updated FAQ: "${f.question}".`);
  };

  const deleteFAQItem = async (id: string) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.deleteFaq(id);
      } catch (err) {
        console.error("Failed to delete FAQ from Spring Boot:", err);
      }
    }
    setFaqs(prev => prev.filter(item => item.id !== id));
    addAuditLog('FAQ Deleted', 'delete', `Deleted FAQ item (ID: ${id}).`);
  };

  // CRUD Operations - Testimonials
  const addTestimonial = async (t: Omit<Testimonial, 'id'>) => {
    let newItem: Testimonial = {
      ...t,
      id: `test-${Date.now()}`
    };
    if (dbMode === 'mysql') {
      try {
        const saved = await apiService.addTestimonial(t);
        newItem = saved;
      } catch (err) {
        console.error("Failed to add testimonial to Spring Boot:", err);
      }
    }
    setTestimonials(prev => [...prev, newItem]);
    addAuditLog('Testimonial Added', 'create', `Added client testimonial from ${t.author} (${t.company}).`);
  };

  const updateTestimonial = async (t: Testimonial) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateTestimonial(t);
      } catch (err) {
        console.error("Failed to update testimonial in Spring Boot:", err);
      }
    }
    setTestimonials(prev => prev.map(item => item.id === t.id ? t : item));
    addAuditLog('Testimonial Updated', 'update', `Updated client testimonial from ${t.author}.`);
  };

  const deleteTestimonial = async (id: string) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.deleteTestimonial(id);
      } catch (err) {
        console.error("Failed to delete testimonial from Spring Boot:", err);
      }
    }
    setTestimonials(prev => prev.filter(item => item.id !== id));
    addAuditLog('Testimonial Deleted', 'delete', `Deleted testimonial (ID: ${id}).`);
  };

  const updateContactInfo = async (info: ContactInfo) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateContactInfo(info);
      } catch (err) {
        console.error("Failed to update contact info in Spring Boot:", err);
      }
    }
    setContactInfoState(info);
    addAuditLog('Contact Settings Changed', 'update', `Modified central corporate contact details.`);
  };

  const updateSEOSettings = async (settings: SEOSettings) => {
    if (dbMode === 'mysql') {
      try {
        await apiService.updateSeoSettings(settings);
      } catch (err) {
        console.error("Failed to update SEO settings in Spring Boot:", err);
      }
    }
    setSeoSettingsState(settings);
    addAuditLog('SEO Settings Changed', 'update', `Updated global search engine optimization parameters.`);
  };

  return (
    <AppContext.Provider value={{
      dbMode,
      toggleDbMode,
      products,
      services,
      blogs,
      gallery,
      faqs,
      testimonials,
      contactInfo,
      seoSettings,
      orders,
      auditLogs,
      cart,
      searchQuery,
      setSearchQuery,
      currentTab,
      setCurrentTab,
      selectedOrder,
      setSelectedOrder,
      systemStats,
      
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      
      addProduct,
      updateProduct,
      deleteProduct,
      
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      
      addFAQItem,
      updateFAQItem,
      deleteFAQItem,

      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      
      updateContactInfo,
      updateSEOSettings,
      
      addAuditLog,
      clearAuditLogs
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
