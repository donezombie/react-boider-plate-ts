import httpService from "./httpService";

class AdminService {
  importCustomer(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return httpService.post("/admin/import-customer", formData);
  }
}

export default new AdminService();
