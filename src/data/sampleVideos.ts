import { VideoMetadata, Platform } from '../types';

export const SAMPLE_VIDEOS: Record<Platform, VideoMetadata[]> = {
  youtube: [
    {
      id: 'yt-1',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      title: 'Cinematic Hyperlapse — Tokyo Neon Nights in 4K 60FPS HDR',
      author: 'CyberVisuals Studio',
      duration: '04:18',
      views: '2.4M views',
      thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      availableResolutions: ['auto', '360p', '480p', '720p', '1080p', '4k'],
      sizes: {
        'auto': '48.6 MB',
        '360p': '8.4 MB',
        '480p': '14.2 MB',
        '720p': '28.9 MB',
        '1080p': '52.4 MB',
        '4k': '184.2 MB'
      },
      audioSize: '5.8 MB'
    },
    {
      id: 'yt-2',
      url: 'https://youtu.be/M7lc1UVf-VE',
      platform: 'youtube',
      title: 'Next-Gen Electric Supercar Track Review & Aerodynamics Breakdown',
      author: 'Velocity Automotive',
      duration: '12:45',
      views: '890K views',
      thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      availableResolutions: ['auto', '480p', '720p', '1080p', '4k'],
      sizes: {
        'auto': '112.0 MB',
        '360p': '22.0 MB',
        '480p': '38.5 MB',
        '720p': '76.8 MB',
        '1080p': '138.4 MB',
        '4k': '440.0 MB'
      },
      audioSize: '14.2 MB'
    }
  ],
  instagram: [
    {
      id: 'ig-1',
      url: 'https://www.instagram.com/reel/C8qXyzLvd19/',
      platform: 'instagram',
      title: 'Sunset over Positano cliffs: Mediterranean Summer vibes ✨🇮🇹',
      author: '@amalficoast_wanderer',
      duration: '00:32',
      views: '1.1M plays',
      thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      availableResolutions: ['auto', '480p', '720p', '1080p'],
      sizes: {
        'auto': '16.4 MB',
        '360p': '4.2 MB',
        '480p': '7.8 MB',
        '720p': '12.6 MB',
        '1080p': '18.2 MB',
        '4k': '32.0 MB'
      },
      audioSize: '1.2 MB'
    },
    {
      id: 'ig-2',
      url: 'https://www.instagram.com/p/C9mKk00PzQ_/',
      platform: 'instagram',
      title: 'Minimalist Studio Desk Setup & Workspace Lighting 2026',
      author: '@designspaces_co',
      duration: '00:19',
      views: '640K plays',
      thumbnail: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      availableResolutions: ['auto', '720p', '1080p'],
      sizes: {
        'auto': '9.8 MB',
        '360p': '2.8 MB',
        '480p': '4.9 MB',
        '720p': '8.2 MB',
        '1080p': '12.4 MB',
        '4k': '22.0 MB'
      },
      audioSize: '0.9 MB'
    }
  ]
};

export function detectPlatformFromUrl(url: string): Platform | null {
  const trimmed = url.trim().toLowerCase();
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return 'youtube';
  }
  if (trimmed.includes('instagram.com') || trimmed.includes('instagr.am')) {
    return 'instagram';
  }
  return null;
}

export function validateVideoUrl(url: string, selectedPlatform?: Platform): { valid: boolean; error?: string; platform?: Platform } {
  const trimmed = url.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a video URL to analyze.' };
  }

  const detected = detectPlatformFromUrl(trimmed);
  if (!detected) {
    return {
      valid: false,
      error: 'Please enter a valid YouTube or Instagram URL.'
    };
  }

  if (selectedPlatform && detected !== selectedPlatform) {
    return {
      valid: true,
      platform: detected
    };
  }

  return { valid: true, platform: detected };
}

export function resolveMetadata(url: string, platform: Platform): VideoMetadata {
  const samples = SAMPLE_VIDEOS[platform];
  const matched = samples.find(s => s.url === url.trim());
  if (matched) {
    return matched;
  }

  // Generate realistic metadata for arbitrary user input
  const isYt = platform === 'youtube';
  return {
    id: `custom-${Date.now()}`,
    url: url.trim(),
    platform,
    title: isYt 
      ? 'Ultra HD Media Stream — High Bitrate Video Export' 
      : 'Instagram Reel Media — High Definition Clip',
    author: isYt ? 'Verified Creator Channel' : '@creator_studio',
    duration: isYt ? '06:42' : '00:45',
    views: isYt ? '482K views' : '310K plays',
    thumbnail: isYt
      ? 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1200&q=80',
    availableResolutions: ['auto', '360p', '480p', '720p', '1080p', ...(isYt ? (['4k'] as const) : [])],
    sizes: {
      'auto': isYt ? '44.8 MB' : '14.2 MB',
      '360p': isYt ? '8.2 MB' : '3.6 MB',
      '480p': isYt ? '15.6 MB' : '6.4 MB',
      '720p': isYt ? '29.0 MB' : '11.8 MB',
      '1080p': isYt ? '58.3 MB' : '17.4 MB',
      '4k': isYt ? '192.0 MB' : '38.0 MB',
    },
    audioSize: isYt ? '6.4 MB' : '1.8 MB'
  };
}
