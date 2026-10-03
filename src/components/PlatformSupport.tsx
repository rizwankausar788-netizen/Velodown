import React from 'react';
import { Film, Music, Check, Sparkles, Video, PlaySquare, Layers, Camera } from 'lucide-react';
import { Platform } from '../types';

interface PlatformSupportProps {
  onSelectPlatform: (platform: Platform) => void;
}

export const PlatformSupport: React.FC<PlatformSupportProps> = ({ onSelectPlatform }) => {
  return (
    <section id="platforms" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
            Dedicated Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your favorite platforms, one downloader.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered specifically for YouTube and Instagram with full support for modern media formats.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Card */}
          <div 
            onClick={() => onSelectPlatform('youtube')}
            className="group relative rounded-2xl glass-panel p-8 border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden shadow-lg"
          >
            {/* Subtle Platform-Colored Glow behind on hover */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-md group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-200 transition-colors">
                      YouTube
                    </h3>
                    <p className="text-xs text-slate-400">Standard, Shorts & Audio Streams</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                  Up to 4K 60FPS
                </span>
              </div>

              {/* Supported content types */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Supported Content:
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Standard Videos (4K/1080p)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>YouTube Shorts</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>High Bitrate MP3 Extraction</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>High Frame Rate (60 FPS)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-red-400/90 font-medium">
                <span>Select for download</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </div>

          {/* Instagram Card */}
          <div 
            onClick={() => onSelectPlatform('instagram')}
            className="group relative rounded-2xl glass-panel p-8 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden shadow-lg"
          >
            {/* Subtle Platform-Colored Glow behind on hover */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-600/10 rounded-full blur-3xl group-hover:bg-pink-600/20 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-md group-hover:scale-105 transition-transform">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-200 transition-colors">
                      Instagram
                    </h3>
                    <p className="text-xs text-slate-400">Reels, Video Posts & Stories</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                  Full 1080p HD
                </span>
              </div>

              {/* Supported content types */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Supported Content:
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Instagram Reels (Audio + Video)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Public Feed Video Posts</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Audio Soundtrack Extraction</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Carousel Video Slides</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-pink-400/90 font-medium">
                <span>Select for download</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
