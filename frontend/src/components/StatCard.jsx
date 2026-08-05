import React from "react";

export default function StatCard({ label, value, icon: Icon, accent, loading, suffix }) {
  return (
    <div className="card p-5 relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-center justify-between mb-4">
        <p className="eyebrow">{label}</p>
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
        >
          <Icon size={15} />
        </div>
      </div>
      <p className="font-mono text-3xl font-semibold text-parchment tabular-nums">
        {loading ? (
          <span className="inline-block w-14 h-7 bg-surface-raised rounded animate-pulse" />
        ) : (
          <>
            {value}
            {suffix && <span className="text-base text-muted ml-1">{suffix}</span>}
          </>
        )}
      </p>
    </div>
  );
}
