import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Play, 
  Volume2, 
  Film, 
  HardDrive,
  Clock,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { VideoMetadata, VideoResolution, VideoFormat } from '../types';

interface VideoPreviewProps {
  metadata: VideoMetadata;
  selectedResolution: VideoResolution;
  onResolutionChange: (res: VideoResolution) => void;
  selectedFormat: VideoFormat;
  onFormatChange: (fmt: VideoFormat) => void;
  onStartDownload: () => void;
  onReset: () => void;
  onCopyLink: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  metadata,
  selectedResolution,
  onResolutionChange,
  selectedFormat,
  onFormatChange,
  onStartDownload,
  onReset,
  onCopyLink,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute current estimated file size
  const currentSize = selectedFormat === 'audio' 
    ? metadata.audioSize 
    : (metadata.sizes[selectedResolution] || metadata.sizes['auto'] || '28.4 MB');

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Header / Re-analyze bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Video Ready for Download
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Link</span>
        </button>
      </div>

      {/* Video Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Video Thumbnail (Col 1-5 on MD) */}
        <div className="md:col-span-5 relative group overflow-hidden rounded-xl bg-black/60 border border-white/[0.1] shadow-xl aspect-video md:aspect-[16/10]">
          {!imgError ? (
            <img
              src={metadata.thumbnail}
              alt={metadata.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-4 text-center">
              <Film className="w-8 h-8 text-indigo-400 mb-2 opacity-80" />
              <span className="text-xs text-slate-300 font-medium line-clamp-1">{metadata.title}</span>
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Platform Badge Overlay */}
          <div className="absolute top-2.5 left-2.5">
            {metadata.platform === 'youtube' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/90 text-white text-[11px] font-semibold backdrop-blur-md shadow-sm">
                YouTube
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[11px] font-semibold backdrop-blur-md shadow-sm">
                Instagram Reel
              </span>
            )}
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[11px] flex items-center gap-1 border border-white/10">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{metadata.duration}</span>
          </div>

          {/* Hover Play Icon Cue */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Video Meta Details (Col 6-12 on MD) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
              {metadata.title}
            </h3>

            {/* Author & Stats */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="font-medium text-slate-200">{metadata.author}</span>
              {metadata.views && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{metadata.views}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Format Selector: [MP4 Video] [Audio MP3] */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Format:</span>
              <span className="text-slate-400 font-normal">
                {selectedFormat === 'mp4' ? 'High Quality Video & Audio' : 'Pristine 320kbps MP3 Audio'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onFormatChange('mp4')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  selectedFormat === 'mp4'
                    ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-md shadow-indigo-950/40'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-indigo-400" />
                <span>MP4 Video</span>
              </button>

              <button
                type="button"
                onClick={() => onFormatChange('audio')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  selectedFormat === 'audio'
                    ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-md shadow-purple-950/40'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Audio Only (MP3)</span>
              </button>
            </div>
          </div>

          {/* Quality / Resolution Selector (When Video is selected) */}
          {selectedFormat === 'mp4' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Resolution:</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Estimated: {currentSize}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {metadata.availableResolutions.map((res) => {
                  const isSelected = selectedResolution === res;
                  const label = res.toUpperCase();
                  const size = metadata.sizes[res];

                  return (
                    <button
                      key={res}
                      type="button"
                      onClick={() => onResolutionChange(res)}
                      className={`relative py-2 px-1.5 rounded-lg flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-white/10 text-white border border-indigo-400/60 shadow-sm'
                          : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.06] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="text-xs font-bold">{label}</span>
                      {size && (
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-full">
                          {size}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span>320 kbps Studio Audio Stream</span>
              </div>
              <span className="font-mono text-slate-400">{metadata.audioSize}</span>
            </div>
          )}
        </div>
      </div>

      {/* File Size & Actions Bottom Bar */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* File Size indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-center">
          <HardDrive className="w-4 h-4 text-indigo-400" />
          <span>Total Size:</span>
          <span className="text-sm font-semibold font-mono text-white tabular-nums">
            {currentSize}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Direct CDN Stream</span>
        </div>

        {/* Buttons: Primary Download + Copy Link */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.18] transition-all"
            title="Copy Video Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onStartDownload}
            className="flex-1 sm:flex-none glow-btn-primary px-6 py-3 sm:py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.99] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
