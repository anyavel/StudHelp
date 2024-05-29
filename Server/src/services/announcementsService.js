// const ApiError = require('../errors/apiError');
// const Announcement = require('../models/Announcement');
import ApiError from "../errors/apiError.js";
import {Announcement} from '../models/Announcement.js';

class AnnouncementsService {
    constructor() {
        this.recordsPerPage = 10;
    }

    async getAnnouncementsList(page) {
        const skip = (page - 1) * this.recordsPerPage;
        const announcements = await Announcement.find().select({ title: 1, body: 1, "_id": 1 })
            .limit(this.recordsPerPage).skip(skip).sort('-createdAt');
        const recordsCount = await Announcement.countDocuments();
        return { announcements, pagesCount: Math.ceil(recordsCount / this.recordsPerPage) };
    }

    async getAnnouncementDetails(id) {
        const announcement = await Announcement.findById(id).select({
            title: 1,
            body: 1,
            _id: 1,
            attachments: 1
        }).populate('author', {
            _id: 1,
            firstName: 1,
            lastName: 1
        });
        if (!announcement) throw new ApiError('Оголошення не існує', 404);
        return announcement;
    }

    async createAnnouncement(announcement, attachments, authorId) {
        announcement.attachments = attachments || [];
        announcement.author = authorId;

        return await Announcement.create(announcement);
    }

    //todo only title and body allowed
    async updateAnnouncement(announcementId, updateData) {
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) throw new ApiError('Оголошення не існує', 404);

        const { title = announcement.title, body = announcement.body } = updateData;
        return await Announcement.findByIdAndUpdate(announcementId, { title, body }, { new: true });
    }

    //{delete: [string], add: [file]}
    async updateAttachments(announcementId, attachmentsData) {
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) throw new ApiError('Оголошення не існує', 404);
        const { delete: deleteAttachemnts = [], add = [] } = attachmentsData;
        if (!!deleteAttachemnts.length) announcement.attachments = announcement.attachments.filter(a => !deleteAttachemnts.includes(a));
        const tooMuchAttachemnts = add.length + announcement.attachments.length > 5;
        if (!!add.length && !tooMuchAttachemnts) announcement.attachments = [...announcement.attachments, ...add];
        else if (tooMuchAttachemnts) throw new ApiError('Дозволено тільки 5 зображень', 404);

        return await announcement.save();
    }

    getAnnouncementAttachaments(announcementId, userId) {
        return Announcement.findById(announcementId).select('attachments');
    }

    async deleteAnnouncement(announcementId, userId) {
        const announcement = await Announcement.findOneAndDelete({_id: announcementId, author: userId});
        if(!announcement) throw new ApiError('Оголошення не існує', 404);
        return announcement.attachments;
    }

}

export const announcementsService = new AnnouncementsService();