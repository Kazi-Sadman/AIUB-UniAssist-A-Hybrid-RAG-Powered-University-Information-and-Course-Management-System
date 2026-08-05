import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "success") => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 3800);
    },
    [dismiss]
  );

  const toast = {
    success: (msg) => push(msg, "success"),
    error: (msg) => push(msg, "error"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fadeIn flex items-start gap-2.5 rounded-lg border px-4 py-3 shadow-modal backdrop-blur-sm ${
              t.type === "success"
                ? "bg-sage/10 border-sage/40 text-parchment"
                : "bg-crimson/10 border-crimson/40 text-parchment"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={18} className="text-sage mt-0.5 shrink-0" />
            ) : (
              <XCircle size={18} className="text-crimson mt-0.5 shrink-0" />
            )}
            <p className="text-sm leading-snug flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-muted hover:text-parchment">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
