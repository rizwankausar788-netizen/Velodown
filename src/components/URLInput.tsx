import React, { useRef } from 'react';
import { Link2, X, Clipboard, Sparkles } from 'lucide-react';
import { Platform } from '../types';
import { SAMPLE_VIDEOS } from '../data/sampleVideos';

interface URLInputProps {
  url: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onSampleSelect: (sampleUrl: string, platform: Platform) => void;
  disabled?: boolean;
  selectedPlatform: Platform;
  onSubmit: () => void;
  onPasteNotification?: (msg: string) => void;
}

export const URLInput: React.FC<URLInputProps> = ({
  url,
  onChange,
  onClear,
  onSampleSelect,
  disabled = false,
  selectedPlatform,
  onSubmit,
  onPasteNotification,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChange(text);
          if (onPasteNotification) {
            onPasteNotification('Pasted URL from clipboard');
          }
          inputRef.current?.focus();
        }
      }
    } catch {
      // Browser permission denied or not supported, just focus input
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Input container */}
      <div className="relative flex items-center group">
        <div className="absolute left-4.5 pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
          <Link2 className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            selectedPlatform === 'youtube'
              ? 'Paste your YouTube video or Shorts URL here...'
              : 'Paste your Instagram Reel or video URL here...'
          }
          className="w-full pl-12 pr-28 py-4 bg-white/[0.03] group-hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/[0.1] focus:border-indigo-500/60 rounded-xl text-sm sm:text-base text-white placeholder-slate-500 outline-none transition-all duration-200 shadow-inner focus:ring-4 focus:ring-indigo-500/10"
        />

        {/* Action icons inside right of input */}
        <div className="absolute right-3.5 flex items-center gap-1.5">
          {url ? (
            <button
              type="button"
              onClick={onClear}
              disabled={disabled}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              title="Clear input"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePasteClipboard}
              disabled={disabled}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-indigo-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick sample chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Quick test:</span>
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            const sample = SAMPLE_VIDEOS.youtube[0];
            onSampleSelect(sample.url, 'youtube');
          }}
          className="px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] rounded-md transition-colors text-[11px] truncate max-w-[200px]"
        >
          YouTube 4K Tokyo
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            const sample = SAMPLE_VIDEOS.instagram[0];
            onSampleSelect(sample.url, 'instagram');
          }}
          className="px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] rounded-md transition-colors text-[11px] truncate max-w-[200px]"
        >
          Instagram Reel Sunset
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            const sample = SAMPLE_VIDEOS.youtube[1];
            onSampleSelect(sample.url, 'youtube');
          }}
          className="hidden sm:inline-block px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] rounded-md transition-colors text-[11px] truncate max-w-[200px]"
        >
          Supercar Track Review
        </button>
      </div>
    </div>
  );
};
