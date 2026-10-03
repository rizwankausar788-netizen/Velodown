import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlatformSupport } from './components/PlatformSupport';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { SettingsModal } from './components/SettingsModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { 
  UserSettings, 
  DownloadHistoryItem, 
  ToastMessage, 
  Platform, 
  VideoResolution, 
  VideoFormat 
} from './types';

const DEFAULT_SETTINGS: UserSettings = {
  defaultResolution: '1080p',
  defaultFormat: 'mp4',
  audioBitrate: '320k',
  autoStartDownload: false,
  saveHistory: true,
};

export default function App() {
  // Settings state
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('velodown_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // History state
  const [history, setHistory] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('velodown_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Toast stack state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('velodown_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings', e);
    }
  }, [settings]);

  // Persist history
  useEffect(() => {
    try {
      if (settings.saveHistory) {
        localStorage.setItem('velodown_history', JSON.stringify(history));
      } else {
        localStorage.removeItem('velodown_history');
      }
    } catch (e) {
      console.warn('Could not save history', e);
    }
  }, [history, settings.saveHistory]);

  const addToast = (
    title: string, 
    description?: string, 
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDownloadCompleted = (item: {
    title: string;
    thumbnail: string;
    platform: Platform;
    quality: VideoResolution;
    format: VideoFormat;
    size: string;
  }) => {
    if (!settings.saveHistory) return;

    const newItem: DownloadHistoryItem = {
      id: `hist-${Date.now()}`,
      title: item.title,
      thumbnail: item.thumbnail,
      platform: item.platform,
      quality: item.quality,
      format: item.format,
      size: item.size,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 19)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    addToast('History Cleared', 'Download history has been wiped.', 'info');
  };

  const handleGetStarted = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlatformSelectFromSection = (platform: Platform) => {
    handleGetStarted();
    addToast('Platform Selected', `Ready to download from ${platform === 'youtube' ? 'YouTube' : 'Instagram'}.`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onGetStarted={handleGetStarted}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full Screen Hero with Downloader Card */}
        <Hero
          onDownloadCompleted={handleDownloadCompleted}
          onToast={addToast}
        />

        {/* Platform Support Section */}
        <PlatformSupport onSelectPlatform={handlePlatformSelectFromSection} />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Features Section (4 Premium Cards) */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Preferences / Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
        onToast={addToast}
      />

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onToast={addToast}
      />

      {/* Legal Dialog (Terms / Privacy) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Toast Notification Feed */}
      <ToastNotification
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
