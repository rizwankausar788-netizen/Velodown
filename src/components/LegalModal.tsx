import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/[0.12] p-6 shadow-2xl z-10 space-y-5 text-left max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {isTerms ? <FileText className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isTerms ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <p className="text-xs text-slate-400">Effective Date: 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
          {isTerms ? (
            <>
              <p>
                Welcome to <strong>VeloDown</strong>. By accessing or using our video downloader service, you acknowledge and agree to comply with these terms.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">1. Authorized Personal Use</h4>
              <p>
                VeloDown is intended solely for personal, non-commercial archiving and offline viewing of content you have lawful rights or permission to access.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">2. Intellectual Property</h4>
              <p>
                We do not host or store copyrighted video media on our servers. All media streams are processed on demand. Users remain solely responsible for compliance with platform terms of service.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">3. Fair Usage</h4>
              <p>
                Automated scraping, denial of service attempts, or excessive automated requests may result in temporary IP throttling.
              </p>
            </>
          ) : (
            <>
              <p>
                At <strong>VeloDown</strong>, user privacy is our foundational principle.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">1. No Logs Policy</h4>
              <p>
                We do not store your IP address, download history, or extracted URLs on any remote database or persistent storage.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">2. Local Browser Storage</h4>
              <p>
                Any download history or quality preferences are strictly held in your device’s local browser storage and can be cleared at any time with one click.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">3. No Advertising Trackers</h4>
              <p>
                We do not utilize 3rd-party advertising trackers or sell browsing data to data brokers.
              </p>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="glow-btn-primary px-5 py-2 text-xs font-bold text-white rounded-xl"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
