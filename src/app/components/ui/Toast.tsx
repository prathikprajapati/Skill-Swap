import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'var(--success)',
      icon: 'white',
      spotlight: 'rgba(34, 197, 94, 0.2)',
    },
    error: {
      bg: 'var(--destructive)',
      icon: 'white',
      spotlight: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
      bg: 'var(--warning)',
      icon: 'white',
      spotlight: 'rgba(245, 158, 11, 0.2)',
    },
    info: {
      bg: 'var(--accent-indigo)',
      icon: 'white',
      spotlight: 'rgba(99, 102, 241, 0.2)',
    },
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <SpotlightCard
        className="rounded-xl shadow-2xl max-w-md"
        spotlightColor={color.spotlight as `rgba(${number}, ${number}, ${number}, ${number})`}
      >
        <div 
          className="px-6 py-4 flex items-center gap-3"
          style={{
            backgroundColor: color.bg,
            color: 'white',
          }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: color.icon }} />
          <span className="font-medium flex-1">{message}</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </SpotlightCard>
    </div>
  );
}

// Toast Container Hook
import { createContext, useContext, useState, type ReactNode } from "react";

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Array<{ id: number; type: ToastType; message: string }>>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
