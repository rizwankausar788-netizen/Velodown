import React from 'react';
import { Zap, Settings, History, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onOpenHistory,
  historyCount,
  onGetStarted,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090d]/80 border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with lightning icon */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg py-1 px-1.5 -ml-1.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            Velo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Down</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a
            href="#hero"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-200"
          >
            How it Works
          </a>
          <a
            href="#platforms"
            className="hover:text-white transition-colors duration-200"
          >
            Supported Platforms
          </a>
          <a
            href="#features"
            className="hover:text-white transition-colors duration-200"
          >
            Features
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 sm:px-3 sm:py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Download History"
            aria-label="View Download History"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[10px] font-semibold rounded-full tabular-nums">
                {historyCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Preferences & Settings"
            aria-label="Open Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={onGetStarted}
            className="glow-btn-primary px-3.5 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
