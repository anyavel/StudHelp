// const router = require("express").Router();
// const authMiddleware = require('../middlewares/authMiddleware.js');
// const filesMiddleware = require('../middlewares/fileMiddleware.js');
// const announcementController = require('../controllers/announcementsController.js');
import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {filesMiddleware} from '../middlewares/fileMiddleware.js';
import {announcementController} from '../controllers/announcementsController.js';

const allowedMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
];

const router = new Router();
//(req, res, next)
//todo add validation with joi
router.get('/', authMiddleware.checkAccessToken, announcementController.getAnnouncements);
router.post('/', authMiddleware.checkAccessToken,
    filesMiddleware.checkFiles(5, 2 * 1024 * 1024, allowedMimeTypes, 'attachments'),
    announcementController.createAnnouncement
);
router.get('/:id', authMiddleware.checkAccessToken, announcementController.getAnnouncementById);
router.put('/:id', authMiddleware.checkAccessToken, announcementController.updateAnnouncement);
router.put('/:id/attachments', authMiddleware.checkAccessToken,
    filesMiddleware.checkFiles(5, 2 * 1024 * 1024, allowedMimeTypes, 'add'),
    announcementController.updateAnnouncementAttachments);

router.delete('/:id', authMiddleware.checkAccessToken, announcementController.deleteAnnouncement)

export const announcementsRouter = router;