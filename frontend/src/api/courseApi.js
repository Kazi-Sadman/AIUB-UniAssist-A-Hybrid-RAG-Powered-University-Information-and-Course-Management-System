import axiosClient from "./axiosClient";

const courseApi = {
  getAll: () => axiosClient.get("/courses/").then((res) => res.data),
  getById: (id) => axiosClient.get(`/courses/${id}`).then((res) => res.data),
  create: (data) => axiosClient.post("/courses/", data).then((res) => res.data),
  update: (id, data) => axiosClient.put(`/courses/${id}`, data).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/courses/${id}`).then((res) => res.data),
};

export default courseApi;
