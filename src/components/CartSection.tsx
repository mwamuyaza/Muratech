/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useApp } from '../contexts/AppContext';
import { 
  Trash2, 
  ShoppingCart, 
  ArrowLeft, 
  CreditCard, 
  Plus, 
  Minus, 
  ShieldCheck 
} from 'lucide-react';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartSection() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setCurrentTab 
  } = useApp();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white py-16 text-slate-900 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Back Link */}
        <div className="text-left mb-6">
          <button
            onClick={() => setCurrentTab('shop')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-8">
          <div className="text-left">
            <h2 className="font-display text-2xl font-extrabold text-slate-950">Active Shopping Basket</h2>
            <p className="text-xs text-slate-500">Manage high-precision camera hardware allocations prior to check out.</p>
          </div>
          <span className="font-mono text-xs text-slate-500 font-bold uppercase">{cartCount} items selected</span>
        </div>

        {/* Cart Contents conditional */}
        {cart.length === 0 ? (
          <div className="bg-white border border-slate-200 p-16 rounded-2xl text-center space-y-6 max-w-md mx-auto shadow-sm">
            <div className="p-4 bg-slate-50 text-slate-400 rounded-full w-max mx-auto border border-slate-100">
              <ShoppingCart className="w-10 h-10 text-green-700" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-lg text-slate-950">Your basket is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No security cameras or accessories allocated. Visit our CCTV Store to equip your security grid.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('shop')}
              className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors inline-block cursor-pointer"
            >
              Go to Store
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* List Array */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left">
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-slate-50 shrink-0 border border-slate-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta information */}
                    <div className="flex-1 space-y-1.5">
                      <span className="text-[9px] font-mono text-green-700 font-bold uppercase">{item.product.modelNumber}</span>
                      <h4 className="font-display font-bold text-slate-950 text-sm leading-snug">{item.product.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">KSh {item.product.price.toLocaleString()} per unit</p>
                    </div>

                    {/* Quantities controller */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:text-green-700 text-slate-400 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-950 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1.5 hover:text-green-700 text-slate-400 transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line sum */}
                      <span className="font-mono font-bold text-sm text-slate-950 w-28 text-right">
                        KSh {(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Trash action */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 rounded-lg transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Reset action row */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Clear Entire Basket
                </button>
                <span className="font-mono text-slate-400">Secure transaction connection active</span>
              </div>
            </div>

            {/* Total summary summary panel */}
            <div className="bg-green-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-green-900">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative space-y-6">
                <div className="flex justify-between items-baseline border-b border-green-900 pb-4">
                  <span className="text-sm text-slate-350">Surveillance Infrastructure Total:</span>
                  <div className="text-right">
                    <span className="font-mono text-2xl font-extrabold text-green-400">KSh {cartTotal.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Inclusive of VAT standard rates</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-300">
                  <p className="max-w-md font-light leading-relaxed">
                    By submitting authorization, the system will prompt your designated Safaricom SIM network with a secure M-Pesa STK challenge prompt or open WhatsApp redirection links instantly.
                  </p>
                  
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="px-6 py-3.5 bg-white hover:bg-green-50 text-green-900 font-extrabold rounded-lg tracking-wider uppercase transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-lg text-xs"
                  >
                    Proceed to Checkout
                    <CreditCard className="w-4 h-4 text-green-700" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Embedded checkout portal */}
      <CheckoutModal 
        isOpen={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
      />
    </div>
  );
}
