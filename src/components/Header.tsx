/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Sliders, ShieldAlert, Laptop, Eye } from 'lucide-react';
import { ThemeSettings, CartItem } from '../types';

interface HeaderProps {
  theme: ThemeSettings;
  cart: CartItem[];
  currentView: 'shop' | 'admin' | 'editor';
  onViewChange: (view: 'shop' | 'admin' | 'editor') => void;
  onCartToggle: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function Header({
  theme,
  cart,
  currentView,
  onViewChange,
  onCartToggle,
  onSearchChange,
  searchQuery,
}: HeaderProps) {
  const [showInHeaderSearch, setShowInHeaderSearch] = useState(false);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      id="store_main_header"
      className="bg-white sticky top-0 z-40 border-b border-stone-200/90 py-4 px-4 sm:px-6 md:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo Branding */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewChange('shop')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 text-left outline-hidden"
            style={{
              fontFamily: theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'Cormorant Garamond, serif' : 'Assistant, sans-serif'
            }}
          >
            {theme.logoText}
          </button>
        </div>

        {/* Dynamic Multi-Mode Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-700 uppercase">
          <button
            onClick={() => {
              onViewChange('shop');
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }}
            className={`hover:text-[var(--accent)] cursor-pointer transition ${currentView === 'shop' ? 'text-amber-700 underline underline-offset-4' : ''}`}
          >
            Shop Catalog
          </button>
          
          <button
            onClick={() => {
              onViewChange('shop');
              setTimeout(() => {
                const element = document.getElementById('store_blogs_grid');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-amber-700 transition cursor-pointer"
          >
            Blogger Articles
          </button>

          <button
            onClick={() => {
              onViewChange('shop');
              setTimeout(() => {
                const element = document.getElementById('store_about_section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-amber-700 transition cursor-pointer"
          >
            Our Story
          </button>
        </nav>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Live Quick Search Field */}
          <div className="relative flex items-center">
            {showInHeaderSearch ? (
              <input
                type="text"
                placeholder="Quick search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="text-xs border border-gray-200 outline-hidden focus:border-amber-600 rounded px-3 py-1.5 w-36 sm:w-48 transition-all duration-200"
                onBlur={() => {
                  if (!searchQuery) setShowInHeaderSearch(false);
                }}
              />
            ) : (
              <button
                id="header_search_init"
                onClick={() => setShowInHeaderSearch(true)}
                className="p-1.5 text-gray-600 hover:text-amber-700 hover:bg-gray-50 rounded-full transition"
                title="Search Products"
              >
                <Search className="w-4 h-4 sm:w-5 h-5" />
              </button>
            )}
          </div>

          {/* Checkout Bag Trigger */}
          <button
            id="header_shopping_basket"
            onClick={onCartToggle}
            className="relative p-1.5 text-gray-600 hover:text-amber-700 hover:bg-gray-50 rounded-full transition flex items-center"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-650 text-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
