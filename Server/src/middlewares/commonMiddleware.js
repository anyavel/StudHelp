import ApiError from "../errors/apiError.js";

class CommonMiddleware {
    //joi object
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const {error, value} = validator.validate(req.body);
                if(!!error) return next(new ApiError(error.message, 400));
                req.body = value;
                next();
            } catch(e) {
                next(new ApiError(e.message, e.status));
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();