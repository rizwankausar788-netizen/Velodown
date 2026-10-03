import React from 'react';
import { CheckCircle2, Download, RefreshCw, X, ArrowDownCircle, ShieldCheck } from 'lucide-react';
import { DownloadProgress, VideoMetadata, VideoResolution, VideoFormat } from '../types';

interface ProgressCardProps {
  progress: DownloadProgress;
  isComplete: boolean;
  metadata: VideoMetadata;
  resolution: VideoResolution;
  format: VideoFormat;
  onSaveVideo: () => void;
  onCancel: () => void;
  onReset: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  progress,
  isComplete,
  metadata,
  resolution,
  format,
  onSaveVideo,
  onCancel,
  onReset,
}) => {
  const transferredMB = (progress.transferredBytes / (1024 * 1024)).toFixed(1);
  const totalMB = (progress.totalBytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="w-full space-y-6 py-2 animate-in fade-in duration-300">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {!isComplete ? (
            <>
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
              <span className="text-sm font-semibold text-white tracking-wide">
                Downloading media...
              </span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-emerald-400 tracking-wide">
                ✓ Download Ready
              </span>
            </>
          )}
        </div>

        {!isComplete ? (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 px-2.5 py-1 rounded-md hover:bg-rose-500/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md hover:bg-white/[0.06] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Download Another</span>
          </button>
        )}
      </div>

      {/* Target Details Badge */}
      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-7 rounded bg-black/40 overflow-hidden shrink-0 border border-white/10">
            <img
              src={metadata.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="truncate">
            <p className="font-semibold text-white truncate">{metadata.title}</p>
            <p className="text-slate-400 font-mono text-[11px]">
              {format === 'mp4' ? `${resolution.toUpperCase()} MP4` : '320kbps MP3'} · {metadata.author}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right font-mono text-slate-300 pl-3">
          <span className="text-white font-bold">{progress.percentage}%</span>
        </div>
      </div>

      {/* Animated Glowing Progress Bar */}
      <div className="space-y-2">
        <div className="relative w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 relative ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_#10b981]'
                : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]'
            }`}
            style={{ width: `${progress.percentage}%` }}
          >
            {/* Shimmer line inside progress */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Dynamic Metric Readouts */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold tabular-nums">{progress.percentage}%</span>
            <span>·</span>
            <span className="tabular-nums">{transferredMB} MB / {totalMB} MB</span>
          </div>

          <div className="flex items-center gap-3">
            {!isComplete && (
              <>
                <span className="text-indigo-400 tabular-nums">{progress.speed}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 tabular-nums">ETA: {progress.eta}</span>
              </>
            )}
            {isComplete && (
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Integrity Verified</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action when complete */}
      {isComplete && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-300">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
            <span>File rendered and packed into your browser.</span>
          </p>

          <button
            type="button"
            onClick={onSaveVideo}
            className="w-full sm:w-auto glow-btn-primary px-7 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save Video</span>
          </button>
        </div>
      )}
    </div>
  );
};
