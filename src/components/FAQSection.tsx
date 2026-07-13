/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQSection() {
  const { faqs, setCurrentTab } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | FAQItem['category']>('all');

  const categories: { id: 'all' | FAQItem['category']; label: string }[] = [
    { id: 'all', label: 'All FAQs' },
    { id: 'technical', label: 'Technical & Speeds' },
    { id: 'installation', label: 'Installation & SLA' },
    { id: 'billing', label: 'M-Pesa & WhatsApp Payments' },
    { id: 'general', label: 'General Procurement' }
  ];

  const filteredFaqs = faqs.filter(f => 
    activeCategory === 'all' || f.category === activeCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white py-16 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Surveillance Intelligence Desk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-slate-600 font-light text-sm max-w-xl mx-auto">
            Review detailed, clear breakdowns concerning CCTV parameters, M-Pesa automated transaction pushes, and corporate SLAs.
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-slate-100 pb-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-green-700 border-green-700 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-green-600 hover:text-green-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-green-600/40 transition-all text-left"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-6 flex justify-between items-center gap-4 text-left font-display font-bold text-slate-900 hover:text-green-700 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-green-700' : ''
                  }`} />
                </button>

                {/* Answer Sliding Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line pl-14">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact CTA card */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="p-3 bg-green-50 text-green-700 rounded-full w-max mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">Have a specific custom requirement?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Can’t find answers regarding multi-spectral thermal models, fiber switches, or automated CCTV trigger lines? Speak to an executive directly.
          </p>
          <button
            onClick={() => setCurrentTab('contact')}
            className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold rounded-lg tracking-wider uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            Contact Engineering Team
          </button>
        </div>

      </div>
    </div>
  );
}
