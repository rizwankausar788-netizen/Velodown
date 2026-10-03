import React from 'react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  disabled?: boolean;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selected,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="inline-flex p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl relative backdrop-blur-md shadow-inner">
      {/* YouTube Option */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('youtube')}
        className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          selected === 'youtube'
            ? 'text-white bg-gradient-to-r from-red-600/30 via-red-500/20 to-purple-600/20 border border-red-500/30 shadow-lg shadow-red-950/40'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <svg
          className={`w-4 h-4 transition-colors ${
            selected === 'youtube' ? 'text-red-400' : 'text-slate-400'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <span>YouTube</span>
      </button>

      {/* Instagram Option */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('instagram')}
        className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          selected === 'instagram'
            ? 'text-white bg-gradient-to-r from-pink-600/30 via-purple-600/25 to-indigo-600/20 border border-pink-500/30 shadow-lg shadow-pink-950/40'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <svg
          className={`w-4 h-4 transition-colors ${
            selected === 'instagram' ? 'text-pink-400' : 'text-slate-400'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
        <span>Instagram</span>
      </button>
    </div>
  );
};
