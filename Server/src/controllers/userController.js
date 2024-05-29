import { userService } from "../services/userService.js";
import { tokenService } from "../services/tokenService.js";
import ApiError from "../errors/apiError.js";

class UserController {
    async signUp(req, res, next) {
        try {
            const { email } = req.body;
            const user = await userService.checkIfUserExists({ email });
            if (!!user) return next(new ApiError('Користувач вже існує', 400));
            req.body.role = 'student';
            req.body.room = null;
            await userService.createUser(req.body);
            return res.status(200).json({ message: 'Користувач створений' });
        } catch (e) {
            return next(e);
        }
    }
    async signIn(req, res, next) {
        try {
            const tokens = await userService.signIn(req.body);
            return res.status(200).json(tokens);
        } catch (e) {
            return next(e);
        }
    }

    refresh(req, res, next) {
        try {
            const { userId, role } = res.locals.payload;
            const tokens = tokenService.generateTokenPair({ userId, role });
            return res.status(200).json(tokens);
        } catch (e) {
            return next(new ApiError(e.message, e.status));
        }
    }

    async getMyInfo(req, res, next) {
        try {
            const { room = false } = req.query;
            const { userId } = res.locals.payload;
            const user = await userService.getUserById(userId, room);
            return res.json(user)
        } catch (e) {
            return next(new ApiError(e.message, e.status));
        }
    }
    //only username and password
    async updatePersonalInfo(req, res, next) {
        try {
            const { userId } = res.locals.payload;
            const updatedUser = await userService.updatePersonalInfo(userId, req.body);
            return res.json(updatedUser);
        } catch (e) {
            return next(new ApiError(e.message, e.status));
        }
    }
}

export const userController = new UserController();