import React from 'react';
import { Zap, Github, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#07080b] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand Lockup */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Velo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Down</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            Simple video downloading, beautifully designed.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-400">
          <a href="#hero" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#platforms" className="hover:text-white transition-colors">
            Supported Platforms
          </a>
          <button 
            type="button" 
            onClick={onOpenPrivacy}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button 
            type="button" 
            onClick={onOpenTerms}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 font-mono text-center md:text-right">
          <p>© 2026 VeloDown. All rights reserved.</p>
          <p className="text-[11px] text-slate-600 mt-1">
            Engineered for high performance media extraction.
          </p>
        </div>
      </div>
    </footer>
  );
};
