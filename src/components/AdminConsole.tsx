/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Plus, Edit2, Trash2, Image, Link2, Upload, FileText, 
  Settings, TrendingUp, Users, ShoppingCart, Archive, ListTodo, AlertTriangle, 
  Mail, Calendar, Clock, Check, Eye
} from 'lucide-react';
import { CctvProduct, PortfolioItem, BlogPost, AuditLog, AnalyticsSummary } from '../types';

interface AdminConsoleProps {
  products: CctvProduct[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  auditLogs: AuditLog[];
  onAddProduct: (prod: any) => void;
  onDeleteProduct: (id: string) => void;
  onAddPortfolio: (item: any) => void;
  onDeletePortfolio: (id: string) => void;
  onAddBlog: (post: any) => void;
  analytics: AnalyticsSummary;
}

export default function AdminConsole({
  products,
  portfolio,
  blogs,
  auditLogs,
  onAddProduct,
  onDeleteProduct,
  onAddPortfolio,
  onDeletePortfolio,
  onAddBlog,
  analytics,
}: AdminConsoleProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'inventory' | 'portfolio' | 'blogs' | 'audit'>('analytics');

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<CctvProduct | null>(null);
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<'Bullet' | 'Dome' | 'PTZ' | 'NVR/DVR' | 'Accessories'>('Bullet');
  const [pBrand, setPBrand] = useState<'Hikvision' | 'Dahua' | 'Muratech Pro' | 'Anker' | 'UniView'>('Muratech Pro');
  const [pPrice, setPPrice] = useState(0);
  const [pStock, setPStock] = useState(0);
  const [pRes, setPRes] = useState('5MP');
  const [pDesc, setPDesc] = useState('');
  const [pImageMode, setPImageMode] = useState<'link' | 'upload'>('upload');
  const [pImageVal, setPImageVal] = useState('');

  // Portfolio Form State
  const [portTitle, setPortTitle] = useState('');
  const [portClient, setPortClient] = useState('');
  const [portCat, setPortCat] = useState<'Industrial' | 'Corporate Office' | 'Retail' | 'Residential'>('Industrial');
  const [portDesc, setPortDesc] = useState('');
  const [portLoc, setPortLoc] = useState('');
  const [portImageMode, setPortImageMode] = useState<'link' | 'upload'>('upload');
  const [portImageVal, setPortImageVal] = useState('');

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCat, setBlogCat] = useState<'Surveillance Tech' | 'Enterprise Security' | 'Local Events' | 'Maintenance Tips'>('Surveillance Tech');
  const [blogImage, setBlogImage] = useState('');

  // Image Conversion Helper (Dual Mode ImageUploader)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Corporate policy limit: Images must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pPrice || !pImageVal) {
      alert("Please specify camera name, unit price, and hardware photo.");
      return;
    }

    onAddProduct({
      id: editingProduct?.id || undefined,
      name: pName,
      category: pCategory,
      brand: pBrand,
      price: Number(pPrice),
      stock: Number(pStock),
      resolution: pRes,
      description: pDesc,
      image: pImageVal,
      features: ['AI Intruder Detecion', '2-Year Warrenty']
    });

    // Reset Form
    setEditingProduct(null);
    setPName('');
    setPPrice(0);
    setPStock(0);
    setPDesc('');
    setPImageVal('');
  };

  const handleEditProductClick = (prod: CctvProduct) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPCategory(prod.category);
    setPBrand(prod.brand);
    setPPrice(prod.price);
    setPStock(prod.stock);
    setPRes(prod.resolution || '5MP');
    setPDesc(prod.description);
    setPImageVal(prod.image);
    setPImageMode('link');
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle || !portImageVal) {
      alert("Please specify project title and upload configuration photo.");
      return;
    }

    onAddPortfolio({
      title: portTitle,
      client: portClient || "Apex Partners Ltd",
      category: portCat,
      description: portDesc || "Muratech corporate security grid.",
      location: portLoc || "Nairobi, Kenya",
      image: portImageVal
    });

    setPortTitle('');
    setPortClient('');
    setPortDesc('');
    setPortLoc('');
    setPortImageVal('');
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      alert("Please fill in article title and detailed tech content.");
      return;
    }

    onAddBlog({
      title: blogTitle,
      summary: blogSummary || blogContent.slice(0, 150) + "...",
      content: blogContent,
      category: blogCat,
      image: blogImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
    });

    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogImage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 font-sans text-gray-300">
      
      {/* CMS Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono uppercase text-brand-secondary">Administrative Console</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display tracking-tight mt-1">
            Muratech <span className="text-brand-secondary">Central CMS Control Panel</span>
          </h2>
        </div>
        <div className="mt-4 md:mt-0 bg-brand-medium border border-gray-800 rounded-xl px-4 py-2 flex items-center space-x-2">
          <Settings className="text-brand-primary h-4 w-4 animate-spin" />
          <span className="text-xs text-white font-mono">Secure Authorization: Active</span>
        </div>
      </div>

      {/* Selector Subtabs */}
      <div className="flex flex-wrap border-b border-gray-800 gap-2 mb-8">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`pb-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'analytics'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Sales & Analytics
        </button>
        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`pb-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'inventory'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Manage Inventory
        </button>
        <button
          onClick={() => setActiveSubTab('portfolio')}
          className={`pb-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'portfolio'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Portfolio Showcase CMS
        </button>
        <button
          onClick={() => setActiveSubTab('blogs')}
          className={`pb-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'blogs'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Publications & Blogs CMS
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`pb-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'audit'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          System Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Main CMS Display Panels */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SALES & REAL-TIME ANALYTICS */}
          {activeSubTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-8"
            >
              {/* KPI statistics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Sales KES */}
                <div className="bg-brand-medium border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-black">Gross Sales Revenue</span>
                    <p className="text-xl font-bold font-mono text-brand-secondary mt-1">KES {analytics.totalSales.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-400 mt-1">Syncing with M-Pesa STK push</p>
                  </div>
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-xl text-brand-secondary">
                    <TrendingUp size={22} />
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-brand-medium border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-black">Orders Logged</span>
                    <p className="text-xl font-bold font-mono text-white mt-1">{analytics.totalOrders} Procurement Orders</p>
                    <p className="text-[9px] text-gray-400 mt-1">Average order KES 24,000</p>
                  </div>
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-xl text-brand-secondary">
                    <ShoppingCart size={22} />
                  </div>
                </div>

                {/* Total Visitors */}
                <div className="bg-brand-medium border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-black">Corporate Site Hits</span>
                    <p className="text-xl font-bold font-mono text-white mt-1">{analytics.totalVisitors} Visitors</p>
                    <p className="text-[9px] text-gray-400 mt-1">High conversion organic SEO</p>
                  </div>
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-xl text-brand-secondary">
                    <Users size={22} />
                  </div>
                </div>

                {/* Active Hardware Count */}
                <div className="bg-brand-medium border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-black">Active Hardware Models</span>
                    <p className="text-xl font-bold font-mono text-white mt-1">{products.length} Cameras & Access.</p>
                    <p className="text-[9px] text-gray-400 mt-1">Real-time inventory sync</p>
                  </div>
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-xl text-brand-secondary">
                    <Archive size={22} />
                  </div>
                </div>

              </div>

              {/* Graphical charts visualization via clean animated SVGs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart 1: Sales trends */}
                <div className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Nairobi Regional Sales Velocity</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Estimated cumulative revenue trends</p>
                    </div>
                    <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary px-2.5 py-0.5 rounded-full font-mono font-bold">Linear Growth</span>
                  </div>

                  <div className="h-64 flex items-end relative border-b border-l border-gray-800/80 pb-2 pl-2">
                    {/* Y-Axis guide lines */}
                    <div className="absolute left-0 right-0 h-px bg-gray-800/40 bottom-1/4" />
                    <div className="absolute left-0 right-0 h-px bg-gray-800/40 bottom-2/4" />
                    <div className="absolute left-0 right-0 h-px bg-gray-800/40 bottom-3/4" />

                    {/* Vector line plot */}
                    <svg className="absolute inset-0 h-full w-full p-2 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M 5,90 L 25,75 L 45,55 L 65,40 L 85,25 L 95,15" 
                        fill="none" 
                        stroke="#059669" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <path 
                        d="M 5,90 L 25,75 L 45,55 L 65,40 L 85,25 L 95,15 L 95,100 L 5,100 Z" 
                        fill="url(#gradient-green)" 
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Label markers */}
                    <div className="absolute bottom-1 left-2 text-[8px] font-mono text-gray-500">Jul 1</div>
                    <div className="absolute bottom-1 left-1/4 text-[8px] font-mono text-gray-500">Jul 3</div>
                    <div className="absolute bottom-1 left-2/4 text-[8px] font-mono text-gray-500">Jul 5</div>
                    <div className="absolute bottom-1 left-3/4 text-[8px] font-mono text-gray-500">Jul 7</div>
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-brand-secondary font-bold">Today</div>
                  </div>
                </div>

                {/* Chart 2: Product Performance Bar Chart */}
                <div className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Best Performing Surveillance Hardware</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Top-selling models based on sales volume count</p>
                    </div>
                    <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary px-2.5 py-0.5 rounded-full font-mono font-bold">Units Sold</span>
                  </div>

                  <div className="space-y-4">
                    {analytics.productPerformance.slice(0, 4).map((p, i) => {
                      const maxSales = Math.max(...analytics.productPerformance.map(it => it.salesCount || 1));
                      const percentage = ((p.salesCount || 0) / maxSales) * 100;
                      return (
                        <div key={p.productId} className="space-y-1.5 text-xs">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white font-medium line-clamp-1 max-w-[200px]">{p.name}</span>
                            <span className="text-brand-secondary font-mono font-bold">{p.salesCount} Units</span>
                          </div>
                          <div className="w-full bg-brand-dark rounded-full h-2 overflow-hidden border border-gray-800">
                            <div 
                              className="bg-brand-primary h-full rounded-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: MANAGE INVENTORY (CRUD) */}
          {activeSubTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Side: CRUD Form */}
              <div className="lg:col-span-5 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-gray-800 pb-4 mb-4">
                  <Plus className="text-brand-secondary" />
                  <h3 className="text-sm font-bold text-white font-display">
                    {editingProduct ? 'Update CCTV Specs' : 'Introduce New CCTV Hardware'}
                  </h3>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Model Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muratech Bullet PTZ Pro"
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Category</label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value as any)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary cursor-pointer"
                      >
                        <option value="Bullet">Bullet Camera</option>
                        <option value="Dome">Dome Camera</option>
                        <option value="PTZ">PTZ Tracking</option>
                        <option value="NVR/DVR">NVR / Storage</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Resolution</label>
                      <input
                        type="text"
                        placeholder="e.g. 4K (8MP)"
                        value={pRes}
                        onChange={(e) => setPRes(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Price (KES) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 15900"
                        value={pPrice || ''}
                        onChange={(e) => setPPrice(Number(e.target.value))}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Stock Units *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 24"
                        value={pStock || ''}
                        onChange={(e) => setPStock(Number(e.target.value))}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Camera Description</label>
                    <textarea
                      rows={3}
                      placeholder="Specify dynamic lenses, weatherproof ratings (IP67), night-vision distance..."
                      value={pDesc}
                      onChange={(e) => setPDesc(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary resize-none"
                    />
                  </div>

                  {/* Dual Mode ImageUploader */}
                  <div className="space-y-2 border-t border-gray-800/80 pt-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] uppercase font-bold text-gray-500">Hardware Image configuration</label>
                      <div className="flex space-x-1.5 text-[9px] font-mono">
                        <button
                          type="button"
                          onClick={() => setPImageMode('upload')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${pImageMode === 'upload' ? 'bg-brand-primary text-brand-dark font-bold' : 'bg-brand-dark text-gray-400'}`}
                        >
                          Device Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setPImageMode('link')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${pImageMode === 'link' ? 'bg-brand-primary text-brand-dark font-bold' : 'bg-brand-dark text-gray-400'}`}
                        >
                          Web Link
                        </button>
                      </div>
                    </div>

                    {pImageMode === 'upload' ? (
                      <div className="border border-dashed border-gray-700 rounded-xl p-4 text-center hover:border-brand-primary transition-all bg-brand-dark/40 relative">
                        <input
                          id="product-file-uploader"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, setPImageVal)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <Upload size={22} className="mx-auto text-gray-500 mb-1.5" />
                        <p className="text-[10px] font-medium text-gray-300">Browse Personal Gallery Photo</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">JPEG / PNG up to 2MB (Converted to base64 URL)</p>
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="Paste HTTP Image URL link..."
                        value={pImageVal}
                        onChange={(e) => setPImageVal(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                      />
                    )}

                    {pImageVal && (
                      <div className="mt-2 flex items-center space-x-3 bg-brand-dark p-2 rounded-lg border border-gray-800">
                        <img src={pImageVal} alt="Selected Preview" className="w-12 h-12 object-cover rounded border border-gray-700" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-white">Selected Image Loaded</p>
                          <p className="text-[9px] text-gray-500 truncate">{pImageVal.slice(0, 40)}...</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPImageVal('')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    id="admin-save-product-btn"
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer"
                  >
                    {editingProduct ? 'Save CCTV Modifications' : 'Add CCTV to Active Store'}
                  </button>

                  {editingProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setPName('');
                        setPPrice(0);
                        setPStock(0);
                        setPDesc('');
                        setPImageVal('');
                      }}
                      className="w-full bg-brand-dark border border-gray-800 text-gray-400 text-xs py-2.5 rounded-xl hover:text-white transition-all cursor-pointer mt-2"
                    >
                      Cancel Edit Mode
                    </button>
                  )}
                </form>
              </div>

              {/* Right Side: Inventory Stock Grid */}
              <div className="lg:col-span-7 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
                <h3 className="text-sm font-bold text-white font-display mb-4">Active Equipment Matrix</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 font-bold bg-brand-dark/40">
                      <th className="py-2.5 px-3">Specs</th>
                      <th className="py-2.5 px-3">Brand</th>
                      <th className="py-2.5 px-3 text-right">KES Rate</th>
                      <th className="py-2.5 px-3 text-center">Stock</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(prod => (
                      <tr key={prod.id} className="border-b border-gray-800/60 hover:bg-brand-dark/25 transition-all">
                        <td className="py-3 px-3 flex items-center space-x-2">
                          <img src={prod.image} alt={prod.name} className="w-8 h-8 object-cover rounded" />
                          <span className="font-semibold text-white truncate max-w-[150px]" title={prod.name}>{prod.name}</span>
                        </td>
                        <td className="py-3 px-3 text-brand-secondary font-mono text-[10px]">{prod.brand}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold">KES {prod.price.toLocaleString()}</td>
                        <td className="py-3 px-3 text-center font-mono">
                          <span className={prod.stock === 0 ? 'text-red-400' : prod.stock <= 5 ? 'text-orange-400' : 'text-gray-300'}>
                            {prod.stock}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditProductClick(prod)}
                              className="p-1.5 bg-brand-dark hover:bg-brand-primary/10 hover:text-brand-secondary rounded transition-colors text-gray-400 cursor-pointer"
                              title="Edit Camera Specs"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-1.5 bg-brand-dark hover:bg-red-950/40 hover:text-red-400 rounded transition-colors text-gray-400 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: PORTFOLIO SHOWCASE CMS */}
          {activeSubTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Form: Add Portfolio Showcase */}
              <div className="lg:col-span-5 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl text-xs space-y-4">
                <h3 className="text-sm font-bold text-white font-display border-b border-gray-800 pb-3">Configure Installation Showcase</h3>
                
                <form onSubmit={handleSavePortfolio} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Westlands Corporate Offices"
                      value={portTitle}
                      onChange={(e) => setPortTitle(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Holdings"
                        value={portClient}
                        onChange={(e) => setPortClient(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">CCTV category</label>
                      <select
                        value={portCat}
                        onChange={(e) => setPortCat(e.target.value as any)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary cursor-pointer"
                      >
                        <option value="Industrial">Industrial</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="Retail">Retail</option>
                        <option value="Residential">Residential</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Location City/Street</label>
                      <input
                        type="text"
                        placeholder="e.g. Kilimani, Nairobi"
                        value={portLoc}
                        onChange={(e) => setPortLoc(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Surveillance Grid Specifications</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Configured 32 active starlight bullet camera networks, interconnected fiber optics, central PoE rack power backup..."
                      value={portDesc}
                      onChange={(e) => setPortDesc(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary resize-none"
                    />
                  </div>

                  {/* Dual Mode ImageUploader for Portfolio */}
                  <div className="space-y-2 border-t border-gray-800/80 pt-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] uppercase font-bold text-gray-500">Showcase Installation Photo</label>
                      <div className="flex space-x-1.5 text-[9px] font-mono">
                        <button
                          type="button"
                          onClick={() => setPortImageMode('upload')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${portImageMode === 'upload' ? 'bg-brand-primary text-brand-dark font-bold' : 'bg-brand-dark text-gray-400'}`}
                        >
                          Device Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setPortImageMode('link')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${portImageMode === 'link' ? 'bg-brand-primary text-brand-dark font-bold' : 'bg-brand-dark text-gray-400'}`}
                        >
                          Web Link
                        </button>
                      </div>
                    </div>

                    {portImageMode === 'upload' ? (
                      <div className="border border-dashed border-gray-700 rounded-xl p-4 text-center hover:border-brand-primary transition-all bg-brand-dark/40 relative">
                        <input
                          id="portfolio-file-uploader"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, setPortImageVal)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <Upload size={22} className="mx-auto text-gray-500 mb-1.5" />
                        <p className="text-[10px] font-medium text-gray-300">Browse Personal Gallery Photo</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">JPEG / PNG up to 2MB (Converted to base64 URL)</p>
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="Paste HTTP Image URL link..."
                        value={portImageVal}
                        onChange={(e) => setPortImageVal(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                      />
                    )}

                    {portImageVal && (
                      <div className="mt-2 flex items-center space-x-3 bg-brand-dark p-2 rounded-lg border border-gray-800">
                        <img src={portImageVal} alt="Selected Preview" className="w-12 h-12 object-cover rounded border border-gray-700" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-white">Installation Image Loaded</p>
                          <p className="text-[9px] text-gray-500 truncate">{portImageVal.slice(0, 40)}...</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPortImageVal('')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    id="admin-save-portfolio-btn"
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Upload to Portfolio Showcase
                  </button>

                </form>
              </div>

              {/* Right List: Portfolio items list */}
              <div className="lg:col-span-7 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white font-display mb-4">Active Showcases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.map(item => (
                    <div key={item.id} className="bg-brand-dark border border-gray-800 rounded-xl p-3 flex flex-col justify-between space-y-3.5 relative">
                      <button
                        onClick={() => onDeletePortfolio(item.id)}
                        className="absolute top-2 right-2 p-1 bg-red-950/40 text-red-400 hover:bg-red-900 hover:text-white rounded transition-colors cursor-pointer"
                        title="Delete Portfolio Item"
                      >
                        <Trash2 size={11} />
                      </button>
                      <div className="flex items-start space-x-3 text-xs">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg border border-gray-800 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white line-clamp-1">{item.title}</h4>
                          <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide">{item.location}</p>
                          <p className="text-[10px] text-brand-secondary mt-1">Client: {item.client}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed bg-brand-medium/30 p-2 rounded">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PUBLICATIONS & BLOGS CMS */}
          {activeSubTab === 'blogs' && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Add Blog Form */}
              <div className="lg:col-span-5 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl text-xs space-y-4">
                <h3 className="text-sm font-bold text-white font-display border-b border-gray-800 pb-3">Publish Technical Security Insights</h3>
                
                <form onSubmit={handleSaveBlog} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Insight Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sizing Backup Batteries for CCTV Networks"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Publications Category</label>
                      <select
                        value={blogCat}
                        onChange={(e) => setBlogCat(e.target.value as any)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary cursor-pointer"
                      >
                        <option value="Surveillance Tech">Surveillance Tech</option>
                        <option value="Enterprise Security">Enterprise Security</option>
                        <option value="Local Events">Local Events</option>
                        <option value="Maintenance Tips">Maintenance Tips</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Header Image Link</label>
                      <input
                        type="url"
                        placeholder="Paste image link URL..."
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Short Abstract Summary *</label>
                    <input
                      type="text"
                      required
                      placeholder="A short description of this publication's takeaways..."
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Core Tech Content *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Enter full technical article details. Use clear, educational wording..."
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-xl p-2.5 w-full focus:outline-none focus:border-brand-primary resize-none"
                    />
                  </div>

                  <button
                    id="admin-save-blog-btn"
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Publish Security Article
                  </button>

                </form>
              </div>

              {/* Blogs list */}
              <div className="lg:col-span-7 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white font-display mb-4">Published Articles</h3>
                <div className="space-y-3">
                  {blogs.map(post => (
                    <div key={post.id} className="bg-brand-dark border border-gray-800 rounded-xl p-4 flex items-start space-x-3 text-xs justify-between">
                      <div className="flex items-start space-x-3">
                        <img src={post.image} alt={post.title} className="w-12 h-12 object-cover rounded-lg border border-gray-800 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white line-clamp-1">{post.title}</h4>
                          <p className="text-[9px] text-brand-secondary mt-0.5">{post.category} • {post.date}</p>
                          <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{post.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: AUDIT LOGS */}
          {activeSubTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Administrative Trace Logs</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Chronological system events and billing verification logs</p>
                </div>
                <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary px-2.5 py-0.5 rounded-full font-mono">OWASP Standards Audit</span>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {auditLogs.map(log => (
                  <div key={log.id} className="bg-brand-dark border border-gray-800 p-3.5 rounded-xl flex items-start justify-between text-xs space-y-1 sm:space-y-0">
                    <div className="flex items-start space-x-3">
                      <div className="bg-brand-medium border border-gray-800 p-2 rounded-lg text-brand-secondary shrink-0 mt-0.5">
                        <Clock size={14} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{log.timestamp.slice(11, 19)}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">{log.details}</p>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-brand-secondary font-mono shrink-0">
                      User: {log.user}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
