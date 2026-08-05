import axiosClient from "./axiosClient";

const departmentApi = {
  getAll: () => axiosClient.get("/departments/").then((res) => res.data),
  getById: (id) => axiosClient.get(`/departments/${id}`).then((res) => res.data),
  create: (data) => axiosClient.post("/departments/", data).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/departments/${id}`).then((res) => res.data),
};

export default departmentApi;
