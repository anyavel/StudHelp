import * as Joi from "joi";

class AnnouncementValidator {
    constructor() {
        this.title = Joi.string().min(2).max(50).trim();
        this.body = Joi.string().min(2).max(200).trim();
       
        this.title = this.title.bind(this);
        this.body = this.body.bind(this);
    }

    createAnnouncement = Joi.object({
        title: this.title.required(),
        body: this.body.required(),
    });

    updateAnnouncement = Joi.object({
        title: this.title.required(),
        body: this.body.required(),
    });

}

export const announcementValidator = new AnnouncementValidator();