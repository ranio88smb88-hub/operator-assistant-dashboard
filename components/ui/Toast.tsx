import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }: {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
      <div className={`glass-panel border-l-4 px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 min-w-[300px] ${
        type === 'success' ? 'border-l-emerald-500' : 'border-l-rose-500'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-500" />
        )}
        <div className="flex-1 text-sm font-medium text-zinc-200">{message}</div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
