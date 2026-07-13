/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Send, 
  CheckCircle,
  Video
} from 'lucide-react';

export default function ContactSection() {
  const { contactInfo, addAuditLog } = useApp();
  
  // Interactive Nairobi map zone selector
  const [activeZone, setActiveZone] = useState<string>('cbd');
  
  // Message form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const mapZones = [
    { 
      id: 'cbd', 
      name: 'Muratech Plaza - CBD', 
      coords: 'Luthuli Avenue, Nairobi', 
      description: 'Central supply depot, wholesale counter, and customer training center.',
      cams: '32 Connected',
      dispatches: '4 Tech Units Ready'
    },
    { 
      id: 'upperhill', 
      name: 'Safaricom Area Hub - Upper Hill', 
      coords: 'Apex Towers, Kilimani', 
      description: 'Regional monitoring command center and emergency server backups.',
      cams: '14 Connected',
      dispatches: '2 Tech Units Ready'
    },
    { 
      id: 'westlands', 
      name: 'Westlands Security Hub', 
      coords: 'Delta Corner, Westlands', 
      description: 'Enterprise consulting desk, executive planning rooms, and site surveyors dispatch.',
      cams: '19 Connected',
      dispatches: '3 Tech Units Ready'
    }
  ];

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Log the user's communication to our secure audit trail
    addAuditLog(
      'Inquiry Received',
      'email',
      `Message received from ${name} (${email}). Subject: "${subject || 'General inquiry'}". Message excerpt: "${message.slice(0, 45)}...".`
    );

    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="bg-white py-16 text-slate-900 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Surveillance Command Coordinates
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Secure Corporate Contact Channels
          </h2>
          <p className="text-slate-600 font-light text-sm max-w-xl mx-auto">
            Contact our Nairobi engineering offices or trigger a direct WhatsApp order prompt with immediate invoice receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Interactive Map Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-950">Administrative Headquarters</h3>
              
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                
                {/* Phone Card */}
                <div className="flex gap-4">
                  <div className="p-2.5 bg-green-50 text-green-700 rounded-lg shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Call Operations Desk</span>
                    <a href={`tel:${contactInfo.phone}`} className="font-mono text-slate-900 font-bold hover:text-green-700 transition-colors">
                      +254 {contactInfo.phone.slice(1)}
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex gap-4">
                  <div className="p-2.5 bg-green-50 text-green-700 rounded-lg shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">General Enquiries</span>
                    <a href={`mailto:${contactInfo.email}`} className="font-mono text-slate-900 font-bold hover:text-green-700 transition-colors break-all">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex gap-4">
                  <div className="p-2.5 bg-green-50 text-green-700 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Physical Showroom</span>
                    <p className="text-slate-700 leading-relaxed font-light text-xs">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                {/* SLA Card */}
                <div className="flex gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-emerald-700 block font-bold">Dispatch SLA Status</span>
                    <span className="font-bold text-slate-900 text-xs">ACTIVE - 24 Hours Emergency On-Site</span>
                  </div>
                </div>

              </div>

              {/* Social Medias Grid */}
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold mb-3">Enterprise Feeds</span>
                <div className="flex gap-3">
                  <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-green-700 hover:border-green-600/30 transition-all flex items-center gap-1 text-xs font-semibold">
                    <Facebook className="w-4 h-4 fill-current" /> Facebook
                  </a>
                  <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-green-700 hover:border-green-600/30 transition-all flex items-center gap-1 text-xs font-semibold">
                    <Twitter className="w-4 h-4 fill-current" /> Twitter
                  </a>
                  <a href="https://tiktok.com/@muratech" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-green-700 hover:border-green-600/30 transition-all flex items-center gap-1 text-xs font-semibold">
                    <MessageCircle className="w-4 h-4 fill-current" /> TikTok
                  </a>
                </div>
              </div>

            </div>

            {/* Custom Interactive Nairobi Vector Map */}
            <div className="bg-green-950 text-white rounded-2xl p-6 border border-green-900 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center pb-3 border-b border-green-900">
                <span className="text-xs uppercase font-mono text-green-400 font-semibold tracking-wider block">Interactive Nairobi Map Tracker</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-[9px] font-bold uppercase rounded border border-emerald-500/20">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> Live telemetry
                </span>
              </div>

              {/* Vector Map Layout */}
              <div className="aspect-[16/10] bg-green-950/60 rounded-xl border border-green-900 p-4 relative overflow-hidden flex items-center justify-center">
                {/* Simulated Roads / Grid lines */}
                <svg className="absolute inset-0 w-full h-full text-green-900/40" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50" x2="100%" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="100%" y2="120" stroke="currentColor" strokeWidth="2" />
                  <line x1="120" y1="0" x2="120" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="280" y1="0" x2="280" y2="100%" stroke="currentColor" strokeWidth="2" />
                  {/* Rivers / Diagonal avenues */}
                  <path d="M 0 180 Q 150 130 350 160" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Map Hotspots buttons */}
                <button
                  onClick={() => setActiveZone('cbd')}
                  className={`absolute left-[35%] top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110 cursor-pointer`}
                >
                  <span className={`relative flex h-8 w-8`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeZone === 'cbd' ? 'bg-green-400' : 'bg-slate-600'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-8 w-8 ${activeZone === 'cbd' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200'} border-2 border-green-950 flex items-center justify-center font-mono text-[10px] font-bold`}>
                      M1
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveZone('upperhill')}
                  className="absolute left-[65%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110 cursor-pointer"
                >
                  <span className="relative flex h-8 w-8">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeZone === 'upperhill' ? 'bg-green-400' : 'bg-slate-600'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-8 w-8 ${activeZone === 'upperhill' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200'} border-2 border-green-950 flex items-center justify-center font-mono text-[10px] font-bold`}>
                      M2
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveZone('westlands')}
                  className="absolute left-[20%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110 cursor-pointer"
                >
                  <span className="relative flex h-8 w-8">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeZone === 'westlands' ? 'bg-green-400' : 'bg-slate-600'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-8 w-8 ${activeZone === 'westlands' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200'} border-2 border-green-950 flex items-center justify-center font-mono text-[10px] font-bold`}>
                      M3
                    </span>
                  </span>
                </button>
                
                {/* Quick Map Label marker overlay */}
                <div className="absolute top-2 left-2 text-[8px] font-mono bg-green-950/80 p-1.5 rounded border border-green-900 backdrop-blur-sm">
                  Click pins (M1-M3) to load zone SLAs
                </div>
              </div>

              {/* Dynamic Coordinate info block */}
              {(() => {
                const zone = mapZones.find(z => z.id === activeZone) || mapZones[0];
                return (
                  <div className="bg-green-950/80 border border-green-900 p-4 rounded-xl text-left space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-bold text-green-400 text-xs sm:text-sm">{zone.name}</h4>
                      <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1 shrink-0">
                        <Video className="w-3.5 h-3.5 text-green-400" /> {zone.cams}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-mono leading-tight">{zone.coords}</p>
                    <p className="text-[11px] text-slate-300 leading-normal font-light">{zone.description}</p>
                    <div className="pt-2 border-t border-green-900 flex justify-between text-[9px] font-mono text-green-400/80 font-bold">
                      <span>Response SLA: &lt;60 Mins</span>
                      <span>{zone.dispatches}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Secure Message Transmission Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-xl text-left relative overflow-hidden">
            <h3 className="font-display font-bold text-xl text-slate-950 mb-1">Transmit Secure Dispatch Message</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Fill out the security routing parameters below to transmit a direct brief regarding secure installations or product orders.
            </p>

            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col justify-center items-center text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
                    <CheckCircle className="w-10 h-10 animate-pulse" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-950">Message Sent Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Your encryption channel was accepted. A copy of the contact has been logged inside our central tracking dashboard under CRM logs.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Sender Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Kairu Kimanzi"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Sender Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., moses@company.co.ke"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Direct Mobile Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., 0729716092"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Brief Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Commercial 32-Cam SLA Inquiry"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-500 block">Core Inquiry Briefing *</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your security inquiry or order specifications in full here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    Transmit Inquiry Details
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
