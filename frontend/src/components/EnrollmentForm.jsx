import React, { useEffect, useState } from "react";
import studentApi from "../api/studentApi";
import courseApi from "../api/courseApi";

export default function EnrollmentForm({ onSubmit, onCancel, submitting }) {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Promise.all([studentApi.getAll(), courseApi.getAll()])
      .then(([s, c]) => {
        setStudents(s);
        setCourses(c);
      })
      .catch(() => {
        setStudents([]);
        setCourses([]);
      })
      .finally(() => setLoadingOptions(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!studentId) nextErrors.studentId = "Choose a student.";
    if (!courseId) nextErrors.courseId = "Choose a course.";
    if (!semester || Number(semester) <= 0) nextErrors.semester = "Enter a valid semester.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSubmit({
      student_id: Number(studentId),
      course_id: Number(courseId),
      semester: Number(semester),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-field">Student</label>
        <select
          className="input-field"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          disabled={loadingOptions}
        >
          <option value="">{loadingOptions ? "Loading students…" : "Select a student"}</option>
          {students.map((s) => (
            <option key={s.student_id} value={s.student_id}>
              {s.name} · #{s.student_id}
            </option>
          ))}
        </select>
        {errors.studentId && <p className="text-xs text-crimson mt-1.5">{errors.studentId}</p>}
      </div>
      <div>
        <label className="label-field">Course</label>
        <select
          className="input-field"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          disabled={loadingOptions}
        >
          <option value="">{loadingOptions ? "Loading courses…" : "Select a course"}</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.title}
            </option>
          ))}
        </select>
        {errors.courseId && <p className="text-xs text-crimson mt-1.5">{errors.courseId}</p>}
      </div>
      <div>
        <label className="label-field">Semester</label>
        <input
          className="input-field"
          type="number"
          min="1"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="e.g. 1"
        />
        {errors.semester && <p className="text-xs text-crimson mt-1.5">{errors.semester}</p>}
      </div>
      <div className="flex justify-end gap-2.5 pt-2">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Enrolling…" : "Enroll student"}
        </button>
      </div>
    </form>
  );
}
