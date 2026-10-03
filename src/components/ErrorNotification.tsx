import React from 'react';
import { AlertCircle, X, Sparkles } from 'lucide-react';
import { Platform } from '../types';

interface ErrorNotificationProps {
  title: string;
  message: string;
  onDismiss: () => void;
  onTrySample?: (platform: Platform) => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  title,
  message,
  onDismiss,
  onTrySample,
}) => {
  return (
    <div className="w-full p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-md flex items-start justify-between gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-start gap-3">
        <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 mt-0.5 shrink-0 border border-rose-500/30">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-rose-300 tracking-wide uppercase">
            {title}
          </h4>
          <p className="text-xs text-rose-200/90 leading-relaxed">
            {message}
          </p>

          {onTrySample && (
            <div className="pt-1.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onTrySample('youtube')}
                className="text-[11px] font-medium text-rose-300 hover:text-white underline decoration-rose-500/40 hover:decoration-white transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>Test with valid YouTube link</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-rose-400 hover:text-white rounded-md hover:bg-rose-500/20 transition-colors shrink-0"
        title="Dismiss error"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
