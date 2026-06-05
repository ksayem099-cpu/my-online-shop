/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeSettings } from '../types';

interface PaymentBarProps {
  theme: ThemeSettings;
}

export default function PaymentBar({ theme }: PaymentBarProps) {
  const paymentChips = ['bKash Wallet', 'Nagad Pay', 'Rocket MFS', 'VISA Secure', 'MasterCard Secure', 'Cash On Delivery'];

  return (
    <div id="store_payment_seal_bar" className="bg-neutral-900 border-t border-neutral-800 py-3 px-4 sm:px-6 flex flex-wrap items-center justify-center gap-3">
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#999999]">Secure Payments Gateway:</span>
      <div className="flex flex-wrap justify-center gap-1.5">
        {paymentChips.map((chip, idx) => (
          <span
            key={idx}
            className="bg-neutral-800 border border-neutral-700/80 rounded px-2.5 py-1 text-slate-300 font-bold tracking-wide text-[9px] hover:text-white transition cursor-default shadow-sm select-none"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
