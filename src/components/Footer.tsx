/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { ThemeSettings } from '../types';

interface FooterProps {
  theme: ThemeSettings;
  onMerchantLogin?: () => void;
}

export default function Footer({ theme, onMerchantLogin }: FooterProps) {
  const [subEmail, setSubEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    alert(`Thank you! ${subEmail} has been added to our newsletter safely.`);
    setSubEmail('');
  };

  return (
    <footer id="store_main_footer" className="bg-neutral-900 text-stone-400 text-xs py-10 px-6 sm:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-800">
        
        {/* Col 1: Brand overview */}
        <div className="md:col-span-4 space-y-4 text-left">
          <h4 className="text-sm font-semibold text-white tracking-widest uppercase">{theme.logoText}</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-sans font-normal">
            Your single destination for premium bespoke items crafted with organic ingredients, natural teak elements, and standard-setting design philosophies.
          </p>
          <div className="space-y-1.5 font-sans font-normal text-[11px]">
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: theme.accentColor }} /> +880 1712-345678</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: theme.accentColor }} /> support@deluxestudio.com</p>
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: theme.accentColor }} /> Banani 11, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4 text-left">
          <div className="space-y-3">
            <h5 className="font-bold uppercase text-white tracking-wider text-[10px]">Categories</h5>
            <div className="flex flex-col gap-2 text-[11px]">
              <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="hover:text-white transition text-left cursor-pointer">Furniture Decor</button>
              <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="hover:text-white transition text-left cursor-pointer">Health &amp; Beauty</button>
              <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="hover:text-white transition text-left cursor-pointer">Smart Gadgets</button>
              <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="hover:text-white transition text-left cursor-pointer font-sans">Organic Teas</button>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold uppercase text-white tracking-wider text-[10px]">Customer Care</h5>
            <div className="flex flex-col gap-2 text-[11px]">
              <button onClick={() => alert('Our refund conditions state free return if returned within 7 days.')} className="hover:text-white transition text-left cursor-pointer">Refund Policies</button>
              <button onClick={() => alert('Delivery inside Dhaka: 24h. Outside Dhaka: 48h.')} className="hover:text-white transition text-left cursor-pointer">Shipping Terms</button>
              <button onClick={() => alert('Tested secure checkout. bKash payment uses authentic SSL protocol.')} className="hover:text-white transition text-left cursor-pointer">MFS Secure Pay</button>
              <span className="text-[10px] text-emerald-400 font-bold">&#9679; Support Online</span>
            </div>
          </div>
        </div>

        {/* Col 3: Newsletter */}
        <div className="md:col-span-4 space-y-4 text-left">
          <h5 className="font-bold uppercase text-white tracking-wider text-[10px]">Subscribe to our emails</h5>
          <p className="text-[11px] text-stone-400 leading-relaxed font-sans font-normal">
            Receive updates on incoming boutique catalogs, seasonal promo alerts, and exclusive MFS cashback events.
          </p>

          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              required
              placeholder="Email address"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              className="w-full text-xs text-white bg-transparent border border-stone-700 focus:border-white rounded px-3.5 py-2.5 outline-hidden pr-10 font-sans"
            />
            <button
              type="submit"
              className="absolute right-3 text-stone-400 hover:text-white transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-[10px] text-stone-500 flex items-center gap-1 leading-none font-sans font-normal">
            <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
            <span>Need advice? Call or WhatsApp anytime.</span>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans">
        <p className="font-normal text-stone-500">
          &copy; {new Date().getFullYear()} {theme.logoText}. Powered by Shopify Dawn Theme Engine. All rights reserved.
        </p>

        <div className="flex items-center gap-4 font-semibold text-stone-550">
          <button onClick={() => alert('Your privacy is 100% guarded.')} className="hover:text-slate-350 transition cursor-pointer">Privacy Policy</button>
          <button onClick={() => alert('All transactions operate in sandbox preview mode.')} className="hover:text-slate-350 transition cursor-pointer">Terms of Service</button>
          
          {onMerchantLogin && (
            <>
              <span className="text-stone-700">|</span>
              <button
                type="button"
                onClick={onMerchantLogin}
                className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1 font-bold text-[10px] uppercase text-stone-400 bg-neutral-800 px-2 py-1 rounded border border-neutral-700"
                title="Launcher for separate Personal Admin and Theme Composer Website"
              >
                🗝️ Merchant Portal
              </button>
            </>
          )}
        </div>
      </div>

    </footer>
  );
}
