import React from 'react';
import { DownloaderCard } from './DownloaderCard';
import { Platform, VideoResolution, VideoFormat } from '../types';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

interface HeroProps {
  onDownloadCompleted: (item: {
    title: string;
    thumbnail: string;
    platform: Platform;
    quality: VideoResolution;
    format: VideoFormat;
    size: string;
  }) => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDownloadCompleted,
  onToast,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Gradient Orbs & Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating Blurred Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-700/20 via-indigo-600/25 to-purple-700/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Small Badge / Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-sm backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span className="text-[11px] font-semibold tracking-widest text-indigo-300 uppercase">
            Fast • Simple • Private
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
            Download Videos.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 inline-block">
              Your Way.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed text-balance">
            Paste a video link and download your media in seconds. High-resolution 4K, 1080p, and studio audio extraction with zero clutter.
          </p>
        </div>

        {/* Main Downloader Card Component */}
        <div className="w-full pt-2">
          <DownloaderCard
            onDownloadCompleted={onDownloadCompleted}
            onToast={onToast}
          />
        </div>

        {/* Quiet Trust Signals */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Instant Stream Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>100% Free & Private</span>
          </div>
        </div>
      </div>
    </section>
  );
};
