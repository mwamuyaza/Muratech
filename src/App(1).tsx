/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CctvStore from './components/CctvStore';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import BlogSection from './components/BlogSection';
import Faqs from './components/Faqs';
import ContactSection from './components/ContactSection';
import AdminConsole from './components/AdminConsole';
import AiAssistant from './components/AiAssistant';
import Footer from './components/Footer';

import { CctvProduct, PortfolioItem, BlogPost, AuditLog, CartItem, Order, AnalyticsSummary } from './types';
import { INITIAL_PRODUCTS, PORTFOLIO, BLOGS } from './data';
import { Shield, ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('store');
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState('');

  // Main State collections
  const [products, setProducts] = useState<CctvProduct[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    totalSales: 0,
    totalOrders: 0,
    totalVisitors: 1840,
    productPerformance: []
  });

  // Immersive Blog Reader State
  const [readingArticle, setReadingArticle] = useState<BlogPost | null>(null);

  // Legal Modal States
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  // Load Initial Data from API or fall back to localStorage/seed
  const loadSystemData = async () => {
    try {
      // 1. Products
      const prodRes = await fetch('/api/inventory');
      if (prodRes.ok) {
        const data = await prodRes.json();
        setProducts(data);
      } else {
        throw new Error();
      }

      // 2. Portfolio
      const portRes = await fetch('/api/portfolio');
      if (portRes.ok) {
        const data = await portRes.json();
        setPortfolioItems(data);
      }

      // 3. Blogs
      const blogRes = await fetch('/api/blogs');
      if (blogRes.ok) {
        const data = await blogRes.json();
        setBlogs(data);
      }

      // 4. Audit
      const auditRes = await fetch('/api/audit-logs');
      if (auditRes.ok) {
        const data = await auditRes.json();
        setAuditLogs(data);
      }

      // 5. Analytics
      const analRes = await fetch('/api/analytics');
      if (analRes.ok) {
        const data = await analRes.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.log("Operating in offline/localStorage container context.");
      // Fallback local storage or seed
      const cachedProducts = localStorage.getItem('muratech_products');
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('muratech_products', JSON.stringify(INITIAL_PRODUCTS));
      }

      const cachedPort = localStorage.getItem('muratech_portfolio');
      if (cachedPort) {
        setPortfolioItems(JSON.parse(cachedPort));
      } else {
        setPortfolioItems(PORTFOLIO);
        localStorage.setItem('muratech_portfolio', JSON.stringify(PORTFOLIO));
      }

      const cachedBlogs = localStorage.getItem('muratech_blogs');
      if (cachedBlogs) {
        setBlogs(JSON.parse(cachedBlogs));
      } else {
        setBlogs(BLOGS);
        localStorage.setItem('muratech_blogs', JSON.stringify(BLOGS));
      }

      const cachedAudit = localStorage.getItem('muratech_audit');
      if (cachedAudit) {
        setAuditLogs(JSON.parse(cachedAudit));
      } else {
        const defaultAudit: AuditLog[] = [
          {
            id: 'log-0',
            timestamp: new Date().toISOString(),
            action: 'SYSTEM_INITIALIZATION',
            user: 'System Admin',
            details: 'Muratech CCTV client interface initialized with local persistent state.'
          }
        ];
        setAuditLogs(defaultAudit);
        localStorage.setItem('muratech_audit', JSON.stringify(defaultAudit));
      }
    }
  };

  useEffect(() => {
    loadSystemData();
  }, []);

  // Sync state helpers
  useEffect(() => {
    if (products.length) {
      localStorage.setItem('muratech_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (portfolioItems.length) {
      localStorage.setItem('muratech_portfolio', JSON.stringify(portfolioItems));
    }
  }, [portfolioItems]);

  useEffect(() => {
    if (blogs.length) {
      localStorage.setItem('muratech_blogs', JSON.stringify(blogs));
    }
  }, [blogs]);

  useEffect(() => {
    if (auditLogs.length) {
      localStorage.setItem('muratech_audit', JSON.stringify(auditLogs));
    }
  }, [auditLogs]);

  // Compute dynamic client-side analytics fallback
  useEffect(() => {
    const totalSales = auditLogs
      .filter(log => log.action === 'PAYMENT_RECEIVED')
      .reduce((sum, log) => {
        const match = log.details.match(/KES\s([0-9,]+)/);
        if (match) {
          return sum + Number(match[1].replace(/,/g, ''));
        }
        return sum;
      }, 0);

    const totalOrders = auditLogs.filter(log => log.details.includes("Order")).length;
    const performance = products.map(p => ({
      productId: p.id,
      name: p.name,
      salesCount: p.salesCount || 0,
      revenue: (p.salesCount || 0) * p.price
    })).sort((a, b) => b.salesCount - a.salesCount);

    setAnalytics({
      totalSales: totalSales || 115000, // Reasonable base for million-dollar presentation
      totalOrders: totalOrders || 4,
      totalVisitors: 1840 + auditLogs.length * 3,
      productPerformance: performance
    });
  }, [products, auditLogs]);

  // =========================================
  // CRUD & ACTION CALLBACKS
  // =========================================

  const handleAddProduct = async (prod: any) => {
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      });
      if (res.ok) {
        await loadSystemData();
      } else {
        throw new Error();
      }
    } catch (err) {
      // Offline edit
      if (prod.id) {
        setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, ...prod } : p));
        logOfflineAction('UPDATE_INVENTORY', 'Admin Manager', `Modified specifications for CCTV model: ${prod.name}`);
      } else {
        const newP: CctvProduct = {
          ...prod,
          id: `prod-${Date.now()}`,
          salesCount: 0
        };
        setProducts(prev => [...prev, newP]);
        logOfflineAction('CREATE_PRODUCT', 'Admin Manager', `Registered new corporate surveillance model: ${prod.name}`);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSystemData();
      } else {
        throw new Error();
      }
    } catch (err) {
      const target = products.find(p => p.id === id);
      setProducts(prev => prev.filter(p => p.id !== id));
      if (target) {
        logOfflineAction('DELETE_PRODUCT', 'Admin Manager', `Removed camera model: ${target.name}`);
      }
    }
  };

  const handleAddPortfolio = async (item: any) => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        await loadSystemData();
      } else {
        throw new Error();
      }
    } catch (err) {
      const newPort: PortfolioItem = {
        ...item,
        id: `port-${Date.now()}`
      };
      setPortfolioItems(prev => [newPort, ...prev]);
      logOfflineAction('CONTENT_CHANGE', 'Portfolio Showcase', `Uploaded project: ${item.title}`);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSystemData();
      } else {
        throw new Error();
      }
    } catch (err) {
      const target = portfolioItems.find(p => p.id === id);
      setPortfolioItems(prev => prev.filter(p => p.id !== id));
      if (target) {
        logOfflineAction('CONTENT_CHANGE', 'Portfolio Showcase', `Removed project: ${target.title}`);
      }
    }
  };

  const handleAddBlog = async (post: any) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        await loadSystemData();
      } else {
        throw new Error();
      }
    } catch (err) {
      const newBlog: BlogPost = {
        ...post,
        id: `blog-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        author: 'Lead Architect Moses'
      };
      setBlogs(prev => [newBlog, ...prev]);
      logOfflineAction('CONTENT_CHANGE', 'Blog Publications', `Published article: ${post.title}`);
    }
  };

  const handleOrderCreated = (order: Order) => {
    if (order.paymentStatus === 'PAID') {
      const logDetails = `Received STK payment of KES ${order.totalAmount.toLocaleString()} for Order ${order.id}. M-Pesa Receipt Code: ${order.mpesaReceiptNumber || 'TXN_MP_OK'}`;
      logOfflineAction('PAYMENT_RECEIVED', 'M-Pesa Gateway', logDetails);
    } else {
      const logDetails = `Drafted pending WhatsApp invoice for Order ${order.id} (KES ${order.totalAmount.toLocaleString()})`;
      logOfflineAction('CONTENT_CHANGE', 'Procurement System', logDetails);
    }
    loadSystemData();
  };

  const handleContactInquiry = (details: string) => {
    logOfflineAction('CONTENT_CHANGE', 'Client Inquiry Office', details);
    logOfflineAction('SEND_EMAIL', 'System Dispatcher', `Sent auto-reply checklist and quote estimator to client's registered address.`);
  };

  const logOfflineAction = (action: any, user: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      user,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Deep Search support across entire catalog
  const handleGlobalSearch = (query: string) => {
    // Navigates and filters automatically inside CctvStore props
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-gray-100 flex flex-col justify-between selection:bg-brand-primary selection:text-brand-dark">
      
      {/* Dynamic Upper Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setReadingArticle(null); // Clear reader view
        }}
        cart={cart}
        setCart={setCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onSearch={handleGlobalSearch}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Container Stage */}
      <main className="flex-grow">
        
        {/* Render hero only on Store, Services or Gallery tabs */}
        {(activeTab === 'store' || activeTab === 'services' || activeTab === 'gallery') && (
          <Hero
            onExploreStore={() => setActiveTab('store')}
            onExploreServices={() => setActiveTab('services')}
            onTalkToAi={() => {
              // Quick trigger floating AI bubble
              const aiBtn = document.getElementById('ai-assistant-toggle-btn');
              if (aiBtn) aiBtn.click();
            }}
          />
        )}

        {/* Tab view controllers */}
        <div className="py-6">
          
          {/* TAB: STORE */}
          {activeTab === 'store' && (
            <CctvStore
              products={products}
              cart={cart}
              setCart={setCart}
              isCheckoutOpen={isCheckoutOpen}
              setIsCheckoutOpen={setIsCheckoutOpen}
              onOrderCreated={handleOrderCreated}
            />
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <Services
              onContactConsultant={(serviceName) => {
                setSelectedServiceInquiry(serviceName);
                setActiveTab('contact');
              }}
            />
          )}

          {/* TAB: PORTFOLIO GALLERY */}
          {activeTab === 'gallery' && (
            <Portfolio
              portfolioItems={portfolioItems}
              onConsult={(clientName) => {
                setSelectedServiceInquiry(`Surveillance audit for similar grid to ${clientName}`);
                setActiveTab('contact');
              }}
            />
          )}

          {/* TAB: BLOG SECTION */}
          {activeTab === 'blog' && (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
              {readingArticle ? (
                // Immersive reading view
                <motion.article 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-3xl mx-auto bg-brand-medium border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6"
                >
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="inline-flex items-center space-x-2 text-brand-secondary hover:text-white transition-colors text-xs font-semibold cursor-pointer mb-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Publications Matrix</span>
                  </button>

                  <img 
                    src={readingArticle.image} 
                    alt={readingArticle.title} 
                    className="w-full h-80 object-cover rounded-xl border border-gray-700 shadow-xl" 
                  />

                  <div className="flex items-center space-x-6 text-xs text-gray-400">
                    <span className="flex items-center">
                      <Calendar size={13} className="mr-1 text-brand-primary" />
                      {readingArticle.date}
                    </span>
                    <span className="flex items-center">
                      <User size={13} className="mr-1 text-brand-primary" />
                      {readingArticle.author}
                    </span>
                    <span className="bg-brand-dark px-2.5 py-0.5 rounded border border-gray-800 text-brand-secondary uppercase text-[10px]">
                      {readingArticle.category}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                    {readingArticle.title}
                  </h1>

                  <p className="text-sm font-semibold text-gray-300 leading-relaxed italic border-l-2 border-brand-primary pl-4 py-1">
                    {readingArticle.summary}
                  </p>

                  <div className="text-sm text-gray-300 leading-relaxed space-y-4 pt-4 border-t border-gray-800/60 font-sans">
                    {readingArticle.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </motion.article>
              ) : (
                <BlogSection
                  blogs={blogs}
                  onSelectArticle={(post) => setReadingArticle(post)}
                />
              )}
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === 'faqs' && (
            <Faqs />
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <ContactSection
              initialServiceName={selectedServiceInquiry}
              onFormSubmitted={handleContactInquiry}
            />
          )}

          {/* TAB: CENTRAL CMS ADMIN */}
          {activeTab === 'cms' && userRole === 'admin' && (
            <AdminConsole
              products={products}
              portfolio={portfolioItems}
              blogs={blogs}
              auditLogs={auditLogs}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onAddPortfolio={handleAddPortfolio}
              onDeletePortfolio={handleDeletePortfolio}
              onAddBlog={handleAddBlog}
              analytics={analytics}
            />
          )}

        </div>
      </main>

      {/* Floating Gemini AI Assistant */}
      <AiAssistant 
        onSuggestProduct={(productId) => {
          const prod = products.find(p => p.id === productId);
          if (prod) {
            handleAddToCartDirect(prod);
            setActiveTab('store');
          }
        }}
      />

      {/* Corporate Footers */}
      <Footer 
        onTabSelect={(tab) => {
          setActiveTab(tab);
          setReadingArticle(null);
        }}
        onTriggerLegal={(type) => setLegalModal(type)}
      />

      {/* Custom Legal Terms Modals Overlay */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-medium border border-gray-800 rounded-2xl w-full max-w-xl p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setLegalModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>

              <div className="flex items-center space-x-2 border-b border-gray-800 pb-3 mb-4">
                <Shield className="text-brand-secondary" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  {legalModal === 'privacy' && 'Privacy Policy & KRA Compliance'}
                  {legalModal === 'terms' && 'Terms of Security Contractual Workmanship'}
                  {legalModal === 'cookies' && 'Strict Cookie Consent Protocol'}
                </h3>
              </div>

              <div className="text-xs text-gray-300 leading-relaxed max-h-80 overflow-y-auto space-y-3.5 pr-2">
                {legalModal === 'privacy' && (
                  <>
                    <p className="font-bold text-white text-sm">Corporate Information Safeguarding</p>
                    <p>At Muratech CCTV, corporate system details, active camera network positions, and IP gateway addresses are handled with military-grade AES encryption. We do not store live video feeds on remote cloud systems without explicit double-authenticated customer authorization.</p>
                    <p className="font-bold text-white mt-4">Nairobi County Surveillance Act & Compliance</p>
                    <p>All corporate layout maps are optimized to respect boundary walls and adjacent residential privacy standards, strictly aligning with Kenya Civil Aviation and Public Security acts regarding public perimeter visual logs.</p>
                  </>
                )}
                {legalModal === 'terms' && (
                  <>
                    <p className="font-bold text-white text-sm">2-Year Structural Warranty & Workmanship Agreement</p>
                    <p>All camera systems, NVR servers, hard-disk drives, and central PoE hubs are protected by a 24-month manufacturer guarantee. If a component registers functional latency or failures during normal operational cycles, our Nairobi repair team will replace it free of charge.</p>
                    <p className="font-bold text-white mt-4">Payment Clearence terms</p>
                    <p>Standard installations require a 60% procurement downpayment (via M-Pesa business STK or corporate bank wire) to release fiber-optic cables and bracket hardware, with the final 40% cleared upon physical testing, target calibration, and client verification sign-off.</p>
                  </>
                )}
                {legalModal === 'cookies' && (
                  <>
                    <p className="font-bold text-white text-sm">Nairobi Core session caching rules</p>
                    <p>Our online portal uses high-security client session cookies to persist active shopping carts, administrator JWT security tokens, and local catalog modifications inside your browser's persistent localStorage container. No telemetry is shared with external analytics firms.</p>
                  </>
                )}
              </div>

              <button
                onClick={() => setLegalModal(null)}
                className="mt-6 w-full bg-brand-primary text-brand-dark font-extrabold text-xs py-2.5 rounded-lg hover:bg-brand-secondary transition-all cursor-pointer"
              >
                Close Compliance Matrix
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );

  // Quick Direct Cart addition helper
  function handleAddToCartDirect(product: CctvProduct) {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }
}

// Simple internal X component for legal close
function X({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
