import { Router } from "express";
import {userController} from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { commonMiddleware } from '../middlewares/commonMiddleware.js';
import { authValidator } from '../validators/authValidator.js';

const router = Router()
//(req, res, next)
//todo add validation with joi
router.post("/signup", userController.signUp);
router.post("/signin", commonMiddleware.isBodyValid(authValidator.loginUser), userController.signIn);
router.get("/refresh", authMiddleware.checkRefreshToken, userController.refresh);
router.get("/me", authMiddleware.checkAccessToken, userController.getMyInfo);
router.put('/personal-data', authMiddleware.checkAccessToken, userController.updatePersonalInfo);

export const authRouter = router;