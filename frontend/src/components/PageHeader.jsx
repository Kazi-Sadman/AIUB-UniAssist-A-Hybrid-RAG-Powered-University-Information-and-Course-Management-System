import React from "react";

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold text-parchment mb-1.5">{title}</h1>
        {description && <p className="text-sm text-muted max-w-xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
