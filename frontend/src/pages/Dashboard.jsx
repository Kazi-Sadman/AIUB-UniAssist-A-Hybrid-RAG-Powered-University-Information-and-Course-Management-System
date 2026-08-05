import React, { useEffect, useState } from "react";
import { Building2, GraduationCap, BookOpen, ClipboardList, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import departmentApi from "../api/departmentApi";
import studentApi from "../api/studentApi";
import courseApi from "../api/courseApi";
import enrollmentApi from "../api/enrollmentApi";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useToast } from "../context/ToastContext";

export default function Dashboard() {
  const toast = useToast();
  const [data, setData] = useState({ departments: [], students: [], courses: [], enrollments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      departmentApi.getAll(),
      studentApi.getAll(),
      courseApi.getAll(),
      enrollmentApi.getAll(),
    ])
      .then(([departments, students, courses, enrollments]) => {
        if (!mounted) return;
        setData({ departments, students, courses, enrollments });
      })
      .catch((err) => toast.error(err.message))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perDepartment = data.departments.map((d) => ({
    ...d,
    studentCount: data.students.filter((s) => s.department_id === d.department_id).length,
    courseCount: data.courses.filter((c) => c.department_id === d.department_id).length,
  }));

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <PageHeader
        eyebrow={today}
        title="Term overview"
        description="A live snapshot of the registrar's records, pulled straight from the university API."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Departments"
          value={data.departments.length}
          icon={Building2}
          accent="#C9A227"
          loading={loading}
        />
        <StatCard
          label="Students"
          value={data.students.length}
          icon={GraduationCap}
          accent="#3E7BA6"
          loading={loading}
        />
        <StatCard
          label="Courses"
          value={data.courses.length}
          icon={BookOpen}
          accent="#4F8767"
          loading={loading}
        />
        <StatCard
          label="Enrollments"
          value={data.enrollments.length}
          icon={ClipboardList}
          accent="#A6314A"
          loading={loading}
        />
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div>
            <p className="eyebrow mb-1">Breakdown</p>
            <h3 className="font-display text-lg font-semibold text-parchment">
              Departments at a glance
            </h3>
          </div>
          <Link
            to="/departments"
            className="text-xs font-medium text-gold flex items-center gap-1 hover:text-gold-glow transition-colors"
          >
            View directory <ArrowUpRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-11 bg-surface-raised rounded-lg animate-pulse" />
            ))}
          </div>
        ) : perDepartment.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-muted">
              No departments recorded yet. Add one to see it summarized here.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="eyebrow font-normal px-6 py-3.5">Department</th>
                <th className="eyebrow font-normal px-6 py-3.5">Students</th>
                <th className="eyebrow font-normal px-6 py-3.5">Courses</th>
              </tr>
            </thead>
            <tbody>
              {perDepartment.map((d) => (
                <tr
                  key={d.department_id}
                  className="border-b border-line last:border-0 hover:bg-surface-raised/50 transition-colors"
                >
                  <td className="px-6 py-3.5 text-parchment font-medium">{d.name}</td>
                  <td className="px-6 py-3.5 font-mono text-sky">{d.studentCount}</td>
                  <td className="px-6 py-3.5 font-mono text-sage">{d.courseCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
