/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sliders, ToggleLeft, ToggleRight, ArrowUp, ArrowDown, Palette, Type, Image, Layout, Smartphone, Monitor } from 'lucide-react';
import { ThemeSettings, FontPairing } from '../types';

interface ThemeEditorProps {
  theme: ThemeSettings;
  onUpdateTheme: (updated: ThemeSettings) => void;
  previewMode: 'desktop' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export default function ThemeEditor({
  theme,
  onUpdateTheme,
  previewMode,
  onPreviewModeChange,
}: ThemeEditorProps) {
  
  // Custom helper to quickly adjust field
  const setField = (key: keyof ThemeSettings, value: any) => {
    onUpdateTheme({
      ...theme,
      [key]: value
    });
  };

  const colorPresets = [
    { name: 'Dawn Gold (Shopify Look)', accent: '#c8a96e', bg: '#ffffff', text: '#1a1a1a' },
    { name: 'Organic Sage', accent: '#708238', bg: '#fbfbf9', text: '#2c3514' },
    { name: 'Cosmic Obsidian', accent: '#d53f8c', bg: '#ffffff', text: '#171717' },
    { name: 'Crimson Rose', accent: '#cb4c4c', bg: '#faf9f6', text: '#222222' },
  ];

  const handlePresets = (preset: typeof colorPresets[0]) => {
    onUpdateTheme({
      ...theme,
      accentColor: preset.accent,
      primaryBg: preset.bg,
      textColor: preset.text,
    });
  };

  // Up/Down arrows section organizer
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const nextOrder = [...theme.sections];
    if (direction === 'up' && index > 0) {
      const temp = nextOrder[index - 1];
      nextOrder[index - 1] = nextOrder[index];
      nextOrder[index] = temp;
    } else if (direction === 'down' && index < nextOrder.length - 1) {
      const temp = nextOrder[index + 1];
      nextOrder[index + 1] = nextOrder[index];
      nextOrder[index] = temp;
    }
    setField('sections', nextOrder);
  };

  return (
    <div id="theme_editor_sidebar" className="bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-lg space-y-6 text-left text-xs font-sans">
      
      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-5.5 h-5.5 text-amber-500 animate-spin-slow" />
          <h3 className="text-sm font-bold font-sans tracking-tight">Dawn Section Composer</h3>
        </div>
        
        {/* Viewport frames customizer */}
        <div className="flex bg-slate-950 border border-slate-800 rounded p-0.5">
          <button
            onClick={() => onPreviewModeChange('desktop')}
            className={`p-1.5 rounded transition ${previewMode === 'desktop' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
            title="Desktop Look"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPreviewModeChange('mobile')}
            className={`p-1.5 rounded transition ${previewMode === 'mobile' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
            title="Smartphone Adaptation Simulator"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset color picker palettes */}
      <div className="space-y-3">
        <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-amber-400" /> Branding Palette Presets
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresets(preset)}
              className="p-2 border border-slate-800 rounded-sm bg-slate-950 hover:bg-slate-900 text-left transition flex items-center justify-between"
              type="button"
            >
              <div>
                <p className="font-bold text-[9px] text-slate-200 line-clamp-1">{preset.name}</p>
                <div className="flex gap-1 mt-1">
                  <span className="w-3 h-3 rounded-full border border-slate-800" style={{ backgroundColor: preset.accent }}></span>
                  <span className="w-3 h-3 rounded-full border border-slate-800" style={{ backgroundColor: preset.bg }}></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Colors Input fields directly Customizer */}
      <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
        <div>
          <label className="block text-[9px] text-slate-400 font-bold uppercase mb-1">Accent Seal Hex</label>
          <input
            type="text"
            value={theme.accentColor}
            onChange={(e) => setField('accentColor', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5 font-mono"
          />
        </div>
        <div>
          <label className="block text-[9px] text-slate-400 font-bold uppercase mb-1">Body Background</label>
          <input
            type="text"
            value={theme.primaryBg}
            onChange={(e) => setField('primaryBg', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5 font-mono"
          />
        </div>
      </div>

      {/* Typography Selection Pairing options */}
      <div className="space-y-2 pb-3 border-b border-slate-800">
        <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Type className="w-3.5 h-3.5 text-amber-400" /> Typography Font Pairings
        </h4>
        <select
          value={theme.fontPairing}
          onChange={(e) => setField('fontPairing', e.target.value as FontPairing)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5"
        >
          <option value="classic">Standard Classic: Cormorant Garamond / Assistant</option>
          <option value="modern">Modern Tech: Inter Display / Sans-serif</option>
          <option value="editorial">Editorial Elegance: Playfair Display / Serif</option>
          <option value="minimalist">Strict Minimalist: Monospace &amp; Sans</option>
        </select>
      </div>

      {/* Custom Hero banners content builder */}
      <div className="space-y-4 pb-3 border-b border-slate-800">
        <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Image className="w-3.5 h-3.5 text-amber-400" /> Hero Branding &amp; Banners
        </h4>
        
        <div>
          <label className="block text-[9px] text-slate-400 uppercase mb-1">Store Brand / Header Logo</label>
          <input
            type="text"
            value={theme.logoText}
            onChange={(e) => setField('logoText', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5 font-mono"
          />
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase mb-1">Hero Display Headline</label>
          <input
            type="text"
            value={theme.heroTitle}
            onChange={(e) => setField('heroTitle', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5"
          />
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase mb-1">Hero Subtitle</label>
          <textarea
            value={theme.heroSubtitle}
            onChange={(e) => setField('heroSubtitle', e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5 resize-none"
          />
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase mb-1">Hero Action Link Label</label>
          <input
            type="text"
            value={theme.heroBtnText}
            onChange={(e) => setField('heroBtnText', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5"
          />
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase mb-1">Hero Banner Backdrop Image URL</label>
          <input
            type="url"
            value={theme.heroBgUrl}
            onChange={(e) => setField('heroBgUrl', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-2.5 py-1.5 font-mono"
            placeholder="Image URL"
          />
        </div>
      </div>

      {/* SECTION TOGGLES BAR */}
      <div className="space-y-3 pb-3 border-b border-slate-800 text-slate-205">
        <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
          Component Overrides Visibility
        </h4>
        
        <div className="flex items-center justify-between">
          <span>Display Announcement Ribbon</span>
          <button
            onClick={() => setField('showAnnouncement', !theme.showAnnouncement)}
            className="text-slate-400 hover:text-white transition"
          >
            {theme.showAnnouncement ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>Enable Features checklist</span>
          <button
            onClick={() => setField('showFeatures', !theme.showFeatures)}
            className="text-slate-400 hover:text-white transition"
          >
            {theme.showFeatures ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>Include Story About section</span>
          <button
            onClick={() => setField('showAbout', !theme.showAbout)}
            className="text-slate-400 hover:text-white transition"
          >
            {theme.showAbout ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* REAL-TIME DRAG-AND-DROP ARRANGEMENT SORT LIST SYSTEM */}
      <div className="space-y-3">
        <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Layout className="w-3.5 h-3.5 text-amber-400" /> Dynamic Drag &amp; Reorder Sections
        </h4>
        <p className="text-[10px] text-slate-500">Press arrow buttons to immediately reorganize the site rendering hierarchy.</p>
        
        <div className="space-y-1.5 bg-slate-950 p-2.5 rounded border border-slate-800">
          {theme.sections.map((section, idx) => (
            <div
              key={section}
              className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800"
            >
              <span className="font-bold uppercase tracking-wider text-[8px] text-slate-300">
                {idx + 1}. {section.replace('_', ' ')}
              </span>

              <div className="flex gap-0.5">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, 'up')}
                  className="p-1 rounded bg-slate-955 hover:bg-slate-800 disabled:opacity-20 text-slate-300"
                  title="Move Up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={idx === theme.sections.length - 1}
                  onClick={() => moveSection(idx, 'down')}
                  className="p-1 rounded bg-slate-955 hover:bg-slate-800 disabled:opacity-20 text-slate-300"
                  title="Move Down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
