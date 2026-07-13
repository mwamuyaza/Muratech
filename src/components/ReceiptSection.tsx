/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useApp } from '../contexts/AppContext';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe 
} from 'lucide-react';
import { useState } from 'react';

export default function ReceiptSection() {
  const { orders, selectedOrder, setSelectedOrder, contactInfo } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');

  const activeOrder = selectedOrder || (orders.length > 0 ? orders[0] : null);

  const handleDownloadSimulation = () => {
    setDownloading(true);
    setDownloadMessage('');
    setTimeout(() => {
      setDownloading(false);
      setDownloadMessage('PDF Invoice & M-Pesa Official Receipt generated. Dispatch saved to Downloads Folder.');
      setTimeout(() => setDownloadMessage(''), 4000);
    }, 1500);
  };

  const handlePrintSimulation = () => {
    window.print();
  };

  return (
    <div className="bg-white py-16 text-slate-900 min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
            Surveillance Audit Ledger
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
            Official Invoices & Receipts
          </h2>
          <p className="text-slate-600 font-light text-sm max-w-xl mx-auto">
            Browse corporate purchase bills, download printable PDF transaction records, and check hardware delivery SLAs.
          </p>
        </div>

        {/* Conditional content layout */}
        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 p-16 rounded-2xl text-center space-y-4 max-w-md mx-auto shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-slate-900">No transactions recorded</h3>
            <p className="text-xs text-slate-500">
              No recent equipment checkout entries have been finalized. Place an order inside our shop first to inspect official receipts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar: Recent Transactions selector */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
              <h3 className="font-display font-bold text-sm text-slate-950 uppercase tracking-wider pb-3 border-b border-slate-100">
                Recent Orders ({orders.length})
              </h3>
              
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                {orders.map((o) => {
                  const isActive = activeOrder?.id === o.id;
                  return (
                    <div
                      key={o.id}
                      onClick={() => setSelectedOrder(o)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isActive
                          ? 'border-green-500 bg-green-50/20 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50/40'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-slate-900">{o.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          o.paymentStatus === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-500 truncate mt-1.5">{o.customerName}</p>
                      
                      <div className="flex justify-between items-baseline mt-2.5">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(o.date).toLocaleDateString()}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-900">
                          KSh {o.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Active Detailed Invoice/Receipt layout */}
            {activeOrder && (
              <div className="lg:col-span-8 space-y-6 text-left">
                
                {/* Action button header row */}
                <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                  <span className="text-xs text-slate-500 font-mono">
                    System Document: <strong className="text-slate-900">{activeOrder.invoiceNumber}</strong>
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadSimulation}
                      disabled={downloading}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {downloading ? 'Downloading...' : 'PDF Export'}
                    </button>
                    <button
                      onClick={handlePrintSimulation}
                      className="px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Bill
                    </button>
                  </div>
                </div>

                {downloadMessage && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl p-4 text-center">
                    {downloadMessage}
                  </div>
                )}

                {/* Main Invoice sheet */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 sm:p-12 relative overflow-hidden font-sans print:border-none print:shadow-none">
                  
                  {/* Subtle stamp watermarks */}
                  <div className="absolute top-10 right-10 flex flex-col items-center p-3 border-2 border-green-500/20 text-green-700 rounded-full font-mono text-[10px] font-bold uppercase rotate-12 shrink-0 select-none">
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    <span>Paid</span>
                  </div>

                  {/* Document Header block */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-950">
                        <div className="p-1.5 bg-green-700 text-white rounded">
                          <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        <span className="font-display font-extrabold text-base tracking-tight uppercase">
                          MURATECH SECURITY SOLUTIONS
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block tracking-widest leading-none uppercase">Certified surveillance integration systems</span>
                    </div>

                    <div className="text-left sm:text-right text-xs font-mono text-slate-500 space-y-1">
                      <p className="font-bold text-slate-950 text-sm uppercase">Invoice & Bill Sheet</p>
                      <p>Reference: {activeOrder.id}</p>
                      <p>Date: {new Date(activeOrder.date).toLocaleString()}</p>
                      {activeOrder.receiptNumber && (
                        <p className="text-green-700 font-bold font-mono">M-Pesa Receipt: {activeOrder.receiptNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Company vs Buyer Addresses row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-100 text-xs">
                    
                    {/* Biller info */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Service Provider Details</span>
                      <p className="font-bold text-slate-950">Muratech Security Solutions Ltd.</p>
                      <p className="text-slate-500 leading-relaxed font-light">
                        River Road & Luthuli Avenue Complex<br />
                        Plaza Building, Level 2 Office 24<br />
                        Nairobi, Kenya
                      </p>
                      <p className="text-slate-500 font-mono">Mobile: {contactInfo.phone}</p>
                    </div>

                    {/* Buyer info */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Consignee Buyer Details</span>
                      <p className="font-bold text-slate-950">{activeOrder.customerName}</p>
                      <p className="text-slate-500 leading-relaxed font-light">
                        Billing Channel: {activeOrder.paymentMethod.toUpperCase()}<br />
                        Destination Zone: Nairobi Metropolitan Delivery<br />
                        Consignee Email: {activeOrder.customerEmail}
                      </p>
                      <p className="text-slate-500 font-mono">Mobile: {activeOrder.customerPhone}</p>
                    </div>

                  </div>

                  {/* Items list list table */}
                  <div className="py-8 border-b border-slate-100 text-xs">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-4">Allocated Equipment & Sub-Totals</span>
                    
                    <div className="space-y-4">
                      {activeOrder.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 font-mono text-slate-700">
                          <div className="text-left space-y-0.5 max-w-sm sm:max-w-md">
                            <span className="font-sans font-bold text-slate-950 text-sm block leading-tight">{i.name}</span>
                            <span className="text-[10px] text-slate-400">Qty: {i.quantity} x KSh {i.price.toLocaleString()}</span>
                          </div>
                          <span className="font-bold text-slate-950 text-sm">
                            KSh {(i.price * i.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invoice Summary box */}
                  <div className="py-8 flex flex-col items-end space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between w-64 text-slate-500">
                      <span>Sub-total:</span>
                      <span>KSh {(activeOrder.totalAmount * 0.84).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between w-64 text-slate-500">
                      <span>Standard VAT 16%:</span>
                      <span>KSh {(activeOrder.totalAmount * 0.16).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between w-64 text-slate-950 font-bold text-base border-t border-slate-100 pt-3">
                      <span>Total Invoice:</span>
                      <span className="text-green-700 font-bold">KSh {activeOrder.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Document Footer block */}
                  <div className="pt-8 border-t border-slate-100 text-center space-y-4 text-xs">
                    <div className="flex justify-center gap-6 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +254 729 716 092</span>
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> kimanzikairu007@gmail.com</span>
                      <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> muratech.co.ke</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-mono max-w-md mx-auto">
                      All engineering services are guarded under SLA guidelines. Certified equipment holds a direct 12-month manufacturer warranty. For emergency dispatch issues, call support hotline within 4-Hour windows.
                    </p>
                  </div>

                </div>

                {/* Additional SLA Dispatch Status Tracking info card */}
                <div className="bg-green-950 text-white rounded-2xl p-6 shadow-sm flex items-center gap-4 relative overflow-hidden border border-green-900">
                  <div className="p-3 bg-green-700 text-white rounded-xl shrink-0">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="font-display font-bold text-sm">Hardware Delivery & SLA Dispatch SLA Status</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl font-light">
                      Since payment was verified, our logistics team is routing this purchase. If you ordered installation, our engineer <strong className="text-white font-semibold">Eng. David Kimanzi</strong> will call you shortly to confirm the layout and cabling schedule.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
