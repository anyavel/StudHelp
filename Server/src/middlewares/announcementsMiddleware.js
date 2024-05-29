
class AnnouncementMiddleware {
    maxFiles = 5
    maxSize = 1024 * 1024 * 1;
    allowedMimetypes = []

    async checkFiles(req,res,next) {
        const attachments = req.files;
        for(const a of attachments) {

        }
    }
}