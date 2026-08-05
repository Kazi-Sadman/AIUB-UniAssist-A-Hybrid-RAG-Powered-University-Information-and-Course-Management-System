import React, { useEffect, useState } from "react";
import departmentApi from "../api/departmentApi";

export default function CourseForm({ initial, onSubmit, onCancel, submitting }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [code, setCode] = useState(initial?.code || "");
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
    if (!title.trim()) nextErrors.title = "Course title is required.";
    if (!code.trim()) nextErrors.code = "Course code is required.";
    if (!departmentId) nextErrors.departmentId = "Choose a department.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSubmit({ title: title.trim(), code: code.trim(), department_id: Number(departmentId) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-field">Course title</label>
        <input
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Data Structures & Algorithms"
          autoFocus
        />
        {errors.title && <p className="text-xs text-crimson mt-1.5">{errors.title}</p>}
      </div>
      <div>
        <label className="label-field">Course code</label>
        <input
          className="input-field font-mono"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. CS-201"
        />
        {errors.code && <p className="text-xs text-crimson mt-1.5">{errors.code}</p>}
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
      </div>
      <div className="flex justify-end gap-2.5 pt-2">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add course"}
        </button>
      </div>
    </form>
  );
}
