/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  ShoppingCart, 
  Package, 
  Filter, 
  Search, 
  Info, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Product } from '../types';

export default function StoreSection() {
  const { 
    products, 
    addToCart, 
    searchQuery, 
    setSearchQuery,
    setCurrentTab 
  } = useApp();
  
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: { id: 'all' | Product['category']; label: string }[] = [
    { id: 'all', label: 'All Equipment' },
    { id: 'dome', label: 'Dome Cameras' },
    { id: 'bullet', label: 'Bullet Cameras' },
    { id: 'ptz', label: 'Speed Dome PTZ' },
    { id: 'nvr', label: 'NVR Servers' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'package', label: 'Security Packages' }
  ];

  // Search & Filter Memo Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.resolution.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="bg-white py-16 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Muratech E-Commerce Depot
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Enterprise CCTV Shop & Wholesale Supply
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-light">
            Equip your industrial premises or corporate offices with authorized visual surveillance components. Real-time stock counts and dynamic local dispatch across Nairobi.
          </p>
        </div>

        {/* Filter and Search Utility Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-100 mb-8">
          
          {/* Categories Grid */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-green-700 border-green-700 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-green-600 hover:text-green-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Local Search Input */}
          <div className="relative max-w-sm w-full md:w-64">
            <input
              type="text"
              placeholder="Filter products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-green-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 p-16 rounded-xl text-center max-w-md mx-auto space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-slate-900">No equipment found</h3>
            <p className="text-xs text-slate-500">
              No products match "{searchQuery}" under the selected category. Try resetting filters.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Clear Search & Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const outOfStock = p.stock <= 0;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-green-600/40 transition-all flex flex-col group relative"
                >
                  {/* Stock Alert Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold shadow-sm ${
                      outOfStock
                        ? 'bg-red-100 text-red-600 border border-red-200'
                        : p.stock < 15
                          ? 'bg-green-50 text-green-700 border border-green-200 animate-pulse'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {outOfStock ? 'Out Of Stock' : p.stock < 15 ? `Low Stock: ${p.stock}` : `In Stock: ${p.stock}`}
                    </span>
                  </div>

                  {/* Brand Model indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-green-950/80 text-white text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                      {p.modelNumber}
                    </span>
                  </div>

                  {/* Visual Image container */}
                  <div className="aspect-square bg-slate-50 overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-green-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="p-2 bg-white text-slate-950 rounded-full hover:bg-green-600 hover:text-white transition-colors shadow-md cursor-pointer"
                        title="View Full Specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-green-700 font-bold">
                        {p.category.toUpperCase()} {p.resolution !== 'N/A' && `• ${p.resolution}`}
                      </span>
                      <h3 className="font-display font-bold text-slate-950 group-hover:text-green-700 transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">Retail Price</span>
                        <span className="font-mono text-lg font-bold text-slate-950">
                          KSh {p.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => addToCart(p)}
                        disabled={outOfStock}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                          outOfStock
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                            : 'bg-green-700 text-white hover:bg-green-800 shadow-sm'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Corporate Trust Banner */}
        <div className="mt-16 bg-green-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden border border-green-800/40">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-green-400 font-semibold block">Need an enterprise bulk quote?</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold">Deploying CCTV surveillance systems for big companies</h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                If you are a procurement officer or managing complex operations (such as multi-branch bank sites or factories), contact our commercial desk. We provide comprehensive design plans, bulk pricing margins, custom SLAs, and secure import pipelines.
              </p>
            </div>
            <div className="md:col-span-4 text-left md:text-right">
              <button
                onClick={() => setCurrentTab('contact')}
                className="px-6 py-3 bg-white hover:bg-green-50 text-green-900 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                Inquire Enterprise Account
                <Info className="w-4 h-4 text-green-700" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Product Spec Detail Modal overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop click lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-green-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-slate-200 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Modal Visual Area */}
                <div className="aspect-square bg-slate-50 relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-green-950 text-white text-[10px] font-mono px-3 py-1 rounded">
                    {selectedProduct.modelNumber}
                  </span>
                </div>

                {/* Modal specs copy text */}
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-green-700 font-bold block mb-1">
                          {selectedProduct.category.toUpperCase()} SECURITY SYSTEM
                        </span>
                        <h2 className="font-display font-extrabold text-2xl text-slate-950 leading-tight">
                          {selectedProduct.name}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <HelpCircle className="w-5 h-5 rotate-45" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>

                    {/* Technical Parameter Grid */}
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs uppercase font-mono text-slate-400 mb-2.5 font-bold">Camera Specifications</h4>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Sensor Resolution:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.resolution}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Transmission:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.isWireless ? 'WiFi / Solar / 4G' : 'PoE Ethernet / Copper'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Storage Level:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.stock} unit(s) ready</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Warranty Frame:</span>
                          <span className="text-slate-800 font-bold">12-Month Hardware</span>
                        </div>
                      </div>
                    </div>

                    {/* Feature bullet list */}
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs uppercase font-mono text-slate-400 mb-2 font-bold">Engineered Features</h4>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {selectedProduct.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Form Action Checkout Prompt */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Surveillance Price</span>
                      <span className="font-mono text-xl font-extrabold text-slate-950">
                        KSh {selectedProduct.price.toLocaleString()}
                  </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        disabled={selectedProduct.stock <= 0}
                        className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                          selectedProduct.stock <= 0
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-green-700 hover:bg-green-800 text-white shadow-sm'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add To Basket
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
