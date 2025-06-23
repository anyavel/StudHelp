// const userService = require('../services/userService');
// const User = require('../models/User');
// const ApiError = require('../errors/apiError');
import {userService} from '../services/userService.js';
import {User} from '../models/User.js';
import ApiError from '../errors/apiError.js';

class AdminController {
    async createUser(req, res, next) {
        try {

            const {phoneNumber} = req.body;
            const user = await userService.checkIfUserExists({phoneNumber});
            if (!!user) throw new ApiError(`Користувач з номером телефону ${phoneNumber} вже існує`, 400);

            if (!req.body.role) req.body.role = 'student';
            req.body.room = null;
            await userService.createUser(req.body);
            return res.sendStatus(200);
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }

    async getStudents(req, res, next) {
        try {
            const users = await User.find({role: 'student'}).populate('room');
            const data = users.map(i => ({
                _id: i._id,
                fullName: `${i.lastName} ${i.firstName} ${i.fathersName}`,
                faculty: i.faculty,
                room: i.room?.number,
                phoneNumber: i.phoneNumber,
                email: i.email,
            }))

            return res.json({
                users: data
            });
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }
}

export const adminController = new AdminController();