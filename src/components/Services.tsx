/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Wrench, Smartphone, TrendingUp, Building2, Check } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesProps {
  onContactConsultant: (serviceName: string) => void;
}

export default function Services({ onContactConsultant }: ServicesProps) {
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="text-brand-secondary h-7 w-7" />;
      case 'Wrench':
        return <Wrench className="text-brand-secondary h-7 w-7" />;
      case 'Smartphone':
        return <Smartphone className="text-brand-secondary h-7 w-7" />;
      case 'TrendingUp':
        return <TrendingUp className="text-brand-secondary h-7 w-7" />;
      case 'Building2':
        return <Building2 className="text-brand-secondary h-7 w-7" />;
      default:
        return <Shield className="text-brand-secondary h-7 w-7" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      
      {/* Services Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight">
          Surveillance Services Engineered <br />
          For <span className="text-brand-secondary">Corporate Operations</span>
        </h2>
        <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          From precise physical cabling (Cat6 shielded architectures) and zero-blind-spot layouts to automated smartphone alerts, Muratech security standards secure your business with zero vulnerability.
        </p>
      </div>

      {/* Services Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {SERVICES.map((srv) => (
          <motion.div
            key={srv.id}
            className="bg-brand-medium border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-brand-primary/40 transition-all flex flex-col justify-between"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              {/* Service Icon */}
              <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                {getIconComponent(srv.icon)}
              </div>

              {/* Service Details */}
              <h3 className="text-lg font-bold text-white font-display">{srv.title}</h3>
              <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">{srv.description}</p>
              
              {/* Features List */}
              <ul className="mt-5 space-y-2 border-t border-gray-800/60 pt-4">
                {srv.features.map((feat, index) => (
                  <li key={index} className="flex items-start text-xs text-gray-300">
                    <Check size={14} className="text-brand-secondary mr-2 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Action Button */}
            <button
              id={`service-inquire-btn-${srv.id}`}
              onClick={() => onContactConsultant(srv.title)}
              className="mt-6 w-full text-center bg-brand-dark hover:bg-brand-primary hover:text-brand-dark border border-brand-primary/20 text-brand-secondary font-semibold text-xs py-2.5 rounded-lg transition-all cursor-pointer"
            >
              Request Commercial Audit
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Banner Callout */}
      <div className="mt-20 bg-gradient-to-r from-brand-medium to-brand-dark border border-gray-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mb-6 md:mb-0 max-w-xl">
          <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
            Custom Industrial Quoting
          </span>
          <h3 className="text-lg md:text-xl font-bold font-display text-white mt-2.5">
            Require custom layouts or CCTV installation bids for tenders?
          </h3>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            Our lead technicians can perform full site inspections in Nairobi, Mombasa, and Kisumu. Contact Eng. Moses Kimanzi directly.
          </p>
        </div>
        <button
          id="services-dial-btn"
          onClick={() => onContactConsultant('Complete Site Audit')}
          className="bg-brand-primary hover:bg-brand-secondary text-brand-dark font-extrabold text-xs py-3 px-6 rounded-lg transition-all shrink-0 cursor-pointer shadow-lg shadow-brand-primary/10"
        >
          Call 0729716092 Now
        </button>
      </div>

    </div>
  );
}
