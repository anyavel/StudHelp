// const ApiError = require('../errors/apiError');
// const announcementsService = require('../services/announcementsService');
// const filesService = require('../services/filesService');
// const path = require('path');
// const ObjectId = require('mongoose').Types.ObjectId;
import ApiError from "../errors/apiError.js";
import { announcementsService } from '../services/announcementsService.js';
import {filesService} from '../services/filesService.js';
import path from 'path';
import ObjectId from "mongoose";


class AnnouncementsController {
    constructor() {
        this.createAnnouncement = this.createAnnouncement.bind(this);
        this.getFilesArrayFromFormData = this.getFilesArrayFromFormData.bind(this);
        this.updateAnnouncementAttachments = this.updateAnnouncementAttachments.bind(this);
        this.deleteAnnouncementAttachments = this.deleteAnnouncementAttachments.bind(this);
    }

    async getAnnouncements(req, res, next) {
        try {
            const { page = 1 } = req.query;
            if (!page || !Number.isInteger(+page) || page <= 0) return next(new ApiError('Невалідне значення сторінки', 400));
            const data = await announcementsService.getAnnouncementsList(+page);
            return res.json(data);
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }

    async createAnnouncement(req, res, next) {
        let files = this.getFilesArrayFromFormData(req, 'attachments');
        let fileNames = [];
        try {
            const { userId: authorId } = res.locals.payload;
            if (!!files && !!files.length) fileNames = await filesService.saveFiles(files);

            const announcement = await announcementsService.createAnnouncement(req.body, fileNames, authorId);
            return res.status(201).json(announcement);
        } catch (e) {
            if (!!fileNames.length) await filesService.deleteFiles(fileNames);
            next(new ApiError(e.message, e.status));
        }
    }

    async getAnnouncementById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id || id <= 0) return next(new ApiError('Id обов\'язкове!', 400));
            const announcement = await announcementsService.getAnnouncementDetails(id);
            return res.json(announcement);
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }

    async updateAnnouncement(req, res, next) {
        try {
            const { id } = req.params;
            const updatedAnnouncement = await announcementsService.updateAnnouncement(id, req.body);
            return res.json(updatedAnnouncement);
        } catch (e) {
            next(new ApiError(e.message, e.status));
        }
    }

    async updateAnnouncementAttachments(req, res, next) {
        const filesToAdd = this.getFilesArrayFromFormData(req, 'add');
        const attachmentsData = { add: filesToAdd };
        if (!req.body.delete) attachmentsData.delete = [];
        else if (!Array.isArray(req.body.delete)) attachmentsData.delete = [req.body.delete];
        else attachmentsData.delete = req.body.delete;
        try {
            const { id } = req.params;
            if (!!filesToAdd && !!filesToAdd.length) attachmentsData.add = await filesService.saveFiles(filesToAdd);
            if (!!attachmentsData.delete.length) await this.deleteAnnouncementAttachments(id, attachmentsData.delete);

            const updatedAnnouncement = await announcementsService.updateAttachments(id, attachmentsData);
            return res.json(updatedAnnouncement);
        } catch (e) {
            await filesService.deleteFiles(attachmentsData.add);
            next(new ApiError(e.message, e.status));
        }
    }

    async deleteAnnouncementAttachments(announcementId, attachments) {
        const { userId } = res.locals.payload;
        const { attachments: currAttachments } = await announcementsService.getAnnouncementAttachaments(announcementId, userId);
        if (!currAttachments.length) return;
        const filesPath = path.join(process.cwd(), 'static');
        for (const f of attachments) {
            if (!currAttachments.includes(f)) continue;
            try {
                await filesService.deleteFile(path.join(filesPath, f));
            } catch {
                continue;
            }
        }
    }

    async deleteAnnouncement(req, res, next) {
        const { userId } = res.locals.payload;
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) return next(new ApiError('Невалідний ідентифікатор оголошення', 400));
        try {
            const attachments = await announcementsService.deleteAnnouncement(id, userId);
            if(!!attachments.length) await filesService.deleteFiles(attachments);
            return res.sendStatus(200);
        } catch (e) {
           return next(new ApiError(e.message, e.status));
        }
    }

    getFilesArrayFromFormData(req, fieldName) {
        if (!req.files || !req.files[fieldName]) return [];
        else if (Array.isArray(req.files[fieldName])) return req.files[fieldName];
        else return [req.files[fieldName]];
    }
}


export const announcementController = new AnnouncementsController(); 