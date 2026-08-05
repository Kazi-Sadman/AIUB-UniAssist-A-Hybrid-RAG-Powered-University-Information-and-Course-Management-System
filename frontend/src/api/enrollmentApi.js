import axiosClient from "./axiosClient";

// Note: the student/course lookup routes are declared inside the /enrollments
// router in the backend, so their real paths are prefixed with /enrollments
// (e.g. /enrollments/students/{id}/courses), not bare /students/{id}/courses.
const enrollmentApi = {
  getAll: () => axiosClient.get("/enrollments/").then((res) => res.data),
  create: (data) => axiosClient.post("/enrollments/", data).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/enrollments/${id}`).then((res) => res.data),
  getCoursesByStudent: (studentId) =>
    axiosClient.get(`/enrollments/students/${studentId}/courses`).then((res) => res.data),
  getStudentsByCourse: (courseId) =>
    axiosClient.get(`/enrollments/courses/${courseId}/students`).then((res) => res.data),
};

export default enrollmentApi;
