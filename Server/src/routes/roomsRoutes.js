import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {roomController} from "../controllers/roomController.js";

const router = Router()
router.get('/', authMiddleware.checkAccessToken, authMiddleware.checkIsAdmin, roomController.getRooms)

export const roomRouter = router;