/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeSettings } from '../types';

interface HeroProps {
  theme: ThemeSettings;
}

export default function Hero({ theme }: HeroProps) {
  // Use classic serif typography for classic/editorial font choice or sans-serif for others
  const isSerif = theme.fontPairing === 'classic' || theme.fontPairing === 'editorial';

  return (
    <div
      id="store_hero_section"
      className="relative h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${theme.heroBgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Visual luxury circle accents */}
      <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 border-[40px] border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute left-0 top-0 -translate-x-12 -translate-y-12 w-48 h-48 border-[20px] border-white/5 rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 text-center z-10 space-y-4">
        {theme.heroBadge && (
          <p
            id="hero_badge_tagline"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none drop-shadow-sm select-none"
            style={{ color: theme.accentColor }}
          >
            ✦ {theme.heroBadge} ✦
          </p>
        )}

        <h1
          id="hero_primary_title"
          className="text-2xl sm:text-4xl md:text-5xl font-medium text-white leading-tight drop-shadow-sm tracking-tight"
          style={{
            fontFamily: isSerif ? 'Cormorant Garamond, serif' : 'Assistant, sans-serif',
          }}
        >
          {theme.heroTitle}
        </h1>

        {theme.heroSubtitle && (
          <p
            id="hero_secondary_description"
            className="text-xs sm:text-sm text-gray-250/95 max-w-xl mx-auto leading-relaxed line-clamp-3 font-sans font-normal"
          >
            {theme.heroSubtitle}
          </p>
        )}

        <div className="pt-2">
          <button
            id="hero_action_trigger"
            onClick={() => {
              const element = document.getElementById('store_products_headline');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block bg-white text-gray-900 border border-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-xs hover:bg-transparent hover:text-white cursor-pointer active:scale-98 transition duration-350"
          >
            {theme.heroBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}
