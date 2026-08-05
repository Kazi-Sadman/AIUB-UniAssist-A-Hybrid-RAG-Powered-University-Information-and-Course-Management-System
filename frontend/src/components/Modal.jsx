import React from "react";
import { X } from "lucide-react";

export default function Modal({ open, title, eyebrow, onClose, children, accent = "#C9A227" }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md card animate-modalIn overflow-hidden">
        <div
          className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-line"
          style={{ boxShadow: `inset 0 3px 0 0 ${accent}` }}
        >
          <div>
            {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
            <h2 className="font-display text-xl font-semibold text-parchment">{title}</h2>
          </div>
          <button onClick={onClose} className="icon-btn -mt-1 -mr-1">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
