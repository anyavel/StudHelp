import {Room} from '../models/Room.js';
import ApiError from '../errors/apiError.js';

class RoomController {
    async getRooms(req, res, next) {
        try {
            const rooms = await Room.find();
            const data = rooms.map(i => ({...i._doc, available: i._doc.maxPeople - i._doc.students.length}));

            return res.json({
                rooms: data
            });
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }
}

export const roomController = new RoomController();