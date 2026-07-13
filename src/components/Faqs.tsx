/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 font-sans">
      
      {/* FAQs Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
          Procurement & Technical <span className="text-brand-secondary">FAQs</span>
        </h2>
        <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
          Review concrete, objective answers regarding technical specifications, warranty terms, power backing configurations, and local M-Pesa billing.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-brand-medium border border-gray-800 rounded-xl overflow-hidden transition-all duration-150 shadow-md hover:border-gray-700"
            >
              <button
                id={`faq-toggle-btn-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left text-white focus:outline-none cursor-pointer"
              >
                <div className="flex items-center space-x-3 pr-4">
                  <HelpCircle size={16} className="text-brand-secondary shrink-0" />
                  <span className="text-sm font-bold font-display leading-snug">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="border-t border-gray-800/60 bg-brand-dark/30"
                  >
                    <p className="p-5 text-xs text-gray-300 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
