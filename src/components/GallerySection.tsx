/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Video, Eye, Filter, HelpCircle } from 'lucide-react';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const { gallery } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | GalleryItem['category']>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filters: { id: 'all' | GalleryItem['category']; label: string }[] = [
    { id: 'all', label: 'Full Portfolio' },
    { id: 'enterprise', label: 'Enterprise & Industrial Sites' },
    { id: 'installation', label: 'Cable Routing & Calibration' },
    { id: 'products', label: 'CCTV Hardware & Servers' },
    { id: 'team', label: 'Muratech Engineering Crew' }
  ];

  const filteredItems = gallery.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div className="bg-white py-16 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Surveillance Infrastructure
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Deployed Infrastructure Portfolio
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-light">
            An inside look at our actual clean fiber connections, server rack assemblies, and pole-mounted PTZ systems across premium commercial locations.
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 pb-6 border-b border-slate-100">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-green-600 hover:text-green-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxItem(item)}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group relative aspect-square"
              >
                {/* Image asset */}
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Grid Overlay Icons */}
                <div className="absolute top-3 left-3 bg-green-950/90 text-white p-2 rounded-lg backdrop-blur-md border border-white/10 shadow-sm">
                  {item.type === 'video' ? (
                    <Video className="w-4 h-4 text-green-400" />
                  ) : (
                    <Image className="w-4 h-4 text-green-400" />
                  )}
                </div>

                {/* Info Overlay Box - Exquisite Green & White Gradient Blur */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-900/90 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="space-y-2 text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-green-300 border border-green-500/30 bg-green-950/50 px-2 py-0.5 rounded-full inline-block font-bold">
                      {item.category} project
                    </span>
                    <p className="text-xs text-white leading-relaxed font-sans font-medium">
                      {item.caption}
                    </p>
                    <div className="w-8 h-[2px] bg-green-400 rounded" />
                    <span className="text-[10px] text-green-400 font-mono flex items-center gap-1.5 pt-1 font-bold uppercase tracking-wider">
                      <Eye className="w-3.5 h-3.5" /> inspect photo
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="fixed inset-0 bg-green-950/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-green-800/20 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl z-10 p-4"
            >
              <div className="aspect-video bg-green-950 rounded-xl overflow-hidden relative border border-green-900/10">
                <img
                  src={lightboxItem.url}
                  alt={lightboxItem.caption}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-green-700 font-bold block">
                    {lightboxItem.category.toUpperCase()} CATEGORY
                  </span>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">
                    {lightboxItem.caption}
                  </p>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
