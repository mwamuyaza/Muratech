/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  Smartphone, 
  Loader2, 
  CheckCircle,
  CreditCard,
  Building
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, placeOrder } = useApp();
  
  // Buyer form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'mpesa_c2b' | 'whatsapp'>('mpesa_stk');
  
  // Simulator states
  const [simStep, setSimStep] = useState<'form' | 'stk_challenge' | 'processing' | 'success'>('form');
  const [mpesaPin, setMpesaPin] = useState('');
  const [simLoadingMsg, setSimLoadingMsg] = useState('');
  const [generatedReceiptId, setGeneratedReceiptId] = useState('');

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    if (paymentMethod === 'mpesa_stk') {
      // Trigger STK PIN request simulation steps
      setSimStep('stk_challenge');
    } else {
      // Direct integration (e.g. WhatsApp opens WA link)
      setSimStep('processing');
      setSimLoadingMsg('Connecting with central accounting server...');
      
      setTimeout(async () => {
        const order = await placeOrder(name, phone, email, paymentMethod);
        setGeneratedReceiptId(order.id);
        setSimStep('success');
      }, 2000);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPin || mpesaPin.length < 4) return;

    setSimStep('processing');
    setSimLoadingMsg('Transmitting secure M-Pesa STK PIN challenge to Safaricom network API...');

    setTimeout(() => {
      setSimLoadingMsg('Verifying transaction token & locking warehouse inventory...');
      
      setTimeout(async () => {
        const order = await placeOrder(name, phone, email, 'mpesa_stk');
        setGeneratedReceiptId(order.id);
        setSimStep('success');
      }, 2000);
    }, 2000);
  };

  const handleFinish = () => {
    onClose();
    setSimStep('form');
    setMpesaPin('');
    // Switch view to invoice tab
    window.location.hash = '#receipt';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark overlay backdrop click */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      {/* Main card box frame */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-10 text-slate-900 text-left"
      >
        {/* Header bar */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-green-950 text-white">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-700 rounded text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base uppercase tracking-tight">Muratech Checkout Portal</h3>
              <span className="text-[9px] font-mono text-green-400 tracking-wider block leading-none uppercase">Secure payment validation system</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-green-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Interactive Steps views */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Information Inputs Form */}
            {simStep === 'form' && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCheckoutSubmit}
                className="space-y-4"
              >
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Cart Total:</span>
                  <span className="font-mono font-extrabold text-base text-slate-950">KSh {cartTotal.toLocaleString()}</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-500 block">Buyer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Moses Mwamuye"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-500 block">Safaricom Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0729716092"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-500 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., customer@email.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Secure Gateway Options */}
                <div className="space-y-2.5 pt-2">
                  <label className="text-xs font-mono font-medium text-slate-500 block">Choose Payment Gateway *</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                    
                    {/* M-Pesa STK option */}
                    <div 
                      onClick={() => setPaymentMethod('mpesa_stk')}
                      className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'mpesa_stk'
                          ? 'border-green-500 bg-green-50/40 text-green-950 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="p-1.5 bg-green-700 text-white rounded-md mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">M-Pesa STK Push</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Instant prompt, secure pin request on phone</span>
                      </div>
                    </div>

                    {/* WhatsApp Redirect option */}
                    <div 
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'whatsapp'
                          ? 'border-green-500 bg-green-50/40 text-green-950 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="p-1.5 bg-green-700 text-white rounded-md mt-0.5">
                        <MessageCircle className="w-4 h-4 fill-current text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">WhatsApp Checkout</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Send order list to accounts executive</span>
                      </div>
                    </div>

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer pt-3 shadow-sm"
                >
                  Confirm and Authorize
                  <CreditCard className="w-4 h-4" />
                </button>
              </motion.form>
            )}

            {/* Step 2: Simulated M-Pesa STK SIM Toolkit prompt popup */}
            {simStep === 'stk_challenge' && (
              <motion.div
                key="stk_challenge"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9 }}
                className="py-6 flex flex-col items-center"
              >
                {/* Visual smartphone SIM Toolkit emulator layout */}
                <div className="w-full max-w-[280px] bg-slate-900 text-slate-100 rounded-3xl p-4 border-4 border-slate-700 shadow-2xl relative overflow-hidden font-mono text-center space-y-4">
                  <div className="w-16 h-3 bg-slate-700 rounded-full mx-auto" />
                  
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                    <span className="text-[10px] text-green-400 font-bold block uppercase tracking-widest border-b border-slate-800 pb-2">
                      Safaricom SIM Toolkit
                    </span>
                    
                    <p className="text-[11px] text-slate-300 text-left leading-relaxed">
                      Do you want to pay KSh {cartTotal.toLocaleString()} to MURATECH SECURITY SOLUTIONS?
                    </p>
                    
                    <form onSubmit={handlePinSubmit} className="space-y-3">
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="Enter M-Pesa PIN"
                        value={mpesaPin}
                        onChange={(e) => setMpesaPin(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 border border-slate-800 rounded py-2 text-center text-sm font-bold tracking-widest text-white focus:outline-none focus:border-green-500 placeholder:text-slate-600 placeholder:tracking-normal placeholder:text-xs"
                      />
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                        <button 
                          type="button" 
                          onClick={() => setSimStep('form')}
                          className="py-1.5 bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={mpesaPin.length < 4}
                          className="py-1.5 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-40 cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="text-[9px] text-slate-500">
                    Encrypted secure sandbox challenge
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 mt-6 text-center leading-relaxed">
                  Enter any test PIN (e.g., <code className="bg-green-50 text-green-800 px-1 py-0.5 rounded font-bold">1234</code>) to authorize the payment simulator and trigger invoice creation.
                </p>
              </motion.div>
            )}

            {/* Step 3: API Processing wait animation spinner */}
            {simStep === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-4"
              >
                <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto" />
                <h4 className="font-display font-bold text-slate-900 text-sm">Processing Security Validation</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono leading-relaxed">
                  {simLoadingMsg}
                </p>
              </motion.div>
            )}

            {/* Step 4: Transaction completed successfully */}
            {simStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="p-4 bg-green-50 text-green-700 rounded-full w-max mx-auto border border-green-100">
                  <CheckCircle className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-xl text-slate-950">Payment Transaction Authorized</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Transaction was verified under secure gateway token framework. Your CCTV equipment and logistics allocations are confirmed.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-left text-xs font-mono max-w-xs mx-auto space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction ID:</span>
                    <span className="text-slate-800 font-bold">{generatedReceiptId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Charged:</span>
                    <span className="text-slate-800 font-bold">KSh {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">M-Pesa Status:</span>
                    <span className="text-green-700 font-bold uppercase">COMPLETED</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  View Structured Receipt →
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
