import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
        let borderColor = 'border-white/[0.12]';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
          borderColor = 'border-rose-500/30';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
          borderColor = 'border-amber-500/30';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
          borderColor = 'border-indigo-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full p-3.5 rounded-xl glass-panel ${borderColor} shadow-2xl backdrop-blur-xl flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-start gap-2.5">
              <div className={`p-1 rounded-md border shrink-0 mt-0.5 ${iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{toast.title}</p>
                {toast.description && (
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-white/[0.08] transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
