/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Eye, ArrowRight, Video, Zap, Activity } from 'lucide-react';

interface HeroProps {
  onExploreStore: () => void;
  onExploreServices: () => void;
  onTalkToAi: () => void;
}

export default function Hero({ onExploreStore, onExploreServices, onTalkToAi }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#090D16] to-[#0E1524] pt-12 pb-20 md:py-28 px-4 md:px-8 border-b border-gray-800">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <motion.div 
          className="lg:col-span-7 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            <ShieldCheck size={14} />
            <span className="tracking-wider uppercase font-display">ENTERPRISE GRADE SURVEILLANCE • KENYA</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-white tracking-tight"
          >
            Securing Kenya’s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-green-400">
              Commercial Giants
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl"
          >
            Muratech CCTV delivers absolute cyber-physical defense. We plan, furnish, install, and maintain state-of-the-art 4K thermal and AI intelligent cameras for Nairobi’s leading warehouses, corporate suites, industrial hubs, and large estates. 
          </motion.p>

          {/* Value Highlights */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6 max-w-md"
          >
            <div className="flex items-center space-x-2.5">
              <Zap size={16} className="text-brand-secondary" />
              <span className="text-xs text-gray-300 font-medium">M-Pesa STK & Recepit Integration</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Eye size={16} className="text-brand-secondary" />
              <span className="text-xs text-gray-300 font-medium">Zero-Lag Remote Mobile Sync</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Video size={16} className="text-brand-secondary" />
              <span className="text-xs text-gray-300 font-medium">Auto AI Perimeter Strobes</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Activity size={16} className="text-brand-secondary" />
              <span className="text-xs text-gray-300 font-medium">2-Year Full Hardware Warranty</span>
            </div>
          </motion.div>

          {/* Action Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
          >
            <button
              id="hero-explore-store-btn"
              onClick={onExploreStore}
              className="bg-brand-primary hover:bg-brand-secondary text-brand-dark font-bold text-xs py-3.5 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-brand-primary/10"
            >
              <span>Explore CCTV Store</span>
              <ArrowRight size={14} />
            </button>
            <button
              id="hero-explore-services-btn"
              onClick={onExploreServices}
              className="border border-gray-700 hover:border-brand-primary hover:text-brand-secondary text-gray-300 font-semibold text-xs py-3.5 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer bg-brand-dark/40"
            >
              <span>Our Installation Services</span>
            </button>
            <button
              id="hero-talk-ai-btn"
              onClick={onTalkToAi}
              className="bg-brand-medium border border-brand-primary/20 hover:border-brand-primary hover:text-white text-brand-secondary font-medium text-xs py-3.5 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Plan System with AI</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side Visual Graphic */}
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative mx-auto max-w-sm md:max-w-md bg-brand-medium/50 rounded-2xl p-4 border border-gray-800 shadow-2xl backdrop-blur-sm">
            
            {/* Camera Floating Badge */}
            <div className="absolute -top-3 -right-3 bg-brand-primary border border-brand-secondary text-brand-dark text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md animate-bounce">
              Live Demo
            </div>

            <img 
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=800" 
              alt="Muratech Enterprise Camera Installation" 
              className="rounded-xl w-full h-64 md:h-80 object-cover border border-gray-700" 
            />

            <div className="mt-4 flex justify-between items-center bg-brand-dark/80 p-3.5 rounded-lg border border-gray-800/80">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
                </span>
                <div>
                  <p className="text-[10px] uppercase font-sans text-gray-400 font-bold tracking-widest">Nairobi HQ Feed</p>
                  <p className="text-xs text-white font-mono font-medium">CAM_ALPHA_NVR_POW_STABLE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-brand-secondary font-mono font-bold">100% ONLINE</p>
                <p className="text-[9px] text-gray-500 font-mono">LATENCY: 12ms</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
