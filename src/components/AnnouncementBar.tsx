/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeSettings } from '../types';

interface AnnouncementBarProps {
  theme: ThemeSettings;
}

export default function AnnouncementBar({ theme }: AnnouncementBarProps) {
  if (!theme.showAnnouncement) return null;

  return (
    <div
      id="store_announcement_bar"
      className="text-center py-2 px-4 text-xs font-bold font-sans tracking-wide transition-all duration-300 relative z-40 overflow-hidden leading-normal shadow-xs select-none"
      style={{
        backgroundColor: theme.announcementBg,
        color: theme.announcementColor,
      }}
    >
      <div className="flex items-center justify-center gap-1">
        <span>{theme.announcementText}</span>
      </div>
    </div>
  );
}
