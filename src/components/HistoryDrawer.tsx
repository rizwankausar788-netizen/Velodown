import React from 'react';
import { X, Trash2, Download, Film, Volume2, Clock, HardDrive, CheckCircle2 } from 'lucide-react';
import { DownloadHistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onToast,
}) => {
  if (!isOpen) return null;

  const handleRedownload = (item: DownloadHistoryItem) => {
    onToast('Re-downloading', `Preparing ${item.title.slice(0, 24)}...`, 'info');
    setTimeout(() => {
      onToast('Saved', 'File downloaded successfully.', 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/[0.1] bg-[#0c0d15]/95 shadow-2xl p-6 flex flex-col justify-between text-left">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white">Download History</h3>
                <p className="text-xs text-slate-400">
                  {history.length} {history.length === 1 ? 'file' : 'files'} saved on this device
                </p>
              </div>

              <div className="flex items-center gap-1">
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Clear All History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {history.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-500 mx-auto">
                    <Download className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-300">No downloads yet</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Analyzed and downloaded videos will appear here for fast re-access.
                  </p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="group p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition-all flex items-start gap-3"
                  >
                    <div className="w-14 h-10 rounded-lg bg-black/60 overflow-hidden shrink-0 border border-white/10 relative">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 px-1 bg-black/80 text-[9px] font-mono text-white">
                        {item.format === 'audio' ? 'MP3' : item.quality.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="capitalize">{item.platform}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-300">{item.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedownload(item)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-indigo-600/30 text-slate-400 hover:text-white border border-white/[0.06] hover:border-indigo-500/40 transition-all shrink-0"
                      title="Download again"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-slate-500">
            Stored locally in browser session
          </div>
        </div>
      </div>
    </div>
  );
};
