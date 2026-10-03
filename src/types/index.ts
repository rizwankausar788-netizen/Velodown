export type Platform = 'youtube' | 'instagram';

export type VideoFormat = 'mp4' | 'audio';

export type VideoResolution = 'auto' | '360p' | '480p' | '720p' | '1080p' | '4k';

export interface VideoMetadata {
  id: string;
  url: string;
  platform: Platform;
  title: string;
  author: string;
  authorAvatar?: string;
  duration: string;
  views?: string;
  thumbnail: string;
  availableResolutions: VideoResolution[];
  sizes: Record<VideoResolution, string>;
  audioSize: string;
}

export type ProcessingState = 'idle' | 'analyzing' | 'ready' | 'downloading' | 'completed' | 'error';

export interface DownloadProgress {
  percentage: number;
  transferredBytes: number;
  totalBytes: number;
  speed: string;
  eta: string;
}

export interface UserSettings {
  defaultResolution: VideoResolution;
  defaultFormat: VideoFormat;
  audioBitrate: '128k' | '256k' | '320k';
  autoStartDownload: boolean;
  saveHistory: boolean;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  platform: Platform;
  quality: VideoResolution;
  format: VideoFormat;
  size: string;
  timestamp: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
