import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";

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
    },
    error: {
      bg: 'var(--destructive)',
      icon: 'white',
    },
    warning: {
      bg: 'var(--warning)',
      icon: 'white',
    },
    info: {
      bg: 'var(--accent-indigo)',
      icon: 'white',
    },
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <div 
      className="fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 fade-in flex items-center gap-3 max-w-md z-50"
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
  );
}

// Toast Container Hook
import { createContext, useContext, useState, ReactNode } from "react";

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
