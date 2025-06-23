// const ApiError = require('../errors/apiError');
// const tokenServices = require('../services/tokenService');
import ApiError from "../errors/apiError.js";
import { tokenService } from "../services/tokenService.js";
import { userService } from "../services/userService.js";

class AuthMiddleware {

    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) return next(new ApiError("Token is not provided", 401));

            res.locals.payload = tokenService.checkToken(accessToken, 'ACCESS');
            next();
        } catch (e) {
            next(e);
        }
    }

    checkIsAdmin(req, res, next) {
        try {
            const { role } = res.locals.payload;
            if (!role || role !== 'admin') return next(new ApiError('Недоступно!', 403));
            next();
        } catch (e) {
            next(e);
        }
    }

    async checkEmailVerified(req, res, next) {
        const { userId } = res.locals.payload;
        const user = await userService.getUserById(userId);
        if(!user || !user.emailVerified) return next(new ApiError('Непідтверджена пошта!', 401));
        next();
    }

    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) return next(new ApiError("Token is not provided", 401));

            res.locals.payload = tokenService.checkToken(refreshToken, 'REFRESH');
            next();
        } catch (e) {
            return next(e);
        }
    }
}


export const authMiddleware = new AuthMiddleware();