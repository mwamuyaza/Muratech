/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShoppingCart, Search, Menu, X, Settings, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onOpenCheckout: () => void;
  onSearch: (query: string) => void;
  userRole: 'admin' | 'user';
  setUserRole: (role: 'admin' | 'user') => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setCart,
  onOpenCheckout,
  onSearch,
  userRole,
  setUserRole,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setActiveTab('store');
    setSearchOpen(false);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const navLinks = [
    { id: 'store', label: 'CCTV Store' },
    { id: 'services', label: 'Our Services' },
    { id: 'gallery', label: 'Portfolio Gallery' },
    { id: 'blog', label: 'Security Insights' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      {/* Upper Top Info bar */}
      <div className="bg-brand-dark border-b border-gray-800 text-xs py-2 px-4 flex justify-between items-center text-gray-400 font-sans">
        <div className="flex items-center space-x-6">
          <a href="tel:0729716092" className="flex items-center hover:text-brand-secondary transition-colors">
            <Phone size={12} className="mr-1.5 text-brand-primary" />
            <span className="font-mono">0729716092</span>
          </a>
          <a href="mailto:kimanzikairu007@gmail.com" className="flex items-center hover:text-brand-secondary transition-colors max-sm:hidden">
            <Mail size={12} className="mr-1.5 text-brand-primary" />
            <span>kimanzikairu007@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[10px] bg-brand-medium text-brand-secondary px-2.5 py-0.5 rounded-full border border-brand-primary/20 max-sm:hidden">
            Official Nairobi Partner
          </span>
          <button 
            id="role-toggle-btn"
            onClick={() => setUserRole(userRole === 'admin' ? 'user' : 'admin')}
            className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Settings size={12} className="text-brand-primary" />
            <span>Portal: <strong className="text-brand-secondary uppercase">{userRole}</strong></span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            id="nav-logo"
            onClick={() => setActiveTab('store')} 
            className="flex items-center space-x-2.5 cursor-pointer select-none"
          >
            <div className="bg-brand-primary/10 p-2 rounded-lg border border-brand-primary/30">
              <Shield className="text-brand-secondary h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold font-display tracking-wider text-white">
                MURA<span className="text-brand-secondary">TECH</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">CCTV & SURVEILLANCE</p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                id={`tab-link-${link.id}`}
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                  activeTab === link.id
                    ? 'text-brand-secondary bg-brand-primary/10 border border-brand-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            
            {/* Search Box Trigger */}
            <div className="relative">
              <button
                id="search-trigger-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-300 hover:text-brand-secondary hover:bg-gray-800 rounded-lg transition-all cursor-pointer"
                title="Search Products"
              >
                <Search size={19} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 mt-3 bg-brand-medium border border-gray-800 p-2.5 rounded-xl shadow-2xl w-72 flex space-x-2"
                  >
                    <input
                      type="text"
                      placeholder="Search CCTV models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white rounded-lg px-3 py-1.5 text-xs w-full focus:outline-none focus:border-brand-primary font-sans"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-brand-primary hover:bg-brand-secondary text-brand-dark font-semibold text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Search
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <div className="relative">
              <button
                id="cart-trigger-btn"
                onClick={() => setCartOpen(!cartOpen)}
                className="p-2.5 text-gray-300 hover:text-brand-secondary hover:bg-gray-800 rounded-lg transition-all cursor-pointer relative"
                title="Your Cart"
              >
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-brand-secondary text-brand-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-3 bg-brand-medium border border-gray-800 rounded-xl shadow-2xl w-80 p-4"
                  >
                    <h3 className="text-sm font-semibold text-white border-b border-gray-800 pb-2 mb-3 font-display">
                      Surveillance Procurement Cart
                    </h3>
                    {cart.length === 0 ? (
                      <div className="text-center py-6">
                        <ShoppingCart size={32} className="mx-auto text-gray-600 mb-2" />
                        <p className="text-xs text-gray-400">Cart is currently empty.</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-1">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex items-center justify-between text-xs border-b border-gray-800/40 pb-2">
                              <div className="flex items-center space-x-2">
                                <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-md" />
                                <div>
                                  <h4 className="text-white font-medium line-clamp-1">{item.product.name}</h4>
                                  <p className="text-gray-400">{item.quantity} x KES {item.product.price.toLocaleString()}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveFromCart(item.product.id)}
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-xs mb-4">
                          <span className="text-gray-400 font-medium">Subtotal</span>
                          <span className="text-brand-secondary font-bold font-mono text-sm">KES {cartTotal.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => {
                            setCartOpen(false);
                            onOpenCheckout();
                          }}
                          className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <span>Proceed to Checkout</span>
                          <CheckCircle size={14} />
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Link to Admin CMS Console */}
            {userRole === 'admin' && (
              <button
                id="cms-toggle-nav-btn"
                onClick={() => setActiveTab('cms')}
                className={`p-2.5 rounded-lg transition-all cursor-pointer relative ${
                  activeTab === 'cms'
                    ? 'bg-brand-primary text-brand-dark font-semibold'
                    : 'text-gray-300 hover:text-brand-secondary hover:bg-gray-800 border border-brand-primary/20'
                }`}
                title="Admin Control Center"
              >
                <Settings size={19} className={activeTab === 'cms' ? '' : 'text-brand-secondary'} />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-brand-secondary hover:bg-gray-800 rounded-lg transition-all lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Links Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0F19] border-b border-gray-800 z-40 relative px-6 py-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    activeTab === link.id
                      ? 'text-brand-secondary bg-brand-primary/10 border-l-2 border-brand-primary pl-3'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              {userRole === 'admin' && (
                <button
                  onClick={() => {
                    setActiveTab('cms');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-between ${
                    activeTab === 'cms'
                      ? 'text-brand-secondary bg-brand-primary/10 border-l-2 border-brand-primary pl-3'
                      : 'text-brand-secondary hover:text-white hover:bg-brand-primary/10 border border-brand-primary/20'
                  }`}
                >
                  <span>Admin CMS Panel</span>
                  <Settings size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
