import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full py-8 px-4 flex flex-col items-center justify-center space-y-6">
      {/* Multi-layer glowing animated orbital ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer ambient blur glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 blur-xl opacity-40 animate-pulse-glow" />

        {/* Counter-rotating gradient rings */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-indigo-500 animate-spin" style={{ animationDuration: '1.4s' }} />
        <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-purple-400 border-l-pink-500 animate-spin" style={{ animationDuration: '2.1s', animationDirection: 'reverse' }} />
        
        {/* Subtle particle dots orbiting */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_8px_#60a5fa] top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc] bottom-1 left-1/2 -translate-x-1/2" />

        {/* Inner pulsing core with play/stream icon */}
        <div className="relative w-12 h-12 rounded-full bg-[#0d0f1a] border border-white/10 flex items-center justify-center shadow-inner">
          <div className="flex gap-1 items-center">
            <span className="w-1.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-6 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Text status */}
      <div className="text-center space-y-2">
        <h3 className="text-base font-semibold text-white tracking-wide flex items-center justify-center gap-2">
          <span>Analyzing your video</span>
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" style={{ animationDuration: '1.2s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '200ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '400ms' }} />
          </span>
        </h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Extracting resolution streams, audio tracks, and media metadata...
        </p>
      </div>

      {/* Skeleton mockup shimmer underneath for visual anticipation */}
      <div className="w-full max-w-md p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3 opacity-60">
        <div className="flex gap-3 items-center">
          <div className="w-14 h-10 rounded-lg bg-white/10 animate-pulse" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-white/10 rounded w-4/5 animate-pulse" />
            <div className="h-2.5 bg-white/5 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
