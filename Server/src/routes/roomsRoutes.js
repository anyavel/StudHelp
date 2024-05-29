import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { commonMiddleware } from '../middlewares/commonMiddleware.js';

const router = Router()
//(req, res, next)
//todo add validation with joi
router.get('/')

export const authRouter = router;