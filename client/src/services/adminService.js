import { apiService } from "./apiService";
import { urls } from "../configs";


export const adminService = {
    getAllStudents: () => apiService.get(urls.admin.users),
}