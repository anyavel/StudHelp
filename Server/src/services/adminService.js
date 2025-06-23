// const User = require('../models/User');
import User from '../models/User';

// class AdminService {
//
//     async createUser(user, role = 'student') {
//         const { phoneNumber } = req.body;
//         const user = await userService.checkIfUserExists({ phoneNumber });
//         if(!!user) throw new ApiError(`Користувач з номером телефону ${phoneNumber} вже існує`, 400);
//
//         if (!req.body.role) req.body.role = 'student';
//         req.body.room = null;
//         const result = await userService.createUser(req.body);
//     }
// }
//
// export const adminService = new AdminService();