import React, { useState } from "react";

export default function DepartmentForm({ initial, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(initial?.name || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Department name is required.");
      return;
    }
    onSubmit({ name: name.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-field">Department name</label>
        <input
          className="input-field"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="e.g. Computer Science"
          autoFocus
        />
        {error && <p className="text-xs text-crimson mt-1.5">{error}</p>}
      </div>
      <div className="flex justify-end gap-2.5 pt-2">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add department"}
        </button>
      </div>
    </form>
  );
}
