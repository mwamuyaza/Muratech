/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
  onSelectArticle: (post: BlogPost) => void;
}

export default function BlogSection({ blogs, onSelectArticle }: BlogSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      
      {/* Blog Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
          Muratech <span className="text-brand-secondary">Security Insights</span>
        </h2>
        <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Deep technology audits, preventative cabling guides, and local video surveillance updates prepared directly by our senior consulting architects.
        </p>
      </div>

      {/* Blogs list */}
      {blogs.length === 0 ? (
        <div className="text-center py-16 bg-brand-medium border border-gray-800 rounded-2xl">
          <BookOpen size={40} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No blog posts published at this moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <motion.article
              key={post.id}
              className="bg-brand-medium border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-brand-primary/30 transition-all flex flex-col md:flex-row group cursor-pointer"
              whileHover={{ y: -4 }}
              onClick={() => onSelectArticle(post)}
            >
              {/* Feature Image */}
              <div className="md:w-1/3 relative h-48 md:h-full min-h-[180px] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <span className="absolute top-3 left-3 bg-brand-dark/90 border border-gray-700 text-brand-secondary text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {post.category}
                </span>
              </div>

              {/* Content Panel */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center">
                      <Calendar size={11} className="mr-1 text-brand-primary" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User size={11} className="mr-1 text-brand-primary" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-white font-display mt-2.5 line-clamp-2 group-hover:text-brand-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-brand-secondary group-hover:text-white transition-colors pt-3 border-t border-gray-800/40">
                  <span>Read Corporate Briefing</span>
                  <ArrowRight size={13} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

    </div>
  );
}
