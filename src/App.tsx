/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './contexts/AppContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StoreSection from './components/StoreSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import CartSection from './components/CartSection';
import ReceiptSection from './components/ReceiptSection';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Tv, 
  Wrench, 
  Smartphone, 
  Zap, 
  Star, 
  ArrowRight, 
  MessageSquare,
  FileCheck2,
  Lock
} from 'lucide-react';
import { useState, useEffect } from 'react';

function MainAppLayout() {
  const { currentTab, setCurrentTab, products, testimonials, addToCart } = useApp();

  // Listen to hash changes for deep linking (e.g., from checkout redirect back to invoice)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#receipt') {
        setCurrentTab('receipt');
      } else if (hash === '#admin') {
        setCurrentTab('admin-dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentTab]);

  // Dynamic Tab Switcher Render
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomepageContent />;
      case 'shop':
        return <StoreSection />;
      case 'services':
        return <ServicesSection />;
      case 'gallery':
        return <GallerySection />;
      case 'blog':
        return <BlogSection />;
      case 'faqs':
        return <FAQSection />;
      case 'contact':
        return <ContactSection />;
      case 'cart':
        return <CartSection />;
      case 'receipt':
        return <ReceiptSection />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomepageContent />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-green-600 selection:text-white">
      <Navbar />
      
      {/* Immersive Main view transitions */}
      <main className="flex-1">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {renderTabContent()}
        </motion.div>
      </main>

      <Footer />

      {/* Global Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/254729716092?text=Hello%20Muratech%20CCTV%2C%20I%20have%20an%20inquiry%20regarding%20your%20commercial%20surveillance%20and%20CCTV%20security%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
        title="Chat on WhatsApp"
        id="whatsapp-floating-button"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.284 3.508 8.49-.004 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.5-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.97-2.899-5.437 0-9.862 4.37-9.866 9.8.001 1.762.47 3.487 1.355 5.011l-.995 3.637 3.737-.98zm11.367-6.401c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.434.096-.129.193-.5.627-.613.751-.113.124-.226.14-.419.045-.193-.096-.815-.3-1.553-.959-.574-.512-.962-1.144-1.075-1.337-.113-.192-.012-.296.084-.392.087-.086.193-.224.289-.336.096-.113.129-.193.193-.321.064-.129.032-.24-.016-.336-.048-.096-.434-1.044-.596-1.434-.157-.38-.33-.329-.452-.336-.117-.006-.252-.007-.388-.007-.136 0-.356.051-.542.253-.187.202-.714.697-.714 1.7s.731 1.972.833 2.106c.101.134 1.438 2.197 3.483 3.08.487.21 1.05.32 1.45.283.447-.044 1.373-.56 1.567-1.1.194-.54.194-1.003.136-1.1-.058-.097-.21-.154-.403-.25z" />
        </svg>
      </a>
    </div>
  );
}

// Home Tab curated sub-layout
function HomepageContent() {
  const { setCurrentTab, products, testimonials, addToCart } = useApp();
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Showcase first 4 products on home page
  const curatedProducts = products.slice(0, 4);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="space-y-0">
      {/* 1. Immersive Hero visual section */}
      <HeroSection />

      {/* 2. Structured Bento grid highlight solutions */}
      <section className="bg-white py-20 text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">Engineered Solutions Grid</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              High-Precision CCTV Vigilance Blueprints
            </h2>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              We design and execute custom setups fitted with automated alert modules, high thermal sensitivity lenses, and redundant cloud proxies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Box A */}
            <div className="bg-white border border-slate-150 p-8 rounded-2xl shadow-sm text-left space-y-4 hover:border-green-600/30 hover:shadow-md transition-all">
              <div className="p-3 bg-green-950 text-green-400 rounded-xl w-max">
                <Tv className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-950">4K Ultra-HD Stream clarity</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Capture pristine vehicle license numbers and facial profiles. Deep integration with starlight optical sensors for full night visibility.
              </p>
            </div>

            {/* Box B */}
            <div className="bg-white border border-slate-150 p-8 rounded-2xl shadow-sm text-left space-y-4 hover:border-green-600/30 hover:shadow-md transition-all">
              <div className="p-3 bg-green-950 text-green-400 rounded-xl w-max">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-950">Proactive SLA maintenance</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Guaranteed monthly diagnostic scans, lens clearing, firmware updates, and immediate hot-swap backup cameras for absolute operational safety.
              </p>
            </div>

            {/* Box C */}
            <div className="bg-white border border-slate-150 p-8 rounded-2xl shadow-sm text-left space-y-4 hover:border-green-600/30 hover:shadow-md transition-all">
              <div className="p-3 bg-green-950 text-green-400 rounded-xl w-max">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-950">Remote monitor & push</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Stream secure feeds from any global location on your phone. Highly encrypted feeds with instant intrusion push alerts and perimeter tripwires.
              </p>
            </div>

            {/* Box D */}
            <div className="bg-white border border-slate-150 p-8 rounded-2xl shadow-sm text-left space-y-4 hover:border-green-600/30 hover:shadow-md transition-all">
              <div className="p-3 bg-green-950 text-green-400 rounded-xl w-max">
                <Zap className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-base font-bold text-slate-950">Automated M-Pesa STK Pushes</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Complete your transaction securely. Real-time Safaricom API integrations issue official invoices and printable receipts on the fly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Products showcase section */}
      <section className="bg-white py-20 text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">Curated catalog best sellers</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                Premium Hardware Solutions
              </h2>
            </div>
            
            <button
              onClick={() => setCurrentTab('shop')}
              className="px-5 py-2.5 border border-slate-200 hover:border-green-600 hover:text-green-700 text-slate-800 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              Explore Shop Marketplace
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curatedProducts.map((p) => {
              const outOfStock = p.stock <= 0;
              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-green-600/35 hover:shadow-md transition-all flex flex-col justify-between text-left group relative"
                >
                  <span className="absolute top-3 left-3 z-10 bg-green-950 text-white text-[8px] font-mono px-2 py-0.5 rounded">
                    {p.modelNumber}
                  </span>

                  <div className="aspect-square bg-slate-50 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-green-700 uppercase font-bold">{p.category}</span>
                      <h4 className="font-display font-bold text-slate-950 text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-slate-950">KSh {p.price.toLocaleString()}</span>
                      
                      <button
                        onClick={() => addToCart(p)}
                        disabled={outOfStock}
                        className={`px-3 py-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all ${
                          outOfStock
                            ? 'bg-slate-100 text-slate-400'
                            : 'bg-green-700 hover:bg-green-800 text-white shadow-sm cursor-pointer'
                        }`}
                      >
                        Add to basket
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Interactive testimonial carousels slider */}
      <section className="bg-green-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-green-400">Corporate SLA Endorsements</span>
          
          <div className="min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <p className="font-display text-base sm:text-xl font-medium leading-relaxed italic text-slate-100">
                  "{testimonials[activeTestimonialIndex].text}"
                </p>
                
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={testimonials[activeTestimonialIndex].avatar}
                    alt={testimonials[activeTestimonialIndex].author}
                    className="w-10 h-10 rounded-full border border-green-800 bg-green-950 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left text-xs font-mono">
                    <h4 className="text-white font-bold leading-none">{testimonials[activeTestimonialIndex].author}</h4>
                    <span className="text-green-300 mt-1 block">{testimonials[activeTestimonialIndex].company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial slider controllers dots */}
          <div className="flex gap-1.5 justify-center">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeTestimonialIndex === idx ? 'bg-green-400 w-4' : 'bg-green-900'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. complimentary site assessment Banner CTA */}
      <section className="bg-green-700 text-white py-16 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-green-200 font-bold block">Complimentary Site Security Survey</span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Protecting what matters. Book your assessment.</h3>
              <p className="text-sm text-green-100/90 max-w-3xl leading-relaxed">
                Receive an extensive camera location blueprint, lens projection analysis, and precise cabling quotes from a licensed engineer—completely free of charge within Nairobi.
              </p>
            </div>
            
            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={() => setCurrentTab('services')}
                className="px-8 py-4 bg-white hover:bg-green-50 text-green-800 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xl"
              >
                Schedule Site Audit
                <FileCheck2 className="w-4 h-4 text-green-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
