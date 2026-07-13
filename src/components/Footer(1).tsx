/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Flame, Instagram, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onTabSelect: (tab: string) => void;
  onTriggerLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}

export default function Footer({ onTabSelect, onTriggerLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-medium border-t border-gray-800 font-sans mt-20 relative overflow-hidden">
      
      {/* Decorative ambient visual background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-primary/10 border border-brand-primary/20 p-2 rounded-lg text-brand-secondary">
                <Shield size={18} />
              </div>
              <span className="text-sm font-extrabold font-display text-white tracking-widest uppercase">
                MURATECH <span className="text-brand-secondary">CCTV</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Muratech is Kenya's elite corporate video surveillance contractor, configuring armored security networks, fibre backup routing, and biometric nodes.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com/muratech" target="_blank" rel="noreferrer" className="bg-brand-dark hover:bg-brand-primary/20 text-gray-400 hover:text-brand-secondary p-2 rounded-lg border border-gray-800 transition-all cursor-pointer">
                <Facebook size={14} />
              </a>
              <a href="https://twitter.com/muratech" target="_blank" rel="noreferrer" className="bg-brand-dark hover:bg-brand-primary/20 text-gray-400 hover:text-brand-secondary p-2 rounded-lg border border-gray-800 transition-all cursor-pointer">
                <Twitter size={14} />
              </a>
              <a href="https://tiktok.com/@muratech" target="_blank" rel="noreferrer" className="bg-brand-dark hover:bg-brand-primary/20 text-gray-400 hover:text-brand-secondary p-2 rounded-lg border border-gray-800 transition-all cursor-pointer">
                <Flame size={14} />
              </a>
              <a href="https://instagram.com/muratech" target="_blank" rel="noreferrer" className="bg-brand-dark hover:bg-brand-primary/20 text-gray-400 hover:text-brand-secondary p-2 rounded-lg border border-gray-800 transition-all cursor-pointer">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Panel */}
          <div className="lg:col-span-2.5 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Security Directory</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onTabSelect('store')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1.5">
                  <span>CCTV store</span>
                </button>
              </li>
              <li>
                <button onClick={() => onTabSelect('services')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1.5">
                  <span>Our Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => onTabSelect('gallery')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1.5">
                  <span>Installation gallery</span>
                </button>
              </li>
              <li>
                <button onClick={() => onTabSelect('blog')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1.5">
                  <span>Publications & News</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Admin links */}
          <div className="lg:col-span-2.5 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Compliance & Admin</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onTriggerLegal('privacy')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1">
                  <span>Privacy Policy</span>
                  <ArrowUpRight size={10} />
                </button>
              </li>
              <li>
                <button onClick={() => onTriggerLegal('terms')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1">
                  <span>Contractual Terms</span>
                  <ArrowUpRight size={10} />
                </button>
              </li>
              <li>
                <button onClick={() => onTriggerLegal('cookies')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1">
                  <span>Cookie Consent</span>
                  <ArrowUpRight size={10} />
                </button>
              </li>
              <li>
                <button onClick={() => onTabSelect('faqs')} className="hover:text-brand-secondary cursor-pointer transition-colors flex items-center space-x-1">
                  <span>Faqs & Help</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Quick-list */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Principal Offices</h4>
            <div className="space-y-3 text-xs text-gray-400">
              
              <div className="flex items-start space-x-2.5">
                <MapPin size={14} className="text-brand-secondary shrink-0 mt-0.5" />
                <span>Luthuli Avenue, Nairobi CBD, Kenya</span>
              </div>

              <a href="tel:0729716092" className="flex items-center space-x-2.5 hover:text-white transition-colors cursor-pointer">
                <Phone size={14} className="text-brand-secondary shrink-0" />
                <span className="font-mono">0729716092</span>
              </a>

              <a href="mailto:kimanzikairu007@gmail.com" className="flex items-center space-x-2.5 hover:text-white transition-colors cursor-pointer">
                <Mail size={14} className="text-brand-secondary shrink-0" />
                <span className="truncate">kimanzikairu007@gmail.com</span>
              </a>

            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-gray-800/80 my-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-mono">
          <p>© {currentYear} Muratech CCTV Kenya. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Enterprise Security Infrastructure Certified</p>
        </div>
      </div>

    </footer>
  );
}
