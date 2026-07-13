/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  Smartphone, 
  RefreshCw, 
  Building2, 
  Home, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Send 
} from 'lucide-react';

export default function ServicesSection() {
  const { services, addAuditLog } = useApp();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  
  // Assessment booking state variables
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Enterprise CCTV Installation');
  const [siteLocation, setSiteLocation] = useState('Nairobi CBD');
  const [assessmentDate, setAssessmentDate] = useState('');
  const [message, setMessage] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const iconMap: Record<string, any> = {
    ShieldCheck: ShieldCheck,
    Activity: Activity,
    Smartphone: Smartphone,
    RefreshCw: RefreshCw,
    Building2: Building2,
    Home: Home
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !assessmentDate) return;

    // Trigger local audit logs to simulate a real CRM integration
    addAuditLog(
      'Service Booking',
      'email',
      `On-site safety audit booked by ${clientName} (${clientCompany || 'Private Estate'}) for ${assessmentDate} at ${siteLocation}. Assigned Category: ${serviceCategory}.`
    );

    setIsBooked(true);
    setTimeout(() => {
      // Clean form state
      setClientName('');
      setClientCompany('');
      setClientPhone('');
      setClientEmail('');
      setAssessmentDate('');
      setMessage('');
      setIsBooked(false);
    }, 4000);
  };

  return (
    <div className="bg-white py-16 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Surveillance Engineering Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Professional CCTV Engineering & Support
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-light">
            From structural wiring runs and security patch alignments, to custom Service Level Agreements (SLAs). We engineer solutions matching strict corporate frameworks.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComponent = iconMap[srv.iconName] || ShieldCheck;
            return (
              <div
                key={srv.id}
                className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-green-600/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                <div className="space-y-4">
                  {/* Service Icon Frame */}
                  <div className="p-3 bg-green-950 text-green-400 rounded-xl w-max group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-display text-lg font-bold text-slate-950 group-hover:text-green-700 transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Built-in Features */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">Baseline Rate</span>
                    <span className="font-mono text-sm font-bold text-slate-950">
                      KSh {srv.basePrice.toLocaleString()} onwards
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(srv);
                      setServiceCategory(srv.title);
                      // Scroll smoothly to the booking form below
                      const formElement = document.getElementById('assessment-booking-anchor');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xs font-mono font-bold text-green-700 hover:text-green-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Schedule Assessment →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Structured On-Site Assessment Form Anchor */}
        <div id="assessment-booking-anchor" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Guide Content Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-green-700">
              Corporate On-Site Audits
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Book a Certified Site Security Assessment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our engineers conduct full walk-through surveys to detect blindspots, calculate cable distances, test light levels, and map lens options. 
            </p>
            
            <div className="space-y-4 border-l-2 border-green-600 pl-4 py-2 font-mono text-xs">
              <div className="flex gap-2">
                <Clock className="w-4 h-4 text-green-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Average On-Site Duration:</span>
                  <span className="text-slate-800 font-bold">2.5 Hours</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Calendar className="w-4 h-4 text-green-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Deliverable Blueprint:</span>
                  <span className="text-slate-800 font-bold">Structured Network Map & Cost Sheet</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Note: This service is completely complimentary for logistics spaces, financial premises, corporate office complexes, and housing gated parks in the Nairobi Metropolitan Area.
            </p>
          </div>

          {/* Form Content Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isBooked ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center py-12 space-y-4"
                >
                  <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-slate-950">Safety Audit Logged Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-md">
                    Our lead surveillance engineer, <strong className="text-slate-900">Eng. David Kimanzi</strong>, has received your briefing details. We will contact you at your listed phone number shortly to verify credentials.
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded">
                    Check CRM panel dashboard under Audit Logs tab to monitor scheduling states.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g., Moses Mwamuye"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Company Name / Organization</label>
                      <input
                        type="text"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        placeholder="e.g., Safaricom PLC"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g., 0729716092"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Corporate Email Address</label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g., security@company.co.ke"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Target Architecture Service</label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other Customized Architecture">Other Custom Security Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Target Date *</label>
                      <input
                        type="date"
                        required
                        value={assessmentDate}
                        onChange={(e) => setAssessmentDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono font-medium text-slate-500 block">Site Geographic Zone</label>
                      <select
                        value={siteLocation}
                        onChange={(e) => setSiteLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                      >
                        <option value="Nairobi CBD">Nairobi CBD (Central Business District)</option>
                        <option value="Upper Hill Nairobi">Upper Hill / Kilimani Area</option>
                        <option value="Westlands Nairobi">Westlands / Parklands Zone</option>
                        <option value="Industrial Area Nairobi">Nairobi Industrial Area / Mombasa Road</option>
                        <option value="Mombasa Regional Yard">Mombasa County / Port Zone</option>
                        <option value="Other Kenyan Territory">Other Location (Upcountry Dispatch)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-500 block">Perimeter Briefing & Instructions</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe the assets or property to protect (e.g., multi-level office, main gate access, raw material warehouse, etc.)."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-green-600 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    Submit Booking Request
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
