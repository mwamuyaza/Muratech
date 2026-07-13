/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Filter, ArrowUpDown, ChevronRight, X, PhoneCall, Check, Printer, FileText, ShoppingCart, Smartphone, ArrowRight } from 'lucide-react';
import { CctvProduct, CartItem, Order } from '../types';

interface CctvStoreProps {
  products: CctvProduct[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  onOrderCreated: (order: Order) => void;
}

export default function CctvStore({
  products,
  cart,
  setCart,
  isCheckoutOpen,
  setIsCheckoutOpen,
  onOrderCreated,
}: CctvStoreProps) {
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Checkout State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'MPESA_STK' | 'WHATSAPP_CONFIRM'>('MPESA_STK');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  
  // STK Simulation State
  const [stkState, setStkState] = useState<'IDLE' | 'SENDING' | 'WAITING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [countdown, setCountdown] = useState(10);
  const [receiptCode, setReceiptCode] = useState('');

  // Local Categories & Brands lists
  const categories = ['All', 'Bullet', 'Dome', 'PTZ', 'NVR/DVR', 'Accessories'];
  const brands = ['All', 'Hikvision', 'Dahua', 'Muratech Pro', 'Anker', 'UniView'];

  // Handle Cart Operations
  const handleAddToCart = (product: CctvProduct) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.product.stock) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Filter & Sort Products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.resolution && product.resolution.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return b.stock - a.stock;
    return b.salesCount - a.salesCount; // popular
  });

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Trigger simulated STK countdown
  const startStkSimulation = (orderId: string) => {
    setStkState('SENDING');
    setTimeout(() => {
      setStkState('WAITING');
      let timer = 10;
      setCountdown(timer);
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer <= 0) {
          clearInterval(interval);
          completePayment(orderId);
        }
      }, 1000);
    }, 1200);
  };

  // Complete Payment Sim
  const completePayment = async (orderId: string) => {
    try {
      const res = await fetch('/api/orders/pay-stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const data = await res.json();
      if (data.success) {
        setStkState('SUCCESS');
        setReceiptCode(data.receiptNumber);
        setActiveOrder({
          ...data.order,
          paymentStatus: 'PAID',
          mpesaReceiptNumber: data.receiptNumber
        });
        onOrderCreated({
          ...data.order,
          paymentStatus: 'PAID',
          mpesaReceiptNumber: data.receiptNumber
        });
        // Clear Cart
        setCart([]);
      } else {
        setStkState('FAILED');
      }
    } catch (err) {
      setStkState('FAILED');
    }
  };

  // Handle Checkout Form Submission
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !cart.length) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          companyName,
          paymentMethod,
          items: cart.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        })
      });
      const order = await response.json();
      
      if (order.error) {
        alert(`Stock Error: ${order.error}`);
        setIsSubmitting(false);
        return;
      }

      if (paymentMethod === 'MPESA_STK') {
        startStkSimulation(order.id);
      } else {
        // WhatsApp Redirect Option
        const message = `*MURATECH CCTV COMMERCIAL INQUIRY*%0A` +
          `----------------------------------%0A` +
          `*Order Reference:* ${order.id}%0A` +
          `*Client:* ${customerName}%0A` +
          `*Company:* ${companyName || 'N/A'}%0A` +
          `*Phone:* ${customerPhone}%0A` +
          `----------------------------------%0A` +
          `*Selected Hardware:*%0A` +
          order.items.map((it: any) => `- ${it.productName} (Qty: ${it.quantity})`).join('%0A') + `%0A` +
          `----------------------------------%0A` +
          `*Total Quotation:* KES ${order.totalAmount.toLocaleString()}%0A%0A` +
          `Please prompt STK push or confirm bank details to initiate commercial installation.`;

        const whatsappUrl = `https://wa.me/254729716092?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        onOrderCreated(order);
        setActiveOrder(order);
        setCart([]);
        setIsCheckoutOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    const printContent = document.getElementById('receipt-print-area')?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Quick restore state cleanly
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 font-sans">
      
      {/* Search and Filters Hub */}
      <div className="mb-10 bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white font-display mb-4">Enterprise Equipment Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Keyword Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search camera type, zoom, IR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-dark border border-gray-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs w-full focus:outline-none focus:border-brand-primary font-sans"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Filter size={14} />
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-brand-dark border border-gray-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs w-full focus:outline-none focus:border-brand-primary appearance-none cursor-pointer font-sans"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat} Systems</option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Filter size={14} />
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-brand-dark border border-gray-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs w-full focus:outline-none focus:border-brand-primary appearance-none cursor-pointer font-sans"
            >
              {brands.map(br => (
                <option key={br} value={br}>{br} Hardware</option>
              ))}
            </select>
          </div>

          {/* Sorter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <ArrowUpDown size={14} />
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-dark border border-gray-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs w-full focus:outline-none focus:border-brand-primary appearance-none cursor-pointer font-sans"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">In Stock First</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid: Products on Left, Cart preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Products List */}
        <div className="lg:col-span-8">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-brand-medium border border-gray-800 rounded-2xl">
              <ShoppingBag size={48} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm">No cameras match your selected filtration criteria.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setSearchQuery(''); }}
                className="mt-4 text-xs font-semibold text-brand-secondary bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-lg hover:bg-brand-primary/20 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-brand-medium border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-brand-primary/40 transition-all group flex flex-col justify-between"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300" 
                    />
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute top-3 left-3 bg-red-950/80 border border-red-500 text-red-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        Only {product.stock} Left
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute top-3 left-3 bg-gray-900/80 border border-gray-600 text-gray-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-brand-dark/90 border border-gray-700 text-brand-secondary text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {product.resolution || 'Enterprise'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase text-brand-secondary font-bold tracking-widest">{product.brand} • {product.category}</span>
                        <span className="text-xs text-gray-400 font-medium">Stock: {product.stock} units</span>
                      </div>
                      <h3 className="text-base font-bold text-white font-display mt-1.5 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
                      
                      {/* Features tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.features.slice(0, 2).map((feat, i) => (
                          <span key={i} className="text-[9px] bg-brand-dark border border-gray-800 text-gray-300 px-2 py-0.5 rounded">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-800/60 mt-auto">
                      <div>
                        <p className="text-[9px] uppercase font-sans text-gray-500 font-bold">Standard KES Rate</p>
                        <p className="text-base font-bold font-mono text-brand-secondary">KES {product.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                          product.stock === 0
                            ? 'bg-gray-800 text-gray-500 border border-gray-700'
                            : 'bg-brand-primary text-brand-dark hover:bg-brand-secondary'
                        }`}
                      >
                        <ShoppingCart size={13} />
                        <span>{product.stock === 0 ? 'Sold Out' : 'Buy Now'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Procurement Cart panel */}
        <div className="lg:col-span-4 sticky top-28 bg-brand-medium border border-gray-800 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-base font-bold text-white font-display mb-4 flex items-center space-x-2">
            <ShoppingBag size={18} className="text-brand-secondary" />
            <span>Procurement Cart</span>
          </h3>

          {cart.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
              <ShoppingCart size={32} className="mx-auto text-gray-600 mb-2" />
              <p className="text-xs text-gray-400">Your shopping cart is currently empty. Add cameras from our catalog on the left.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs border-b border-gray-800/40 pb-3">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-700" />
                      <div>
                        <h4 className="text-white font-medium line-clamp-1">{item.product.name}</h4>
                        <p className="text-brand-secondary font-mono text-xs mt-0.5">KES {item.product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1.5">
                      <div className="flex items-center space-x-1 bg-brand-dark border border-gray-700 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="h-5 w-5 text-gray-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs text-white px-1.5 font-semibold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="h-5 w-5 text-gray-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-[10px] text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Cabling & Fittings (Complimentary)</span>
                  <span className="text-brand-secondary">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Remote View Configuration</span>
                  <span className="text-brand-secondary font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-gray-800/60">
                  <span>Total Quotation</span>
                  <span className="text-brand-secondary font-mono text-base">KES {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="checkout-trigger-panel-btn"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-brand-primary/10"
              >
                <span>Initiate Checkout</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Checkout and Receipt Overlay Dialog */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-medium border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              
              {/* STK Simulation overlay inside modal */}
              {stkState !== 'IDLE' && (
                <div className="absolute inset-0 bg-brand-dark/95 z-50 flex flex-col items-center justify-center p-6 text-center">
                  {stkState === 'SENDING' && (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary border-r-2 border-brand-secondary mx-auto" />
                      <h3 className="text-lg font-bold text-white font-display">Initializing Safaricom M-Pesa Gateway...</h3>
                      <p className="text-xs text-gray-400">Connecting to secure STK Push servers for billing authorization.</p>
                    </div>
                  )}

                  {stkState === 'WAITING' && (
                    <div className="space-y-6 max-w-sm">
                      <div className="bg-brand-primary/10 border border-brand-primary/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto animate-pulse">
                        <Smartphone size={36} className="text-brand-secondary" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">Authorize Payment on Your Phone</h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        We have dispatched an M-Pesa prompt to <strong className="text-brand-secondary">{customerPhone}</strong>. Please enter your PIN to finalize KES <strong className="text-white">{cartTotal.toLocaleString()}</strong>.
                      </p>
                      <div className="text-4xl font-extrabold font-mono text-brand-secondary bg-brand-dark px-6 py-2 rounded-xl border border-gray-800 inline-block">
                        00:{countdown.toString().padStart(2, '0')}
                      </div>
                      <p className="text-[10px] text-gray-500">Awaiting automated network verification response.</p>
                    </div>
                  )}

                  {stkState === 'SUCCESS' && (
                    <div className="space-y-6 max-w-md p-4">
                      <div className="bg-green-950/40 border border-green-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                        <Check size={32} className="text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white font-display">Payment Authorization Successful!</h3>
                        <p className="text-xs text-gray-400 mt-1">Safaricom Receipt Code: <span className="text-brand-secondary font-mono font-bold">{receiptCode}</span></p>
                      </div>

                      {/* Printable Invoice & Receipt area */}
                      <div id="receipt-print-area" className="bg-white text-gray-900 rounded-xl p-5 text-left text-xs space-y-4 border border-gray-300 shadow-xl max-h-72 overflow-y-auto">
                        <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                          <div>
                            <h2 className="text-sm font-bold tracking-wider uppercase font-display">MURATECH CCTV LIMITED</h2>
                            <p className="text-[9px] text-gray-500 font-sans">Nairobi, Kenya • Phone: 0729716092</p>
                            <p className="text-[9px] text-gray-500 font-sans">Email: kimanzikairu007@gmail.com</p>
                          </div>
                          <div className="text-right">
                            <span className="bg-green-100 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Official Receipt</span>
                            <p className="text-[10px] font-mono mt-1 text-gray-600">No: {activeOrder?.id}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-700">
                          <div>
                            <p className="font-bold text-gray-900">Billed To:</p>
                            <p>{customerName}</p>
                            {companyName && <p>{companyName}</p>}
                            <p>{customerPhone}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">Payment Metadata:</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                            <p>Method: M-Pesa STK</p>
                            <p className="text-green-700 font-bold">M-Pesa Tx: {receiptCode}</p>
                          </div>
                        </div>

                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-gray-300 font-bold text-gray-900 bg-gray-50">
                              <th className="py-1 px-1">Hardware Specification</th>
                              <th className="py-1 px-1 text-center">Qty</th>
                              <th className="py-1 px-1 text-right">Unit KES</th>
                              <th className="py-1 px-1 text-right">Total KES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeOrder?.items.map((it: any, i: number) => (
                              <tr key={i} className="border-b border-gray-100">
                                <td className="py-1 px-1">{it.productName}</td>
                                <td className="py-1 px-1 text-center">{it.quantity}</td>
                                <td className="py-1 px-1 text-right">{it.price.toLocaleString()}</td>
                                <td className="py-1 px-1 text-right">{(it.price * it.quantity).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="flex flex-col items-end space-y-1 pt-2 border-t border-gray-200">
                          <div className="flex justify-between w-48 text-[10px]">
                            <span className="text-gray-500 font-semibold">Subtotal:</span>
                            <span className="font-mono text-gray-900">KES {activeOrder?.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between w-48 text-[10px]">
                            <span className="text-gray-500 font-semibold">Cabling & Labor:</span>
                            <span className="text-green-700 font-bold uppercase">Free Promo</span>
                          </div>
                          <div className="flex justify-between w-48 text-xs font-bold border-t border-gray-300 pt-1">
                            <span>TOTAL PAID:</span>
                            <span className="font-mono text-gray-900">KES {activeOrder?.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>

                        <p className="text-[8px] text-center text-gray-400 border-t border-gray-100 pt-2 italic">
                          Thank you for choosing Muratech. Certified installation schedules will be confirmed on call shortly. KRA PIN: P051648239A.
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={handlePrintReceipt}
                          className="bg-brand-medium border border-gray-700 hover:border-brand-primary text-brand-secondary font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Printer size={14} />
                          <span>Print Receipt / PDF</span>
                        </button>
                        <button
                          onClick={() => {
                            setStkState('IDLE');
                            setIsCheckoutOpen(false);
                            setActiveOrder(null);
                          }}
                          className="bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-2.5 px-6 rounded-lg transition-all cursor-pointer flex-1"
                        >
                          Finish Procurement
                        </button>
                      </div>
                    </div>
                  )}

                  {stkState === 'FAILED' && (
                    <div className="space-y-4">
                      <X className="text-red-500 h-12 w-12 mx-auto" />
                      <h3 className="text-lg font-bold text-white font-display">STK Push Transaction Failed</h3>
                      <p className="text-xs text-gray-400">Please verify your balance, ensure your line is registered for M-Pesa, and retry.</p>
                      <button
                        onClick={() => setStkState('IDLE')}
                        className="bg-brand-primary text-brand-dark text-xs font-bold py-2 px-4 rounded-lg cursor-pointer"
                      >
                        Retry Form
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Normal Form */}
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-brand-dark">
                <div className="flex items-center space-x-2">
                  <FileText className="text-brand-secondary" />
                  <h3 className="text-base font-bold text-white font-display">Surveillance System checkout</h3>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-gray-400 hover:text-white p-1 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Full Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Moses Mwamuye"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Direct Mobile Line (M-Pesa Number) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0729716092"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. admin@firm.co.ke"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Company / Estate Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Industrial Parks"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                    />
                  </div>
                </div>

                {/* Select Payment Gateway */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase">Authorize Secure Payment Gateway</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    
                    {/* STK Push option */}
                    <div
                      onClick={() => setPaymentMethod('MPESA_STK')}
                      className={`border p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === 'MPESA_STK'
                          ? 'border-brand-primary bg-brand-primary/5 text-white shadow-md'
                          : 'border-gray-800 bg-brand-dark text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-brand-primary/10 p-2.5 rounded-lg border border-brand-primary/20">
                          <Smartphone size={20} className="text-brand-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">M-Pesa STK Prompt</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Prompt STK dialog to phone</p>
                        </div>
                      </div>
                      {paymentMethod === 'MPESA_STK' && <Check size={16} className="text-brand-secondary" />}
                    </div>

                    {/* WhatsApp Redirect option */}
                    <div
                      onClick={() => setPaymentMethod('WHATSAPP_CONFIRM')}
                      className={`border p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === 'WHATSAPP_CONFIRM'
                          ? 'border-brand-primary bg-brand-primary/5 text-white shadow-md'
                          : 'border-gray-800 bg-brand-dark text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#25D366]/10 p-2.5 rounded-lg border border-[#25D366]/20">
                          <PhoneCall size={20} className="text-[#25D366]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Direct WhatsApp Billing</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Send custom purchase receipt</p>
                        </div>
                      </div>
                      {paymentMethod === 'WHATSAPP_CONFIRM' && <Check size={16} className="text-brand-secondary" />}
                    </div>

                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 flex justify-between items-center bg-brand-dark/40 p-4 rounded-xl border border-gray-800">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Total Authorized KES</p>
                    <p className="text-xl font-black font-mono text-brand-secondary">KES {cartTotal.toLocaleString()}</p>
                  </div>
                  <button
                    id="submit-checkout-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <span>{paymentMethod === 'MPESA_STK' ? 'Prompt STK Push' : 'Draft WhatsApp Invoice'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
