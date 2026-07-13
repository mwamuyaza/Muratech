/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Settings, 
  FileText, 
  Plus, 
  Trash2, 
  Edit, 
  HelpCircle, 
  MessageSquare,
  Search,
  CheckCircle,
  Database,
  RefreshCw,
  TrendingUp,
  Users,
  Layers,
  Sliders,
  Send,
  Trash,
  Image,
  Lock,
  LogOut
} from 'lucide-react';
import { Product, BlogPost, FAQItem, Testimonial, SEOSettings, ContactInfo, GalleryItem } from '../types';
import ImageUploader from './ImageUploader';
import { apiService } from '../services/apiService';

export default function AdminDashboard() {
  const {
    dbMode, toggleDbMode,
    products, addProduct, updateProduct, deleteProduct,
    blogs, addBlogPost, updateBlogPost, deleteBlogPost,
    faqs, addFAQItem, updateFAQItem, deleteFAQItem,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem,
    contactInfo, updateContactInfo,
    seoSettings, updateSEOSettings,
    auditLogs, clearAuditLogs,
    systemStats, orders
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'products' | 'blogs' | 'gallery' | 'settings' | 'audit'>('stats');

  // Search parameters inside Audit Logs
  const [logSearch, setLogSearch] = useState('');
  const [logFilterType, setLogFilterType] = useState<string>('all');

  // Form states for adding/editing a product
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodCategory, setProdCategory] = useState<Product['category']>('dome');
  const [prodImage, setProdImage] = useState('');
  const [prodStock, setProdStock] = useState(0);
  const [prodResolution, setProdResolution] = useState('8MP (3840 x 2160)');
  const [prodModel, setProdModel] = useState('');

  // Form states for blogs
  const [isEditingBlog, setIsEditingBlog] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState<BlogPost['category']>('security');
  const [blogImage, setBlogImage] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');

  // Form states for gallery items
  const [isEditingGallery, setIsEditingGallery] = useState<string | null>(null);
  const [galCaption, setGalCaption] = useState('');
  const [galCategory, setGalCategory] = useState<GalleryItem['category']>('installation');
  const [galUrl, setGalUrl] = useState('');
  const [galType, setGalType] = useState<'image' | 'video'>('image');

  // Form states for settings
  const [setPhone, setSetPhone] = useState(contactInfo.phone);
  const [setEmail, setSetEmail] = useState(contactInfo.email);
  const [setAddress, setSetAddress] = useState(contactInfo.address);
  const [setSeoTitle, setSetSeoTitle] = useState(seoSettings.metaTitle);
  const [setSeoDesc, setSetSeoDesc] = useState(seoSettings.metaDescription);
  const [setSeoKeywords, setSetSeoKeywords] = useState(seoSettings.keywords.join(', '));

  // Admin authentication and password state management
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('muratech_admin_password') || 'admin123';
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('muratech_admin_logged_in') === 'true';
  });
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dbMode === 'mysql') {
      try {
        const response = await apiService.login(loginInput);
        if (response && response.success) {
          sessionStorage.setItem('muratech_admin_token', response.token);
          sessionStorage.setItem('muratech_admin_logged_in', 'true');
          setIsLoggedIn(true);
          setLoginInput('');
          setLoginError('');
          triggerToast('MySQL credentials verified. Welcome, Administrator.');
        }
      } catch (err: any) {
        setLoginError(err.message || 'Incorrect administration token password.');
      }
    } else {
      if (loginInput === adminPassword) {
        sessionStorage.setItem('muratech_admin_logged_in', 'true');
        setIsLoggedIn(true);
        setLoginInput('');
        setLoginError('');
        triggerToast('System access granted. Welcome, Administrator.');
      } else {
        setLoginError('Incorrect administration token code. Access denied.');
      }
    }
  };

  // Notification toast simulator
  const [successToast, setSuccessToast] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Gallery CRUD Handlers
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galCaption) return;

    const data: Omit<GalleryItem, 'id'> = {
      type: galType,
      url: galUrl || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      caption: galCaption,
      category: galCategory
    };

    if (isEditingGallery) {
      updateGalleryItem({ ...data, id: isEditingGallery });
      triggerToast('Gallery portfolio item updated successfully.');
      setIsEditingGallery(null);
    } else {
      addGalleryItem(data);
      triggerToast('New installation photo added to Portfolio Gallery.');
    }

    setGalCaption('');
    setGalUrl('');
    setGalType('image');
  };

  const handleEditGalleryClick = (g: GalleryItem) => {
    setIsEditingGallery(g.id);
    setGalCaption(g.caption);
    setGalCategory(g.category);
    setGalUrl(g.url);
    setGalType(g.type);
  };

  // Product CRUD Handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodModel) return;

    const data: Omit<Product, 'id'> = {
      name: prodName,
      description: prodDesc || 'No custom description provided.',
      price: Number(prodPrice) || 1000,
      category: prodCategory,
      image: prodImage || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
      stock: Number(prodStock) || 10,
      features: ['UHD Stream', 'Low Latency IP', 'WDR Correction'],
      resolution: prodResolution,
      isWireless: prodCategory === 'dome' ? false : true,
      rating: 5.0,
      modelNumber: prodModel
    };

    if (isEditingProduct) {
      updateProduct({ ...data, id: isEditingProduct });
      triggerToast('Product details updated in secure inventory logs.');
      setIsEditingProduct(null);
    } else {
      addProduct(data);
      triggerToast('New equipment introduced in central storage depot.');
    }

    // Reset Form
    setProdName('');
    setProdDesc('');
    setProdPrice(0);
    setProdCategory('dome');
    setProdImage('');
    setProdStock(0);
    setProdModel('');
  };

  const handleEditProductClick = (p: Product) => {
    setIsEditingProduct(p.id);
    setProdName(p.name);
    setProdDesc(p.description);
    setProdPrice(p.price);
    setProdCategory(p.category);
    setProdImage(p.image);
    setProdStock(p.stock);
    setProdResolution(p.resolution);
    setProdModel(p.modelNumber);
  };

  // Blog CRUD Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogAuthor) return;

    const data: Omit<BlogPost, 'id'> = {
      title: blogTitle,
      summary: blogSummary || 'Excerpt summarizer blueprint.',
      content: blogContent || 'Blank article text.',
      category: blogCategory,
      image: blogImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      author: blogAuthor,
      date: new Date().toISOString().slice(0, 10),
      isNews: blogCategory === 'corporate'
    };

    if (isEditingBlog) {
      updateBlogPost({ ...data, id: isEditingBlog });
      triggerToast('Insights publication modified successfully.');
      setIsEditingBlog(null);
    } else {
      addBlogPost(data);
      triggerToast('New secure security analysis published.');
    }

    // Reset Form
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogCategory('security');
    setBlogImage('');
    setBlogAuthor('');
  };

  const handleEditBlogClick = (b: BlogPost) => {
    setIsEditingBlog(b.id);
    setBlogTitle(b.title);
    setBlogSummary(b.summary);
    setBlogContent(b.content);
    setBlogCategory(b.category);
    setBlogImage(b.image);
    setBlogAuthor(b.author);
  };

  // Central Settings update handler
  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        triggerToast('Error: New passwords do not match!');
        return;
      }
      if (newPassword.length < 4) {
        triggerToast('Error: Password must be at least 4 characters long!');
        return;
      }

      if (dbMode === 'mysql') {
        try {
          await apiService.changePassword(adminPassword, newPassword);
          triggerToast('MySQL credentials updated successfully.');
        } catch (err: any) {
          triggerToast('Error updating MySQL credentials: ' + err.message);
          return;
        }
      }

      localStorage.setItem('muratech_admin_password', newPassword);
      setAdminPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      triggerToast('Security credentials updated. Admin password changed.');
    }

    updateContactInfo({
      phone: setPhone,
      email: setEmail,
      address: setAddress,
      facebook: contactInfo.facebook,
      twitter: contactInfo.twitter,
      tiktok: contactInfo.tiktok,
      instagram: contactInfo.instagram
    });

    updateSEOSettings({
      metaTitle: setSeoTitle,
      metaDescription: setSeoDesc,
      keywords: setSeoKeywords.split(',').map(s => s.trim()),
      canonicalUrl: seoSettings.canonicalUrl
    });

    if (!newPassword) {
      triggerToast('Global corporate parameters and meta SEO settings updated.');
    }
  };

  // Search Filtered Logs list
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.user.toLowerCase().includes(logSearch.toLowerCase());
    
    const matchesType = logFilterType === 'all' || log.type === logFilterType;
    return matchesSearch && matchesType;
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-slate-900 text-slate-100 py-20 min-h-[90vh] flex items-center justify-center">
        {/* Dynamic success toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold text-xs tracking-wide z-50 flex items-center gap-2 border border-green-800"
            >
              <CheckCircle className="w-4 h-4 text-white" />
              {successToast}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center"
        >
          <div className="mx-auto p-4 bg-green-950 text-green-400 rounded-2xl w-max border border-green-800/30 animate-pulse">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">Admin Authentication</h3>
            <p className="text-xs text-slate-400">Enter secure password to access Muratech Control Console.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-slate-400 font-mono text-[10px] uppercase block tracking-wider">Access Token / Password</label>
              <input
                type="password"
                required
                value={loginInput}
                onChange={(e) => {
                  setLoginInput(e.target.value);
                  setLoginError('');
                }}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono"
              />
              {loginError && (
                <p className="text-red-500 font-mono text-[10px] mt-1">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Authenticate System
            </button>
          </form>

          <p className="text-[10px] text-slate-500 font-mono">
            Default password is <code className="text-green-400 bg-slate-900 px-1.5 py-0.5 rounded">admin123</code>. Change it inside settings.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 py-12 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic success toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold text-xs tracking-wide z-50 flex items-center gap-2 border border-green-800"
            >
              <CheckCircle className="w-4 h-4 text-white" />
              {successToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-6 h-6 text-green-500" />
              Muratech Admin CMS & Control Console
            </h2>
            <p className="text-xs text-slate-400">Manage real-time inventory levels, adjust corporate parameters, publish blog events, and inspect secure payment audit logs.</p>
          </div>

          {/* Quick Stats Summary badges */}
          <div className="flex gap-3 text-xs font-mono items-center">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
              <Database className="w-4 h-4 text-green-500" />
              <span>Status: <strong className="text-emerald-500">SECURE DISPATCH</strong></span>
            </div>

            <button
              onClick={() => {
                sessionStorage.removeItem('muratech_admin_logged_in');
                setIsLoggedIn(false);
                triggerToast('Logged out of secure session.');
              }}
              className="bg-red-950/40 hover:bg-red-950 border border-red-900/40 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
          </div>
        </div>

        {/* Sidebar Nav Row */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveSubTab('stats')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'stats'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-1.5" />
            Operational Stats
          </button>
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'products'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Package className="w-4 h-4 inline mr-1.5" />
            Manage Inventory
          </button>
          <button
            onClick={() => setActiveSubTab('blogs')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'blogs'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-1.5" />
            CMS Publications
          </button>
          <button
            onClick={() => setActiveSubTab('gallery')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'gallery'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Image className="w-4 h-4 inline mr-1.5" />
            Portfolio Gallery
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'settings'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-1.5" />
            Business & SEO Settings
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
              activeSubTab === 'audit'
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-1.5" />
            Audit Trail Logs
          </button>
        </div>

        {/* Dynamic Panels */}
        <div className="space-y-8">
          
          {/* Panel 1: Operational Stats Dashboard */}
          {activeSubTab === 'stats' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 text-left"
            >
              {/* High level stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Simulated Sales Pool</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-white">KSh {systemStats.totalSales.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-500 font-bold font-mono">+14.2%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">From {systemStats.totalOrders} finalized transactions</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Daily Visitors Today</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-white">{systemStats.visitorsToday}</span>
                    <span className="text-[10px] text-emerald-500 font-bold font-mono">+8.7%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">Organic Kenyan traffic pools</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Warehouse Inventory</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-white">{systemStats.totalProducts} models</span>
                    <span className="text-[10px] text-green-500 font-bold font-mono">Active</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">Fully editable supply depot list</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Pending SLA dispatches</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-white">{systemStats.pendingInstallations} runs</span>
                    <span className="text-[10px] text-green-500 font-bold font-mono">Queued</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">Safety assessments + hardware deliveries</p>
                </div>

              </div>

              {/* Transactions list log */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-4 border-b border-slate-800">
                  Secured Purchase Logs ({orders.length} orders total)
                </h3>
                
                {orders.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No checkout actions finalised in active sandbox session.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs mt-4">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="pb-3">Reference ID</th>
                          <th className="pb-3">Buyer</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Billing Gateway</th>
                          <th className="pb-3">Total amount</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 text-slate-300">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-900/40">
                            <td className="py-3.5 font-bold text-white">{o.id}</td>
                            <td className="py-3.5">{o.customerName}</td>
                            <td className="py-3.5">{new Date(o.date).toLocaleDateString()}</td>
                            <td className="py-3.5 uppercase">{o.paymentMethod}</td>
                            <td className="py-3.5 text-white font-bold">KSh {o.totalAmount.toLocaleString()}</td>
                            <td className="py-3.5 text-right">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                o.paymentStatus === 'completed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10'
                                  : 'bg-green-950 text-green-400 border border-green-500/10'
                              }`}>
                                {o.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Panel 2: Product Inventory Management CRUD */}
          {activeSubTab === 'products' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              {/* Product Form Add/Edit */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  {isEditingProduct ? 'Edit Camera Parameters' : 'Introduce New CCTV Model'}
                </h3>
                
                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">CCTV Model Name *</label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="e.g., Muratech Dome Pro AI"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Unique Model Number *</label>
                      <input
                        type="text"
                        required
                        value={prodModel}
                        onChange={(e) => setProdModel(e.target.value)}
                        placeholder="e.g., MT-DOME-8MP-AI"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Resolution Sensor *</label>
                      <input
                        type="text"
                        required
                        value={prodResolution}
                        onChange={(e) => setProdResolution(e.target.value)}
                        placeholder="e.g., 8MP (3840 x 2160)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Wholesale Price (KSh) *</label>
                      <input
                        type="number"
                        required
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Depot Stock level *</label>
                      <input
                        type="number"
                        required
                        value={prodStock}
                        onChange={(e) => setProdStock(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Category Grid Allocation</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as Product['category'])}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                    >
                      <option value="dome">Dome Camera</option>
                      <option value="bullet">Bullet Camera</option>
                      <option value="ptz">Speed PTZ Dome</option>
                      <option value="nvr">Nexus NVR Server</option>
                      <option value="accessories">Accessory Part</option>
                      <option value="package">Bulk Security Bundle</option>
                    </select>
                  </div>

                  <ImageUploader
                    label="Equipment Photo (Web Link or Gallery Upload) *"
                    imageValue={prodImage}
                    onImageChange={setProdImage}
                    placeholderUrl="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80"
                  />

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Product Brief Description</label>
                    <textarea
                      rows={2}
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      placeholder="Type details regarding deep learning channels or IR lens metrics."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                    />
                  </div>

                  <div className="flex gap-2 pt-2 text-[11px] font-bold uppercase">
                    {isEditingProduct && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProduct(null);
                          setProdName('');
                          setProdModel('');
                          setProdPrice(0);
                          setProdStock(0);
                        }}
                        className="py-2.5 bg-slate-800 text-slate-300 rounded-lg flex-1 text-center hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="py-2.5 bg-green-700 text-white rounded-lg flex-1 text-center hover:bg-green-800 flex items-center justify-center gap-1 cursor-pointer font-bold"
                    >
                      {isEditingProduct ? 'Update Parameters' : 'Publish Model'}
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Product List Table */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  Warehouse Stock Depot ({products.length} models listed)
                </h3>
                
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-left">
                        <img src={p.image} className="w-10 h-10 object-cover rounded-lg bg-slate-950 shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] text-green-500 font-bold uppercase">{p.modelNumber}</span>
                            <span className="font-mono text-[9px] text-slate-500 capitalize">({p.category})</span>
                          </div>
                          <h4 className="font-display font-bold text-xs text-white mt-0.5 line-clamp-1">{p.name}</h4>
                          <span className="font-mono text-[10px] text-slate-400">Stock count: <strong className={p.stock < 15 ? 'text-green-500 font-bold' : 'text-slate-300 font-semibold'}>{p.stock}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-white">KSh {p.price.toLocaleString()}</span>
                        
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEditProductClick(p)}
                            className="p-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 border border-slate-800 hover:border-red-950 hover:bg-red-950/40 rounded text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Panel 3: CMS Publications Blogs news */}
          {activeSubTab === 'blogs' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              {/* Blog Form Add/Edit */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  {isEditingBlog ? 'Edit Insights Publication' : 'Draft New Security Guide'}
                </h3>
                
                <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g., CCTV Maintenance Blueprints"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Drafting Author Name *</label>
                      <input
                        type="text"
                        required
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="e.g., Eng. Julius Wambua"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Category Allocation</label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value as BlogPost['category'])}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                      >
                        <option value="security">CCTV Security Trends</option>
                        <option value="installation">Practical Guides & SLAs</option>
                        <option value="technology">IP & AI Technology</option>
                        <option value="corporate">Company News / Press</option>
                      </select>
                    </div>
                  </div>

                  <ImageUploader
                    label="Article Cover Photo (Web Link or Gallery Upload) *"
                    imageValue={blogImage}
                    onImageChange={setBlogImage}
                    placeholderUrl="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
                  />

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Short Summary Excerpt *</label>
                    <input
                      type="text"
                      required
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      placeholder="Brief excerpt shown on article cards."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Draft Content Body Text *</label>
                    <textarea
                      rows={4}
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Type details in full. Markdown headers are supported."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-light"
                    />
                  </div>

                  <div className="flex gap-2 pt-2 text-[11px] font-bold uppercase">
                    {isEditingBlog && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingBlog(null);
                          setBlogTitle('');
                          setBlogAuthor('');
                          setBlogContent('');
                        }}
                        className="py-2.5 bg-slate-800 text-slate-300 rounded-lg flex-1 text-center hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="py-2.5 bg-green-700 text-white rounded-lg flex-1 text-center hover:bg-green-800 flex items-center justify-center gap-1 cursor-pointer font-bold"
                    >
                      {isEditingBlog ? 'Update Article' : 'Publish Article'}
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Published articles list */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  Active Press & Publications ({blogs.length} articles)
                </h3>
                
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 text-xs">
                  {blogs.map((b) => (
                    <div key={b.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-left">
                        <img src={b.image} className="w-10 h-10 object-cover rounded-lg bg-slate-950 shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-mono">
                            <span>{b.date}</span>
                            <span>•</span>
                            <span className="capitalize">{b.category}</span>
                          </div>
                          <h4 className="font-display font-bold text-xs text-white mt-0.5 line-clamp-1">{b.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">Draft author: {b.author}</span>
                        </div>
                      </div>

                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => handleEditBlogClick(b)}
                          className="p-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteBlogPost(b.id)}
                          className="p-1.5 border border-slate-800 hover:border-red-950 hover:bg-red-950/40 rounded text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Panel: Portfolio Gallery CRUD */}
          {activeSubTab === 'gallery' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              {/* Gallery Form Add/Edit */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  {isEditingGallery ? 'Edit Gallery Photo' : 'Upload New Gallery Photo'}
                </h3>
                
                <form onSubmit={handleSaveGallery} className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Photo Caption *</label>
                    <input
                      type="text"
                      required
                      value={galCaption}
                      onChange={(e) => setGalCaption(e.target.value)}
                      placeholder="e.g., Senior technician mounting Dome camera in server rack room..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Portfolio Category</label>
                      <select
                        value={galCategory}
                        onChange={(e) => setGalCategory(e.target.value as GalleryItem['category'])}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                      >
                        <option value="enterprise">Enterprise & Industrial Sites</option>
                        <option value="installation">Cable Routing & Calibration</option>
                        <option value="products">CCTV Hardware & Servers</option>
                        <option value="team">Muratech Engineering Crew</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Media Type</label>
                      <select
                        value={galType}
                        onChange={(e) => setGalType(e.target.value as 'image' | 'video')}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                      >
                        <option value="image">Still Image</option>
                        <option value="video">Video Reel</option>
                      </select>
                    </div>
                  </div>

                  <ImageUploader
                    label="Installation Image (Browse Gallery or Web Link) *"
                    imageValue={galUrl}
                    onImageChange={setGalUrl}
                    placeholderUrl="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
                  />

                  <div className="flex gap-2 pt-2 text-[11px] font-bold uppercase">
                    {isEditingGallery && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingGallery(null);
                          setGalCaption('');
                          setGalUrl('');
                        }}
                        className="py-2.5 bg-slate-800 text-slate-300 rounded-lg flex-1 text-center hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="py-2.5 bg-green-700 text-white rounded-lg flex-1 text-center hover:bg-green-800 flex items-center justify-center gap-1 cursor-pointer font-bold"
                    >
                      {isEditingGallery ? 'Update Photo' : 'Add to Portfolio'}
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Items List */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-max">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  Active Gallery Portfolio ({gallery.length} photos listed)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-1">
                  {gallery.map((g) => (
                    <div key={g.id} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between gap-3 text-xs">
                      <div className="space-y-2">
                        <div className="aspect-video bg-slate-950 rounded-lg overflow-hidden relative border border-slate-800">
                          <img src={g.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute bottom-2 left-2 bg-slate-950/80 text-green-500 font-mono text-[8px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                            {g.category}
                          </span>
                        </div>
                        <p className="font-sans text-slate-300 text-left line-clamp-2 leading-relaxed min-h-[32px]">{g.caption}</p>
                      </div>

                      <div className="flex gap-2 justify-end border-t border-slate-800/40 pt-2.5">
                        <button
                          onClick={() => handleEditGalleryClick(g)}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-[10px] font-mono font-bold uppercase rounded text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => deleteGalleryItem(g.id)}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-red-950 hover:bg-red-950/40 text-[10px] font-mono font-bold uppercase rounded text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Panel 4: Corporate Business Details & SEO Configurations */}
          {activeSubTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-left max-w-3xl mx-auto"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-800 mb-6 flex items-center justify-between">
                <span>Central Business Credentials & Google SEO Schema</span>
                <span className="text-[10px] font-mono text-emerald-500 font-bold lowercase">Direct Sync</span>
              </h3>

              <form onSubmit={handleUpdateSettings} className="space-y-6 text-xs font-sans">
                {/* Section A: Contact Details */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono text-green-500 font-bold block border-b border-slate-900 pb-1.5">
                    A. Physical Contact Routing
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">SLA Support Hotline Phone *</label>
                      <input
                        type="text"
                        required
                        value={setPhone}
                        onChange={(e) => setSetPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Corporate Inquiries Email *</label>
                      <input
                        type="email"
                        required
                        value={setEmail}
                        onChange={(e) => setSetEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Physical Showroom Address *</label>
                    <input
                      type="text"
                      required
                      value={setAddress}
                      onChange={(e) => setSetAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                    />
                  </div>
                </div>

                {/* Section B: SEO Metadata */}
                <div className="space-y-4 pt-2">
                  <span className="text-[10px] uppercase font-mono text-green-500 font-bold block border-b border-slate-900 pb-1.5">
                    B. Google SEO Optimization (Kenya Organic Categories)
                  </span>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Meta Title Tags (Shown in Google Search Results) *</label>
                    <input
                      type="text"
                      required
                      value={setSeoTitle}
                      onChange={(e) => setSetSeoTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Meta Description Tag *</label>
                    <textarea
                      rows={3}
                      required
                      value={setSeoDesc}
                      onChange={(e) => setSetSeoDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono block">Google Keyword Hooks (Comma separated for Schema.org indexes)</label>
                    <input
                      type="text"
                      value={setSeoKeywords}
                      onChange={(e) => setSetSeoKeywords(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Section C: Admin Security Settings */}
                <div className="space-y-4 pt-2 border-t border-slate-900">
                  <span className="text-[10px] uppercase font-mono text-green-500 font-bold block border-b border-slate-900 pb-1.5">
                    C. Admin Password Access Security
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">New Admin Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="•••••••• (leave empty to keep current)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono block">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="•••••••• (leave empty to keep current)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-slate-800 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Section D: Active Database Connection Mode */}
                <div className="space-y-4 pt-2 border-t border-slate-900">
                  <span className="text-[10px] uppercase font-mono text-green-500 font-bold block border-b border-slate-900 pb-1.5">
                    D. Full-Stack Database Engine Mode
                  </span>
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-bold text-white text-xs">Active Storage Strategy</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Toggle between offline browser simulation and live Java Spring Boot + MySQL endpoints.</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        dbMode === 'mysql' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10' 
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}>
                        {dbMode === 'mysql' ? 'MySQL Active' : 'LocalStorage Simulator'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (dbMode !== 'local') {
                            toggleDbMode();
                          }
                        }}
                        className={`py-2 px-3 rounded-lg border text-center transition-all font-bold uppercase text-[9px] tracking-wider cursor-pointer ${
                          dbMode === 'local'
                            ? 'bg-green-700/15 border-green-500 text-green-400 font-extrabold shadow'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Browser LocalStorage (Sandbox)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (dbMode !== 'mysql') {
                            toggleDbMode();
                          }
                        }}
                        className={`py-2 px-3 rounded-lg border text-center transition-all font-bold uppercase text-[9px] tracking-wider cursor-pointer ${
                          dbMode === 'mysql'
                            ? 'bg-green-700/15 border-green-500 text-green-400 font-extrabold shadow'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Spring Boot + MySQL API (Production)
                      </button>
                    </div>
                    {dbMode === 'mysql' && (
                      <p className="text-[9px] text-emerald-500 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Client running native REST calls to port 3000 /api. Confirm Spring Boot server is running.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Save Global Configuration
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}

          {/* Panel 5: Audit Trail Logs with Search tracer */}
          {activeSubTab === 'audit' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                    Secured System Audit Ledger ({filteredLogs.length} traces loaded)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Tracing every addition, deletion, transaction, and config modification with search filters.</p>
                </div>
                
                <button
                  onClick={clearAuditLogs}
                  className="px-3 py-1.5 border border-red-950 hover:bg-red-950/40 text-red-400 text-[10px] font-mono font-bold uppercase rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <Trash className="w-3 h-3" /> Clear Audit Logs
                </button>
              </div>

              {/* Filters toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-slate-800/40 mb-6 text-xs">
                {/* Select Type */}
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500 font-mono">Trace Action:</span>
                  <select
                    value={logFilterType}
                    onChange={(e) => setLogFilterType(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:outline-none"
                  >
                    <option value="all">All Category Actions</option>
                    <option value="create">Creations</option>
                    <option value="update">Updates</option>
                    <option value="delete">Deletions</option>
                    <option value="payment">Payments / Sales</option>
                    <option value="email">Emails / Bookings</option>
                    <option value="system">System Events</option>
                  </select>
                </div>

                {/* Audit Search */}
                <div className="relative max-w-sm w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Filter audit trail..."
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-8 pr-4 text-xs text-white focus:outline-none focus:border-green-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* High Density Log list */}
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredLogs.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-mono text-xs">
                    No system log entries match active filters.
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono hover:bg-slate-900 transition-colors"
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                            log.type === 'create'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10'
                              : log.type === 'delete'
                                ? 'bg-red-950 text-red-400 border border-red-500/10'
                                : log.type === 'payment'
                                  ? 'bg-green-950 text-green-400 border border-green-500/10'
                                  : 'bg-slate-800 text-slate-400'
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <span className="font-bold text-white text-[11px]">{log.action}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{log.details}</p>
                      </div>

                      <div className="text-left sm:text-right shrink-0 text-[10px] text-slate-500 space-y-0.5">
                        <p>User: <span className="text-slate-300">{log.user}</span></p>
                        <p className="text-[9px]">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
