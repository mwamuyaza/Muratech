/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { ShieldCheck, HardHat, ShieldAlert, Award, ArrowRight, Video, FileText } from 'lucide-react';
import { CORPORATE_PARTNERS } from '../data';

export default function HeroSection() {
  const { setCurrentTab } = useApp();

  return (
    <div className="relative overflow-hidden bg-white text-slate-900 min-h-[80vh] flex flex-col justify-center">
      {/* Absolute Geometric Visual Grid Backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-green-100/30 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Visual Sales Copy Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200/60 px-4 py-1.5 rounded-full text-green-700 text-xs font-mono font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Certified Security & Visual Surveillance Partner Kenya
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-950"
            >
              Enterprise-Grade <span className="text-green-600">CCTV Engineering</span> for High-Value Assets
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg max-w-2xl font-normal leading-relaxed"
            >
              Muratech CCTV supplies, designs, and installs ultra-definition IP thermal cameras, PTZ speed domes, and secure NVR systems. Tailored security infrastructure designed specifically for commercial offices, warehouses, logistics ports, and gated estates in East Africa.
            </motion.p>

            {/* Strategic Call to Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={() => setCurrentTab('shop')}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                Browse CCTV Marketplace
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => setCurrentTab('services')}
                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 font-medium rounded-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                Book Professional Survey
                <HardHat className="w-4 h-4 text-green-600" />
              </button>
            </motion.div>

            {/* Trust Badges - Key Security Milestones */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 max-w-xl"
            >
              <div className="flex items-start gap-2.5">
                <Video className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-mono text-xl font-bold leading-none text-slate-950">1,200+</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Active Cameras Maintained</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-mono text-xl font-bold leading-none text-slate-950">99.9%</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">System SLA Uptime Guaranteed</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-mono text-xl font-bold leading-none text-slate-950">100%</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Licensed & Certified Engineers</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Graphic Bento Panel Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            {/* Embedded Active Deterrance Showcase Card */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">Live Diagnostic Stream</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  FEED-01 UPPER HILL
                </span>
              </div>

              {/* Simulated High Definition Feed */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 mt-4 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80" 
                  alt="Live CCTV feed simulation" 
                  className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Grid overlays */}
                <div className="absolute inset-0 border-2 border-dashed border-green-500/20 pointer-events-none" />
                <div className="absolute top-2 left-2 text-[9px] font-mono text-green-300 bg-slate-950/80 px-1.5 py-0.5 rounded">
                  8MP UHD | H.265+
                </div>
                
                {/* Motion target classification reticle overlay */}
                <div className="absolute top-1/3 left-1/3 w-28 h-20 border-2 border-green-500 rounded flex flex-col justify-between p-1">
                  <span className="text-[7px] font-mono text-green-400 font-bold bg-slate-950/80 w-max px-0.5 rounded leading-none uppercase">
                    AI Human Identified
                  </span>
                  <span className="text-[8px] font-mono text-green-400 self-end">
                    98.7% Conf
                  </span>
                </div>
              </div>

              {/* Diagnostic Parameters */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block leading-none">Security Decoders:</span>
                  <span className="text-slate-900 block mt-1 font-medium text-[11px]">ACTIVE | MT-NVR-64</span>
                </div>
                <div>
                  <span className="text-slate-500 block leading-none">Focal Length:</span>
                  <span className="text-slate-900 block mt-1 font-medium text-[11px]">2.8mm - 12mm Motorized</span>
                </div>
              </div>
            </div>

            {/* Float Highlight Overlay box */}
            <div className="absolute -bottom-6 -left-6 bg-slate-950 text-white p-4 rounded-xl shadow-xl max-w-[200px] hidden sm:block border border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-wider text-green-400 font-bold block">Exclusive Feature</span>
              <p className="text-xs font-bold font-display mt-1 leading-snug">
                Unified WhatsApp Invoice & Receipt Integration
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
