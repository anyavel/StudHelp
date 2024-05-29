import { apiService } from "./apiService";
import { urls } from "../configs";


export const announcementService = {
    getAll: (page = 1) => apiService.get(urls.announcements.announcements, { params: { page } }),
    getById: (id) => apiService.get(urls.announcements.announcements + '/' + id),
    add: (data) => apiService.post(urls.announcements.add, data),
    delete: (id) => apiService.delete
}