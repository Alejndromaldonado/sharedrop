import { useEffect } from 'react';
import { CheckCircle, Copy, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  copy: Copy,
};

const colors = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400',
    text: 'text-emerald-300',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    text: 'text-red-300',
  },
  info: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    icon: 'text-indigo-400',
    text: 'text-indigo-300',
  },
  copy: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    icon: 'text-indigo-400',
    text: 'text-indigo-300',
  },
};

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const Icon = icons[type];
  const color = colors[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`
          flex items-center gap-3 px-5 py-3 rounded-2xl
          backdrop-blur-xl shadow-2xl
          ${color.bg} ${color.border} border
          transition-all duration-300
        `}
      >
        <div className={`${color.icon} animate-in zoom-in duration-200`}>
          <Icon size={20} />
        </div>
        <span className={`font-medium ${color.text}`}>
          {message}
        </span>
      </div>
    </div>
  );
}