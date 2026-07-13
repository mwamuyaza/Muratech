/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Facebook, 
  Twitter, 
  MessageSquare, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  const { currentTab, setCurrentTab, contactInfo } = useApp();
  const [newsletterStatus, setNewsletterStatus] = React.useState('');
  const [footerNotice, setFooterNotice] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('Email successfully registered! Check your inbox for the next Muratech bulletin.');
    setTimeout(() => setNewsletterStatus(''), 6000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top footer row with description description brand */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand block Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5 text-white">
              <div className="p-1.5 bg-green-700 rounded text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight uppercase block leading-none">
                  MURA<span className="text-green-500">TECH</span>
                </span>
                <span className="text-[9px] text-slate-500 tracking-widest uppercase font-mono block mt-0.5">Enterprise CCTV systems</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Muratech CCTV is Kenya’s premier commercial surveillance and visual security engineering supplier. Licensed, certified technicians protecting industrial warehouses, shipping terminals, corporate offices, and gated parks.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-green-500/80 font-bold animate-pulse">
              <Clock className="w-4 h-4 shrink-0" />
              <span>SLA Response Unit Active: 24/7/365</span>
            </div>
          </div>

          {/* Quick links sitemaps */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Surveillance Site</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-green-500 transition-colors">Homepage</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('shop')} className="hover:text-green-500 transition-colors">CCTV Store Depot</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('services')} className="hover:text-green-500 transition-colors">Engineering Services</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('gallery')} className="hover:text-green-500 transition-colors">Visual Portfolio</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('blog')} className="hover:text-green-500 transition-colors">News & Events</button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Central Coordinates</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light text-[11px]">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-green-500 shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="font-mono font-bold text-slate-300 hover:text-green-500 transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="font-mono text-slate-300 hover:text-green-500 transition-colors break-all">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Security Bulletins</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Receive notifications concerning firmwares, security guides, and corporate alerts in East Africa.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5 pt-1">
              <input
                type="email"
                required
                placeholder="Corporate email..."
                className="bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-green-500 flex-1 font-light"
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                Join
              </button>
            </form>
            {newsletterStatus && (
              <p className="text-[10px] text-green-400 font-mono mt-2 leading-relaxed">{newsletterStatus}</p>
            )}
          </div>

        </div>

        {/* Dynamic footer notifications */}
        {footerNotice && (
          <div className="bg-slate-900/60 border border-green-900/40 p-4 rounded-xl text-xs font-mono text-left text-green-400">
            {footerNotice}
          </div>
        )}

        {/* Bottom copyright legal row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4 pt-4 text-left">
          <p>© 2026 Muratech CCTV Security Solutions Kenya. All rights reserved. Registered Enterprise.</p>
          
          <div className="flex flex-wrap gap-4 font-mono text-[10px]">
            <button 
              onClick={() => setFooterNotice('Muratech Privacy Policy: All client feeds, camera locations, IP setups, and network topology structures are stored with bank-grade AES-256 local encryption on closed-loop databases.')} 
              className="hover:text-green-500 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setFooterNotice('Muratech Terms and Conditions: Installations require a 50% deposit before site dispatch. Support SLAs are subject to quarterly certified technician audits.')} 
              className="hover:text-green-500 transition-colors cursor-pointer"
            >
              Terms of SLA
            </button>
            <span>•</span>
            <button 
              onClick={() => setFooterNotice('Muratech Cookies Policy: We utilize standard local cache sessions to store active shopping carts and administrative log credentials safely.')} 
              className="hover:text-green-500 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
