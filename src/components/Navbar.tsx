/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Settings, 
  PhoneCall, 
  Menu, 
  X, 
  Search, 
  MapPin, 
  Clock,
  Moon
} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { 
    currentTab, 
    setCurrentTab, 
    cart, 
    searchQuery, 
    setSearchQuery, 
    contactInfo 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'CCTV Store' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog & News' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-green-600 text-slate-950 shadow-md border-b border-green-700/30">
      {/* Top Banner with Contacts and Real-Time Business SLA */}
      <div className="bg-green-700 px-4 py-2 text-xs border-b border-green-800/20 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-950 font-semibold">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
              <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
              SLA Hotline: {contactInfo.phone}
            </span>
            <span className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-slate-950" />
              River Road, Nairobi, Kenya
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-950 font-mono font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              SLA Emergency Dispatch active: 24/7
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Frame */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
          >
            <div className="p-2 bg-slate-950 rounded-lg text-green-500 flex items-center justify-center shadow-lg shadow-green-950/20">
              <ShieldCheck className="w-7 h-7 text-green-500" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight uppercase block leading-none text-slate-950">
                MURA<span className="text-white">TECH</span>
              </span>
              <span className="text-[10px] text-slate-900 tracking-widest uppercase font-mono block mt-0.5 font-bold">
                Enterprise CCTV Security
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (item.id === 'shop') setSearchQuery('');
                  }}
                  className={`relative px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'text-white bg-slate-950 font-extrabold shadow-sm' 
                      : 'text-slate-950 hover:text-black hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Utilities (Search, Cart, Admin Dashboard) */}
          <div className="flex items-center gap-2">
            
            {/* Search Input toggle */}
            <div className="relative">
              {showSearch && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search store..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentTab !== 'shop') {
                      setCurrentTab('shop');
                    }
                  }}
                  className="bg-white/20 text-slate-950 placeholder-slate-800 border border-slate-950/20 rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:border-slate-950"
                />
              )}
              <button 
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (showSearch && searchQuery) setSearchQuery('');
                }}
                className="p-2 text-slate-300 hover:text-green-400 rounded-md hover:bg-green-900/30 transition-colors cursor-pointer"
                aria-label="Search"
              >
                {showSearch ? <X className="w-5 h-5 text-slate-950" /> : <Search className="w-5 h-5 text-slate-950" />}
              </button>
            </div>

            {/* Cosmetic Moon Icon to match screenshot design */}
            <button
              className="p-2 text-slate-950 hover:text-black rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cosmetic Dark Mode indicator"
            >
              <Moon className="w-5 h-5" />
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setCurrentTab('cart')}
              className={`p-2 rounded-md hover:bg-white/10 transition-colors relative flex items-center cursor-pointer ${
                currentTab === 'cart' ? 'text-black bg-white/20' : 'text-slate-950 hover:text-black'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-950 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-green-600">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Console button */}
            <button
              onClick={() => setCurrentTab('admin-dashboard')}
              className={`px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono border border-slate-950 cursor-pointer ${
                currentTab === 'admin-dashboard' 
                  ? 'bg-slate-950 text-white border-slate-950' 
                  : 'text-slate-950 font-bold'
              }`}
              aria-label="Admin Control"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">CMS Panel</span>
            </button>

            {/* Mobile Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-950 hover:text-black hover:bg-white/10 rounded-md cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden border-t border-green-700 bg-green-600 px-4 pt-2 pb-6 space-y-1.5"
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                  if (item.id === 'shop') setSearchQuery('');
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-slate-950 text-white border-l-4 border-white' 
                    : 'text-slate-950 hover:bg-white/10 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}
