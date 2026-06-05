/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, HelpCircle, Award } from 'lucide-react';
import { ThemeSettings } from '../types';

interface FeaturesProps {
  theme: ThemeSettings;
}

export default function Features({ theme }: FeaturesProps) {
  if (!theme.showFeatures) return null;

  const items = [
    {
      icon: <Truck className="w-4 h-4 text-white" />,
      title: 'Free Delivery',
      desc: 'Inside Dhaka City & over ৳5000 elsewhere',
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-white" />,
      title: 'Easy Returns',
      desc: '7 days hassle-free safety policy guarantee',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      title: 'Secure bKash Pay',
      desc: 'Instant cashbacks, credit cards, or COD',
    },
    {
      icon: <HelpCircle className="w-4 h-4 text-white" />,
      title: '24/7 Service',
      desc: 'Dedicated instant ticket and phone hotline support',
    },
    {
      icon: <Award className="w-4 h-4 text-white" />,
      title: 'Premium Quality',
      desc: '100% genuine local sustainable materials',
    },
  ];

  return (
    <section id="store_features_bar" className="bg-stone-50 border-t border-b border-stone-200/90 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-around gap-y-4 gap-x-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs"
              style={{ backgroundColor: theme.accentColor }}
            >
              {item.icon}
            </div>
            <div className="text-left font-sans">
              <p className="font-bold text-gray-900 leading-tight">{item.title}</p>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
