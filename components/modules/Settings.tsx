
import React, { useState } from 'react';
import { AppSettings, ModuleType } from '../../types';
import { Settings as SettingsIcon, Palette, Image as ImageIcon, Type, Table, Layout, Save, RotateCcw } from 'lucide-react';

interface Props {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
}

export default function Settings({ settings, onUpdate }: Props) {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [activeTab, setActiveTab] = useState<'general' | 'visual' | 'slider'>('general');

  const handleChange = (key: keyof AppSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSliderChange = (type: string, field: 'title' | 'image', value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      sliders: {
        ...prev.sliders,
        [type]: { ...prev.sliders[type], [field]: value }
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-fade rounded-xl border border-primary-fade">
            <SettingsIcon className="w-6 h-6 text-[var(--primary-color)]" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">System Configuration</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Personalize your operator workspace</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => onUpdate(localSettings)}
            className="bg-[var(--primary-color)] text-black px-6 py-2 rounded-xl font-black font-orbitron text-xs flex items-center hover:opacity-80 transition-all"
          >
            <Save className="w-4 h-4 mr-2" /> SAVE CHANGES
          </button>
        </div>
      </div>

      <div className="flex space-x-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 w-fit">
        {[
          { id: 'general', icon: Layout, label: 'General' },
          { id: 'visual', icon: Palette, label: 'Visual & Tables' },
          { id: 'slider', icon: ImageIcon, label: 'Slider Content' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-[var(--primary-color)] text-black' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-primary-fade space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center">
                <Palette className="w-4 h-4 mr-2" /> Primary Theme Color
              </label>
              <div className="flex items-center space-x-4">
                <input 
                  type="color" 
                  value={localSettings.primaryColor}
                  onChange={e => handleChange('primaryColor', e.target.value)}
                  className="w-16 h-16 rounded-xl bg-transparent border-2 border-white/10 cursor-pointer overflow-hidden"
                />
                <input 
                  type="text"
                  value={localSettings.primaryColor}
                  onChange={e => handleChange('primaryColor', e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm text-zinc-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" /> Background Wallpaper (URL)
              </label>
              <input 
                type="text"
                value={localSettings.bgImage}
                onChange={e => handleChange('bgImage', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 outline-none focus:border-[var(--primary-color)]"
                placeholder="https://image-url.com/bg.png"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center">
                <Type className="w-4 h-4 mr-2" /> Global Font Family
              </label>
              <select 
                value={localSettings.fontFamily}
                onChange={e => handleChange('fontFamily', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 outline-none"
              >
                <option value="'Orbitron', sans-serif">Orbitron (Cyberpunk Default)</option>
                <option value="'Inter', sans-serif">Inter (Modern Clean)</option>
                <option value="'Courier New', monospace">Mono (Tech/Terminal)</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Base Font Size</label>
              <select 
                value={localSettings.fontSize}
                onChange={e => handleChange('fontSize', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 outline-none"
              >
                <option value="12px">Small (12px)</option>
                <option value="14px">Medium (14px)</option>
                <option value="16px">Large (16px)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'visual' && (
          <div className="space-y-8">
            <h3 className="text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.3em]">Table Style Overrides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase">Header Background</label>
                <input 
                  type="text" 
                  value={localSettings.tableHeaderBg}
                  onChange={e => handleChange('tableHeaderBg', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-zinc-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase">Row Background</label>
                <input 
                  type="text" 
                  value={localSettings.tableRowBg}
                  onChange={e => handleChange('tableRowBg', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-zinc-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase">Table Text Color</label>
                <div className="flex space-x-2">
                  <input type="color" value={localSettings.tableTextColor} onChange={e => handleChange('tableTextColor', e.target.value)} className="w-10 h-10 rounded bg-transparent border border-white/10" />
                  <input type="text" value={localSettings.tableTextColor} onChange={e => handleChange('tableTextColor', e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-zinc-300" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/20 border border-white/5 mt-4">
              <p className="text-[10px] text-zinc-500 uppercase font-black mb-4">Preview Table UI</p>
              <table className="w-full text-left rounded-lg overflow-hidden border-collapse">
                <thead>
                  <tr style={{ backgroundColor: localSettings.tableHeaderBg }}>
                    <th className="p-3 text-[10px] font-black uppercase text-zinc-400">Sample Header</th>
                    <th className="p-3 text-[10px] font-black uppercase text-zinc-400">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: localSettings.tableRowBg, color: localSettings.tableTextColor }}>
                    <td className="p-3 border-t border-white/5 text-xs">Sample Data Row 01</td>
                    <td className="p-3 border-t border-white/5 text-xs">CONFIRMED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'slider' && (
          <div className="space-y-6">
            <h3 className="text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.3em]">Module Navigator (Home Slider)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(localSettings.sliders).map(([key, config]) => (
                <div key={key} className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">{key.replace('_', ' ')}</div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500">Display Title</label>
                    <input 
                      type="text"
                      value={config.title}
                      onChange={e => handleSliderChange(key, 'title', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500">Image URL</label>
                    <input 
                      type="text"
                      value={config.image}
                      onChange={e => handleSliderChange(key, 'image', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
