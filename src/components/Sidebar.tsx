/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, ShieldAlert } from 'lucide-react';
import { ThemeSettings, BlogPost } from '../types';

interface SidebarProps {
  theme: ThemeSettings;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  popularBlogs: BlogPost[];
  onReadPost: (post: BlogPost) => void;
}

export default function Sidebar({
  theme,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  popularBlogs,
  onReadPost,
}: SidebarProps) {
  return (
    <aside id="store_sidebar_explorer" className="space-y-6 lg:pl-6 lg:border-l lg:border-stone-200">
      
      {/* Search Widget */}
      <div className="bg-white rounded p-4 border border-stone-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-2 mb-3" style={{ borderColor: theme.accentColor }}>
          Search Products
        </h4>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type to find..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs border border-stone-200 bg-stone-50 rounded pl-3 pr-8 py-2 outline-hidden focus:border-amber-600 transition"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5" />
        </div>
      </div>

      {/* Category Filter Widget */}
      <div className="bg-white rounded p-4 border border-stone-200/80">
        <div className="flex items-center justify-between border-b-2 pb-2 mb-3" style={{ borderColor: theme.accentColor }}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
            Categories Filter
          </h4>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('')}
              className="text-[10px] text-red-600 hover:underline font-semibold"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectCategory('')}
            className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border transition ${!selectedCategory ? 'bg-gray-900 text-white border-gray-900' : 'bg-stone-50 text-gray-700 border-stone-200 hover:bg-stone-100'}`}
          >
            All Products
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onSelectCategory(cat)}
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border transition ${selectedCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-stone-50 text-gray-700 border-stone-200 hover:bg-stone-100'}`}
              style={{
                borderColor: selectedCategory === cat ? theme.accentColor : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded p-4 border border-stone-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-2 mb-3" style={{ borderColor: theme.accentColor }}>
          Blogger Masterclass
        </h4>
        <div className="space-y-3">
          {popularBlogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => onReadPost(blog)}
              className="group flex gap-2.5 items-center cursor-pointer pb-2.5 border-b border-stone-100 last:border-b-0 last:pb-0"
            >
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="w-10 h-10 object-cover rounded flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-900 group-hover:text-amber-700 leading-snug line-clamp-2 transition-colors">
                  {blog.title}
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Payment Channels */}
      <div className="bg-white rounded p-4 border border-stone-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-2 mb-3" style={{ borderColor: theme.accentColor }}>
          Accepted Gateways
        </h4>
        <div className="grid grid-cols-2 gap-1 text-[10px] text-center font-bold text-gray-700">
          <span className="bg-pink-100 text-pink-700 py-1.5 px-2 rounded-sm border border-pink-200">bKash Pay</span>
          <span className="bg-orange-100 text-orange-700 py-1.5 px-2 rounded-sm border border-orange-200">Nagad Pay</span>
          <span className="bg-sky-50 text-sky-700 py-1.5 px-2 rounded-sm border border-sky-150">Credit Card</span>
          <span className="bg-amber-100 text-amber-800 py-1.5 px-2 rounded-sm border border-amber-250 font-sans uppercase text-[8px]">Cash on Delivery</span>
        </div>
      </div>

    </aside>
  );
}
