/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, Facebook, Twitter, Flame, Instagram, AlertCircle, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  initialServiceName?: string;
  onFormSubmitted: (logMessage: string) => void;
}

export default function ContactSection({ initialServiceName = '', onFormSubmitted }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialServiceName || 'CCTV Installation');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) return;

    // Dispatch simulated contact log message
    const details = `Contact inquiry submitted by ${name} (${phone} / ${email}) for service '${service}'. Message: "${message}"`;
    onFormSubmitted(details);

    setIsSuccess(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
          Initiate Security <span className="text-brand-secondary">Auditing</span>
        </h2>
        <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Reach out directly to schedule an on-site evaluation or request custom commercial bidding parameters for your enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Information Cards & Social Handles */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Communication Box */}
          <div className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white font-display">Official Corporate Channels</h3>
            
            <div className="space-y-4">
              {/* Phone */}
              <a href="tel:0729716092" className="flex items-center space-x-4 bg-brand-dark hover:border-brand-primary border border-gray-800 p-4 rounded-xl transition-all cursor-pointer">
                <div className="bg-brand-primary/10 p-2.5 rounded-lg border border-brand-primary/20 text-brand-secondary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Direct Hotline (Nairobi)</p>
                  <p className="text-sm font-bold font-mono text-white">0729716092</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:kimanzikairu007@gmail.com" className="flex items-center space-x-4 bg-brand-dark hover:border-brand-primary border border-gray-800 p-4 rounded-xl transition-all cursor-pointer">
                <div className="bg-brand-primary/10 p-2.5 rounded-lg border border-brand-primary/20 text-brand-secondary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Lead Architect Email</p>
                  <p className="text-xs font-bold text-white">kimanzikairu007@gmail.com</p>
                </div>
              </a>

              {/* Physical Location */}
              <div className="flex items-center space-x-4 bg-brand-dark border border-gray-800 p-4 rounded-xl">
                <div className="bg-brand-primary/10 p-2.5 rounded-lg border border-brand-primary/20 text-brand-secondary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Headquarters Location</p>
                  <p className="text-xs text-white">Luthuli Avenue, Nairobi CBD, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels panel */}
          <div className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-display">Social Media Matrix</h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://facebook.com/muratech" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-brand-dark border border-gray-800 hover:border-brand-primary p-3 rounded-lg text-xs text-gray-300 hover:text-white transition-all">
                <Facebook size={14} className="text-brand-secondary" />
                <span>facebook/muratech</span>
              </a>
              <a href="https://twitter.com/muratech" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-brand-dark border border-gray-800 hover:border-brand-primary p-3 rounded-lg text-xs text-gray-300 hover:text-white transition-all">
                <Twitter size={14} className="text-brand-secondary" />
                <span>@muratech</span>
              </a>
              <a href="https://tiktok.com/@muratech" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-brand-dark border border-gray-800 hover:border-brand-primary p-3 rounded-lg text-xs text-gray-300 hover:text-white transition-all">
                <Flame size={14} className="text-brand-secondary" />
                <span>tiktok/muratech</span>
              </a>
              <a href="https://instagram.com/muratech" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-brand-dark border border-gray-800 hover:border-brand-primary p-3 rounded-lg text-xs text-gray-300 hover:text-white transition-all">
                <Instagram size={14} className="text-brand-secondary" />
                <span>ig/muratech</span>
              </a>
            </div>
          </div>

          {/* Map Vector placeholder */}
          <div className="bg-brand-medium border border-gray-800 rounded-2xl p-4 shadow-xl">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">Interactive Vector Map</span>
              <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary px-2 py-0.5 rounded-full font-mono font-bold">Nairobi Center</span>
            </div>
            
            {/* Visual vector grid illustrating Nairobi CCTV grid coverage */}
            <div className="bg-brand-dark border border-gray-800 rounded-xl h-44 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute h-px w-full bg-brand-primary/10 top-1/2" />
              <div className="absolute w-px h-full bg-brand-primary/10 left-1/2" />
              
              {/* Radar pulse */}
              <div className="absolute w-24 h-24 bg-brand-primary/5 rounded-full border border-brand-primary/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
              
              {/* HQ marker */}
              <div className="absolute bg-brand-secondary border border-white text-brand-dark font-black text-[9px] px-2 py-0.5 rounded shadow-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1">
                <MapPin size={8} />
                <span>MURATECH HQ</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white font-display mb-2">Request On-Site Evaluation</h3>
            <p className="text-xs text-gray-400 mb-6">Fill in your specifications, and our design office will establish contact within 2 hours.</p>
            
            {isSuccess && (
              <div className="mb-6 bg-green-950/40 border border-green-500 p-4 rounded-xl text-xs text-green-300 flex items-center space-x-3">
                <CheckCircle size={20} className="text-green-400 shrink-0" />
                <div>
                  <p className="font-bold">Inquiry Successfully Dispatched!</p>
                  <p className="text-[10px] text-gray-400">Our lead engineer (Moses) has been notified. You will receive an email verification shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Direct Phone Line *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0729716092"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. procurement@company.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Service Dimension</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary appearance-none cursor-pointer font-sans"
                >
                  <option value="CCTV Installation">Enterprise CCTV Installation</option>
                  <option value="Maintenance Audit">Preventative Maintenance Contracts</option>
                  <option value="Remote View Configuration">Remote View & Mobilization Setup</option>
                  <option value="Legacy Upgrade">Legacy System Modernization</option>
                  <option value="Other">Custom Surveillance Quote</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Structural Requirements *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please specify estimated camera count, indoor/outdoor balance, cabling routing distance, and any required power backup battery sizing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-brand-primary font-sans leading-relaxed resize-none"
                />
              </div>

              <button
                id="contact-form-submit-btn"
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-brand-primary/10"
              >
                <span>Submit Auditing Request</span>
                <Send size={13} />
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
