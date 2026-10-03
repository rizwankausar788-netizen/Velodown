import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { 
  Platform, 
  ProcessingState, 
  VideoMetadata, 
  VideoResolution, 
  VideoFormat, 
  DownloadProgress 
} from '../types';
import { PlatformSelector } from './PlatformSelector';
import { URLInput } from './URLInput';
import { LoadingState } from './LoadingState';
import { VideoPreview } from './VideoPreview';
import { ProgressCard } from './ProgressCard';
import { ErrorNotification } from './ErrorNotification';
import { validateVideoUrl, resolveMetadata, SAMPLE_VIDEOS } from '../data/sampleVideos';

interface DownloaderCardProps {
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

export const DownloaderCard: React.FC<DownloaderCardProps> = ({
  onDownloadCompleted,
  onToast,
}) => {
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [url, setUrl] = useState<string>('');
  const [state, setState] = useState<ProcessingState>('idle');
  const [errorInfo, setErrorInfo] = useState<{ title: string; message: string } | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [resolution, setResolution] = useState<VideoResolution>('1080p');
  const [format, setFormat] = useState<VideoFormat>('mp4');

  // Simulated download progress state
  const [progress, setProgress] = useState<DownloadProgress>({
    percentage: 0,
    transferredBytes: 0,
    totalBytes: 16 * 1024 * 1024,
    speed: '4.2 MB/s',
    eta: '3s',
  });
  const [downloadIntervalId, setDownloadIntervalId] = useState<number | null>(null);

  // Handle URL analyze
  const handleAnalyze = (targetUrl = url, targetPlatform = platform) => {
    setErrorInfo(null);
    const validation = validateVideoUrl(targetUrl, targetPlatform);

    if (!validation.valid) {
      setErrorInfo({
        title: 'Invalid URL',
        message: validation.error || 'Please enter a valid YouTube or Instagram URL.',
      });
      return;
    }

    const activePlatform = validation.platform || targetPlatform;
    setPlatform(activePlatform);
    setState('analyzing');

    // Simulate futuristic stream analysis with realistic latency
    setTimeout(() => {
      // Check for deliberately mocked unsupported content for demonstration if URL contains "unsupported"
      if (targetUrl.toLowerCase().includes('unsupported') || targetUrl.toLowerCase().includes('private')) {
        setState('error');
        setErrorInfo({
          title: 'Unsupported Content',
          message: 'This video stream is private or restricted by copyright holders.',
        });
        return;
      }

      const meta = resolveMetadata(targetUrl, activePlatform);
      setMetadata(meta);
      
      // Default to 1080p if available, else first resolution
      if (meta.availableResolutions.includes('1080p')) {
        setResolution('1080p');
      } else if (meta.availableResolutions.length > 0) {
        setResolution(meta.availableResolutions[meta.availableResolutions.length - 1]);
      }

      setState('ready');
      onToast('Stream Analyzed', 'Available resolutions and formats loaded.', 'success');
    }, 1400);
  };

  // Sample quick select
  const handleSampleSelect = (sampleUrl: string, samplePlatform: Platform) => {
    setUrl(sampleUrl);
    setPlatform(samplePlatform);
    handleAnalyze(sampleUrl, samplePlatform);
  };

  // Start simulated download
  const handleStartDownload = () => {
    if (!metadata) return;

    setState('downloading');
    setProgress({
      percentage: 0,
      transferredBytes: 0,
      totalBytes: format === 'audio' ? 5.8 * 1024 * 1024 : 32.4 * 1024 * 1024,
      speed: '5.4 MB/s',
      eta: '6s',
    });

    onToast('Download Started', `Packaging ${format.toUpperCase()} (${resolution.toUpperCase()})...`, 'info');

    let current = 0;
    const total = format === 'audio' ? 5.8 * 1024 * 1024 : 32.4 * 1024 * 1024;

    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 12 + 6);
      if (current >= 100) {
        current = 100;
        window.clearInterval(interval);
        setDownloadIntervalId(null);
        setProgress({
          percentage: 100,
          transferredBytes: total,
          totalBytes: total,
          speed: '0 MB/s',
          eta: 'Done',
        });
        setState('completed');

        // Record into history
        onDownloadCompleted({
          title: metadata.title,
          thumbnail: metadata.thumbnail,
          platform: metadata.platform,
          quality: resolution,
          format: format,
          size: format === 'audio' ? metadata.audioSize : (metadata.sizes[resolution] || '32.4 MB'),
        });

        onToast('Download Ready', 'Video rendered and ready to save!', 'success');
      } else {
        const transferred = Math.floor((current / 100) * total);
        const remainingSeconds = Math.max(1, Math.round(((100 - current) / 100) * 5));
        setProgress({
          percentage: current,
          transferredBytes: transferred,
          totalBytes: total,
          speed: `${(Math.random() * 2 + 4).toFixed(1)} MB/s`,
          eta: `${remainingSeconds}s`,
        });
      }
    }, 180);

    setDownloadIntervalId(interval);
  };

  const handleCancelDownload = () => {
    if (downloadIntervalId) {
      window.clearInterval(downloadIntervalId);
      setDownloadIntervalId(null);
    }
    setState('ready');
    onToast('Download Cancelled', 'File transfer aborted.', 'warning');
  };

  const handleSaveVideo = () => {
    if (!metadata) return;

    // Simulate client-side blob download trigger
    const filename = `${metadata.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}_${resolution}.${format === 'audio' ? 'mp3' : 'mp4'}`;
    const dummyBlob = new Blob([`Simulated media stream for: ${metadata.title}`], { type: format === 'audio' ? 'audio/mpeg' : 'video/mp4' });
    const blobUrl = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    onToast('Saved to Device', `Saved as ${filename}`, 'success');
  };

  const handleReset = () => {
    if (downloadIntervalId) {
      window.clearInterval(downloadIntervalId);
      setDownloadIntervalId(null);
    }
    setState('idle');
    setMetadata(null);
    setErrorInfo(null);
  };

  const handleClearUrl = () => {
    setUrl('');
    setErrorInfo(null);
    if (state !== 'downloading') {
      setState('idle');
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Outer ambient glow behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/30 to-purple-600/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative glass-panel rounded-2xl p-5 sm:p-8 border border-white/[0.12] shadow-2xl backdrop-blur-2xl">
        {/* State: Idle or Error / Input Form */}
        {(state === 'idle' || state === 'error') && (
          <div className="space-y-6">
            {/* Top row: Platform Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Source Platform
                </span>
                <PlatformSelector
                  selected={platform}
                  onChange={(p) => {
                    setPlatform(p);
                    setErrorInfo(null);
                  }}
                />
              </div>

              {/* Supported format badges */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">4K / 1080p</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">60 FPS</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">MP3 Audio</span>
              </div>
            </div>

            {/* Error Notification if any */}
            {errorInfo && (
              <ErrorNotification
                title={errorInfo.title}
                message={errorInfo.message}
                onDismiss={() => setErrorInfo(null)}
                onTrySample={(sampPlatform) => {
                  const sample = SAMPLE_VIDEOS[sampPlatform][0];
                  handleSampleSelect(sample.url, sampPlatform);
                }}
              />
            )}

            {/* URL Input */}
            <URLInput
              url={url}
              onChange={(val) => {
                setUrl(val);
                if (errorInfo) setErrorInfo(null);
              }}
              onClear={handleClearUrl}
              onSampleSelect={handleSampleSelect}
              selectedPlatform={platform}
              onSubmit={() => handleAnalyze()}
              onPasteNotification={(msg) => onToast('Clipboard', msg, 'info')}
            />

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAnalyze()}
                className="w-full glow-btn-primary py-4 px-6 rounded-xl text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 group hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Analyze Video</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Terms of Service small text */}
            <p className="text-center text-xs text-slate-500 pt-1">
              By using VeloDown, you agree to our{' '}
              <a href="#terms" className="text-slate-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
                Terms of Service
              </a>
              . Fast, private, and zero logs.
            </p>
          </div>
        )}

        {/* State: Analyzing Loader */}
        {state === 'analyzing' && <LoadingState />}

        {/* State: Ready (Video Preview & Quality/Format Picker) */}
        {state === 'ready' && metadata && (
          <VideoPreview
            metadata={metadata}
            selectedResolution={resolution}
            onResolutionChange={setResolution}
            selectedFormat={format}
            onFormatChange={setFormat}
            onStartDownload={handleStartDownload}
            onReset={handleReset}
            onCopyLink={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(metadata.url);
              }
              onToast('Link Copied', 'Video URL copied to clipboard.', 'success');
            }}
          />
        )}

        {/* State: Downloading or Completed (Progress Card) */}
        {(state === 'downloading' || state === 'completed') && metadata && (
          <ProgressCard
            progress={progress}
            isComplete={state === 'completed'}
            metadata={metadata}
            resolution={resolution}
            format={format}
            onSaveVideo={handleSaveVideo}
            onCancel={handleCancelDownload}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};
