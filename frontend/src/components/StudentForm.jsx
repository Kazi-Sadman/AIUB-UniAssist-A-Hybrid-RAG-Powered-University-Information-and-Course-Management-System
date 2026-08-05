import React, { useEffect, useState } from "react";
import departmentApi from "../api/departmentApi";

export default function StudentForm({ initial, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [departmentId, setDepartmentId] = useState(initial?.department_id || "");
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    departmentApi
      .getAll()
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoadingDepts(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!departmentId) nextErrors.departmentId = "Choose a department.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), department_id: Number(departmentId) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-field">Full name</label>
        <input
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Amelia Chen"
          autoFocus
        />
        {errors.name && <p className="text-xs text-crimson mt-1.5">{errors.name}</p>}
      </div>
      <div>
        <label className="label-field">Email</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="amelia.chen@campus.edu"
        />
        {errors.email && <p className="text-xs text-crimson mt-1.5">{errors.email}</p>}
      </div>
      <div>
        <label className="label-field">Department</label>
        <select
          className="input-field"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          disabled={loadingDepts}
        >
          <option value="">{loadingDepts ? "Loading departments…" : "Select a department"}</option>
          {departments.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.departmentId && <p className="text-xs text-crimson mt-1.5">{errors.departmentId}</p>}
        {!loadingDepts && departments.length === 0 && (
          <p className="text-xs text-muted mt-1.5">
            No departments yet — create one first.
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2.5 pt-2">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add student"}
        </button>
      </div>
    </form>
  );
}
