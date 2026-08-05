import React from "react";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-12 h-12 rounded-full bg-surface-raised border border-line flex items-center justify-center mb-4">
        <Icon size={20} className="text-muted" />
      </div>
      <p className="font-display text-lg font-semibold text-parchment mb-1.5">{title}</p>
      <p className="text-sm text-muted max-w-sm mb-5">{description}</p>
      {action}
    </div>
  );
}
