import axiosClient from "./axiosClient";

const studentApi = {
  getAll: () => axiosClient.get("/students/").then((res) => res.data),
  getById: (id) => axiosClient.get(`/students/${id}`).then((res) => res.data),
  create: (data) => axiosClient.post("/students/", data).then((res) => res.data),
  update: (id, data) => axiosClient.put(`/students/${id}`, data).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/students/${id}`).then((res) => res.data),
};

export default studentApi;
