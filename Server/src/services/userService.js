// const ApiError = require('../errors/apiError');
// const User = require('../models/User');
// const { hash, compare } = require('bcrypt');
// const tokenService = require('./tokenService');
import ApiError from "../errors/apiError.js";
import {User} from '../models/User.js';
import {hash, compare} from 'bcrypt';
import {tokenService} from './tokenService.js';

class UserService {
    async checkIfUserExists(params) {
        return await User.findOne(params);
    }

    async createUser(user) {
        try {
            const {password} = user;
            const error = await this.validate(user);
            user.password = await hash(password, 3);
            return await User.create(user);
        } catch (e) {
            throw new ApiError(e, 400);
        }
    }

    //{email, password}
    async signIn(data) {
        const {email, password} = data;
        if (!email || !password) throw new ApiError('Електронна пошта і пароль мусять бути вказані', 400);

        const user = await this.checkIfUserExists({email});
        if (!user) throw new ApiError('Користувач не існує', 404);

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) throw new ApiError('Паролі не збігаються', 400);

        return await tokenService.generateTokenPair({userId: user._id, role: user.role});
    }

    //refresh token
    refresh(token) {
        const {userId, role} = tokenService.checkToken(token, 'REFRESH');
        return tokenService.generateTokenPair({userId, role})
    }

    async validate(data) {
        const user = new User();
        for (const [key, value] of Object.entries(data)) {
            user[key] = value;
        }
        return await user.validate();
    }

    async getUserById(id, populateRoom = false) {
        const getUserPromise = User.findById(id);
        if (populateRoom) getUserPromise.populate({
            path: 'room',
            populate: {
                path: 'students',
                select: {_id: 1, phoneNumber: 1, firstName: 1}
            }
        });
        const user = await getUserPromise;
        if (!user) throw new ApiError('Користувач не існує', 404);
        const {email, phoneNumber, _id, firstName, lastName, room, role} = user;
        return {email, phoneNumber, _id, firstName, lastName, room, role};
    }

    async getUserByEmail(userEmail, populateRoom = false) {
        const getUserPromise = User.findOne({email: userEmail});
        if (populateRoom) getUserPromise.populate({
            path: 'room',
            populate: {
                path: 'students',
                select: {_id: 1, phoneNumber: 1, firstName: 1}
            }
        });
        const user = await getUserPromise;
        if (!user) throw new ApiError('Користувач не існує', 404);
        const {email, phoneNumber, _id, firstName, lastName, room} = user;
        return {email, phoneNumber, _id, firstName, lastName, room};
    }

    async updatePersonalInfo(userId, updateData) {
        const user = await User.findById(userId);
        if (!user) throw new ApiError('Користувач не існує', 404);
        //todo check object these fields in validator middleware
        const {phoneNumber = user.phoneNumber, email = user.email} = updateData;

        if (email !== user.email) {
            const userWithSpecifiedEmail = await User.findOne({email});
            if (!!userWithSpecifiedEmail) throw new ApiError('Користувач з такою поштою вже існує', 400);
        }

        return await User.findByIdAndUpdate(userId, {email, phoneNumber}, {new: true}).select({
            email: 1,
            phoneNumber: 1
        });
    }
}

export const userService = new UserService();