/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, Globe, Layers, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  onConsult: (clientName: string) => void;
}

export default function Portfolio({ portfolioItems, onConsult }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Industrial', 'Corporate Office', 'Retail', 'Residential'];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      
      {/* Portfolio Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
          Commercial <span className="text-brand-secondary">Installation Grid</span>
        </h2>
        <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Examine concrete security deployments designed and successfully integrated by Muratech technicians across Kenyan warehouses, headquarters, and offices.
        </p>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            id={`portfolio-cat-btn-${cat}`}
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
              activeCategory === cat
                ? 'bg-brand-primary text-brand-dark border-brand-primary font-bold'
                : 'bg-brand-medium border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-brand-medium border border-gray-800 rounded-2xl">
          <Layers size={40} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No local showcase items registered under this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-brand-medium border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-brand-primary/40 transition-all flex flex-col group"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* Image with zoom on hover */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <span className="absolute bottom-3 left-3 bg-brand-dark/90 border border-gray-700 text-brand-secondary text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Details card */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                    <MapPin size={12} className="text-brand-primary mr-1 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-display mt-2 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{item.description}</p>
                  
                  <div className="mt-3.5 pt-3.5 border-t border-gray-800/60 flex justify-between items-center text-xs text-gray-400">
                    <span className="font-semibold">Client Partner:</span>
                    <span className="text-white font-medium">{item.client}</span>
                  </div>
                </div>

                <button
                  id={`portfolio-consult-btn-${item.id}`}
                  onClick={() => onConsult(item.client)}
                  className="mt-5 w-full bg-brand-dark hover:bg-brand-primary hover:text-brand-dark border border-brand-primary/20 hover:border-transparent text-brand-secondary font-semibold text-xs py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Inquire About Similar Architecture</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
