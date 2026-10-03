import React from 'react';
import { X, Sliders, Check, HardDrive, Music, Shield, Palette } from 'lucide-react';
import { UserSettings, VideoResolution, VideoFormat } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/[0.12] p-6 shadow-2xl z-10 space-y-6 text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">VeloDown Preferences</h3>
              <p className="text-xs text-slate-400">Configure your default stream & download settings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting 1: Default Video Resolution */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
            <span>Default Resolution</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['auto', '720p', '1080p', '4k'] as VideoResolution[]).map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => {
                  onUpdateSettings({ defaultResolution: res });
                  onToast('Saved', `Default resolution set to ${res.toUpperCase()}`);
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  settings.defaultResolution === res
                    ? 'bg-indigo-600/30 text-white border-indigo-500 shadow-sm'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {res.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Setting 2: Default Format */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span>Default Format</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ defaultFormat: 'mp4' });
                onToast('Saved', 'Default format set to MP4 Video');
              }}
              className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                settings.defaultFormat === 'mp4'
                  ? 'bg-indigo-600/30 text-white border-indigo-500 shadow-sm'
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              MP4 Video & Audio
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ defaultFormat: 'audio' });
                onToast('Saved', 'Default format set to Audio Only');
              }}
              className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                settings.defaultFormat === 'audio'
                  ? 'bg-purple-600/30 text-white border-purple-500 shadow-sm'
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              Audio MP3 Only
            </button>
          </div>
        </div>

        {/* Setting 3: Audio Bitrate */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Music className="w-3.5 h-3.5 text-pink-400" />
            <span>Audio Extraction Bitrate</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['128k', '256k', '320k'] as const).map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => {
                  onUpdateSettings({ audioBitrate: rate });
                  onToast('Saved', `Audio bitrate set to ${rate}bps`);
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  settings.audioBitrate === rate
                    ? 'bg-pink-600/30 text-white border-pink-500 shadow-sm'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {rate}bps {rate === '320k' && '(HQ)'}
              </button>
            ))}
          </div>
        </div>

        {/* Setting 4: Toggles */}
        <div className="space-y-3 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Save Download History</p>
              <p className="text-[11px] text-slate-400">Stores recent download titles in local storage</p>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ saveHistory: !settings.saveHistory })}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                settings.saveHistory ? 'bg-indigo-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.saveHistory ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="glow-btn-primary px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
