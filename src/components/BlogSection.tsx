/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  ArrowLeft, 
  Newspaper, 
  CalendarDays,
  X 
} from 'lucide-react';
import { BlogPost } from '../types';

export default function BlogSection() {
  const { blogs } = useApp();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | BlogPost['category']>('all');
  const [copied, setCopied] = useState(false);

  const categories: { id: 'all' | BlogPost['category']; label: string }[] = [
    { id: 'all', label: 'All Articles' },
    { id: 'security', label: 'CCTV Security Trends' },
    { id: 'installation', label: 'Practical Guides & SLAs' },
    { id: 'technology', label: 'IP & AI Technology' },
    { id: 'corporate', label: 'Company News' }
  ];

  const filteredBlogs = blogs.filter(b => 
    activeCategory === 'all' || b.category === activeCategory
  );

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white py-16 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Layout with state toggle */}
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Section Header */}
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
                  Industry Analysis & Logs
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  Muratech Security Insights & Events
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto font-light">
                  Follow certified blueprints for physical camera maintenance, reviews of deep learning networks, and corporate development announcements.
                </p>
              </div>

              {/* Category selector row */}
              <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-6">
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

              {/* Dynamic Blogs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame with News / Event pill markers */}
                      <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Event or News Indicator overlay */}
                        <div className="absolute top-4 left-4 flex gap-1.5">
                          {post.isEvent && (
                            <span className="px-2.5 py-1 bg-green-700 text-white text-[9px] font-mono font-bold uppercase rounded flex items-center gap-1 shadow-sm">
                              <CalendarDays className="w-3 h-3" /> Event Alert
                            </span>
                          )}
                          {post.isNews && (
                            <span className="px-2.5 py-1 bg-slate-950 text-white text-[9px] font-mono font-bold uppercase rounded flex items-center gap-1 shadow-sm">
                              <Newspaper className="w-3 h-3 text-green-400" /> Press Release
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary contents */}
                      <div className="p-6 space-y-3 text-left">
                        <div className="flex items-center gap-3 text-slate-400 font-mono text-[10px]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-green-600" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{post.category}</span>
                        </div>

                        <h3 className="font-display font-bold text-slate-950 text-lg hover:text-green-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">By {post.author}</span>
                      <button
                        onClick={() => {
                          setSelectedBlog(post);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="text-xs font-semibold text-green-700 hover:text-green-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Read Article →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reader"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Back CTA control */}
              <div className="text-left">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Insights
                </button>
              </div>

              {/* Main reading content */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl bg-white text-left">
                {/* Hero block */}
                <div className="aspect-video bg-slate-100 relative">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                    <span className="px-3 py-1 bg-green-700 text-white text-[10px] font-mono font-bold uppercase rounded w-max">
                      {selectedBlog.category.toUpperCase()} BLUEPRINT
                    </span>
                    <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                      {selectedBlog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-green-400" /> {selectedBlog.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-green-400" /> Published: {selectedBlog.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Info Box */}
                {selectedBlog.isEvent && selectedBlog.eventDate && (
                  <div className="bg-green-50 border-b border-green-200/60 p-6 flex items-center gap-4">
                    <div className="p-3 bg-green-700 text-white rounded-xl shrink-0">
                      <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">Scheduled Corporate Event</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Date: <strong className="text-slate-950">{selectedBlog.eventDate}</strong> • Location: Luthuli Avenue Central Hub, Nairobi. RSVP open to general contractors and corporate partners.
                      </p>
                    </div>
                  </div>
                )}

                {/* Article body markdown-like rendering */}
                <div className="p-8 sm:p-12 space-y-6 text-slate-800 leading-relaxed font-light text-sm sm:text-base border-b border-slate-100">
                  <div className="whitespace-pre-line text-left">
                    {selectedBlog.content}
                  </div>
                </div>

                {/* Article footer / Share indicators */}
                <div className="p-6 bg-slate-50 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-1 text-slate-400 font-mono text-xs">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span>Tags: CCTV, Security, Kenya, Muratech, Enterprise</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" /> {copied ? 'Copied Link!' : 'Share Article'}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
