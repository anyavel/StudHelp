import {apiService} from "./apiService";
import {urls} from "../configs";


export const roomService = {
    getRooms: () => apiService.get(urls.rooms.rooms)
}