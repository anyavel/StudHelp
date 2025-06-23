import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import ApiError from '../errors/apiError.js';

class TokenServices {
    async generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, config.ACCESS_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, config.REFRESH_SECRET, {
            expiresIn: "2d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    generateToken(payload, secret, options) {
        return jwt.sign(payload, secret, options);
    }

    checkToken(token, tokenType) {
        try {
            let secret = "";
            switch (tokenType) {
                case 'ACCESS':
                    secret = config.ACCESS_SECRET;
                    break;
                case 'REFRESH':
                    secret = config.REFRESH_SECRET;
                    break;
            }
            //returns payload if ok!
            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError(e.message, 401);
        }
    }
}

export const tokenService = new TokenServices();