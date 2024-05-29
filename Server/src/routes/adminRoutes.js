// const router = require("express").Router();
// const authMiddleware = require('../middlewares/authMiddleware');
// const adminController = require('../controllers/adminController');
import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {adminController} from '../controllers/adminController.js';

//firstname,lastname,fathersname, phonenumber,faculty
//todo add validator!!! (db validation disabled)
const router = new Router();

router.post('/user', authMiddleware.checkAccessToken, authMiddleware.checkIsAdmin, adminController.createUser);

// module.exports = router;
export const adminRouter = router;