/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeSettings } from '../types';

interface AboutSectionProps {
  theme: ThemeSettings;
}

export default function AboutSection({ theme }: AboutSectionProps) {
  if (!theme.showAbout) return null;

  const isSerif = theme.fontPairing === 'classic' || theme.fontPairing === 'editorial';

  return (
    <section id="store_about_section" className="bg-stone-50 border-t border-stone-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Fine imagery banner */}
        <div className="md:col-span-5 h-[220px] sm:h-[280px] rounded-lg overflow-hidden relative shadow-xs border border-stone-200/90">
          <img
            src={theme.aboutImage}
            alt="Handcrafting Story"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle color highlight filter */}
          <div className="absolute inset-0 bg-yellow-950/10 mix-blend-multiply"></div>
        </div>

        {/* Right Column: Custom text content */}
        <div className="md:col-span-7 text-left space-y-4">
          <p
            className="text-[10px] font-extrabold uppercase tracking-widest leading-none"
            style={{ color: theme.accentColor }}
          >
            {theme.aboutSubtitle}
          </p>

          <h2
            className="text-2xl font-bold leading-tight text-gray-900 tracking-tight"
            style={{
              fontFamily: isSerif ? 'Cormorant Garamond, serif' : 'Assistant, sans-serif',
            }}
          >
            {theme.aboutTitle}
          </h2>

          <div
            className="w-12 h-[2px] rounded"
            style={{ backgroundColor: theme.accentColor }}
          ></div>

          <p className="text-xs text-gray-600 leading-relaxed font-sans font-normal whitespace-pre-line">
            {theme.aboutDescription}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('store_blogs_grid');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs font-bold uppercase tracking-wider text-gray-900 hover:opacity-85 border-b border-gray-900 pb-0.5 transition cursor-pointer"
            >
              {theme.aboutLinkText}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
