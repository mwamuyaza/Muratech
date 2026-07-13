/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Shield, Send, X, Bot, AlertTriangle, CornerDownLeft, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface AiAssistantProps {
  onSuggestProduct: (productId: string) => void;
}

export default function AiAssistant({ onSuggestProduct }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Greetings. I am Muratech's Enterprise CCTV Lead AI Systems Architect. Specify your facility dimensions or estimated camera count, and I will recommend structural positions, cabling distances, and actual hardware configurations from our current Nairobi warehouse inventory."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue('');

    const newUserMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          history: messages.map(msg => ({ role: msg.role, text: msg.text })),
          systemInstruction: "You are a professional CCTV Installation Expert guiding elite corporate enterprises in Nairobi. Advise them with direct technical precision, zero fluff, and refer them to Muratech store items with correct pricing whenever relevant. Telephone: 0729716092."
        })
      });

      const data = await response.json();
      
      const newModelMsg: ChatMessage = {
        id: `msg-${Date.now()}-model`,
        role: 'model',
        text: data.text || "I apologize. I was unable to compile a physical surveillance suggestion. Please dial 0729716092 to reach our principal design office directly."
      };

      setMessages(prev => [...prev, newModelMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'model',
        text: "Direct connection with our Gemini AI server has timed out. For immediate personal consulting, please dial 0729716092 or email kimanzikairu007@gmail.com."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button with pulsing accent */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="ai-assistant-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-primary text-brand-dark p-4 rounded-full shadow-2xl hover:bg-brand-secondary transition-all cursor-pointer flex items-center justify-center relative border border-brand-secondary group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot size={24} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-secondary"></span>
          </span>
          <span className="absolute right-14 bg-brand-medium border border-gray-800 text-brand-secondary text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            CCTV AI Architect
          </span>
        </motion.button>
      </div>

      {/* Slide-out Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end">
            
            {/* Click outside container closes */}
            <div className="flex-1" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#0D121F] border-l border-gray-800 w-full max-w-md h-full shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="bg-brand-medium border-b border-gray-800 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-brand-primary/10 p-2 rounded-lg border border-brand-primary/20 text-brand-secondary">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display flex items-center space-x-1">
                      <span>CCTV AI Consultant</span>
                      <Sparkles size={11} className="text-brand-secondary" />
                    </h3>
                    <p className="text-[10px] text-gray-400">Powered by Gemini & Muratech Catalog</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Message scroll container */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                        msg.role === 'user'
                          ? 'bg-brand-primary text-brand-dark font-semibold rounded-tr-none'
                          : 'bg-brand-medium border border-gray-800 text-gray-300 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-brand-medium border border-gray-800 rounded-2xl rounded-tl-none p-3 flex space-x-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggesters */}
              <div className="p-3 bg-brand-medium/30 border-t border-gray-800/40 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setInputValue("What is the cost of a full 16-channel 4K CCTV system?")}
                  className="text-[9px] bg-brand-dark border border-gray-800 hover:border-brand-primary text-gray-400 hover:text-brand-secondary px-2 py-1 rounded transition-all cursor-pointer"
                >
                  System cost?
                </button>
                <button
                  onClick={() => setInputValue("How do you protect systems against power blackouts in Kenya?")}
                  className="text-[9px] bg-brand-dark border border-gray-800 hover:border-brand-primary text-gray-400 hover:text-brand-secondary px-2 py-1 rounded transition-all cursor-pointer"
                >
                  Power protection?
                </button>
                <button
                  onClick={() => setInputValue("Can I monitor my warehouse perimeters on my phone?")}
                  className="text-[9px] bg-brand-dark border border-gray-800 hover:border-brand-primary text-gray-400 hover:text-brand-secondary px-2 py-1 rounded transition-all cursor-pointer"
                >
                  Phone monitoring?
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-brand-medium border-t border-gray-800 flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask Muratech CCTV Architect..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-brand-dark border border-gray-700 text-white text-xs rounded-xl px-3.5 py-3 flex-1 focus:outline-none focus:border-brand-primary font-sans"
                />
                <button
                  id="ai-send-btn"
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-brand-primary hover:bg-brand-secondary text-brand-dark p-3 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
