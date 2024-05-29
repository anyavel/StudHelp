// const ApiError = require('../errors/apiError');
import ApiError from "../errors/apiError.js";

class FileMiddleware {
    //attachment field (array)
    checkFiles(maxFilesCount, maxSize, allowedMimetypes, fieldName) {
        return (req, res, next) => {
            try {
                if (!req.files || !req.files[fieldName]) return next();
                const isArray = Array.isArray(req.files[fieldName]);
                if (!isArray) {
                    const error = this.checkFile(req.files[fieldName], maxSize, allowedMimetypes);
                    if (!!error) return next(new ApiError(error.message, 400));
                } else {
                    if(req.files[fieldName].length > maxFilesCount) return next(new ApiError(`Забагато файлів (${maxFilesCount} дозволено)`, 400));
                    for (const a of req.files[fieldName]) {
                        const error = this.checkFile(a, maxSize, allowedMimetypes);
                        if (!!error) return next(new ApiError(error.message, 400));
                    }
                }
                return next();
            } catch(e) {
                return next(new ApiError(e.message, e.status));
            }
           
        }
    }

    //item from req.files, returns null if ok else {error}
    checkFile(file, maxSize, allowedMimetypes) {
        if (file.size > maxSize) return { message: 'Файл занадто великий (1 Mб - макс.)' }
        else if (!allowedMimetypes.includes(file.mimetype)) {
            const allowedExtensions = allowedMimetypes.map(i => i.split('/')[1]).join(', ');
            return { message: `Невалідне розширення файлу (дозволені - ${allowedExtensions})` }
        }
        return null;
    }
}

export const filesMiddleware = new FileMiddleware();