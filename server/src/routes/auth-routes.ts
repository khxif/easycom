import { Router } from "express";
import * as AuthControllers from "../controllers/auth-controllers";
import { verifyToken } from "../middlewares/verify-token";

const router = Router();

router.get("/me", verifyToken, AuthControllers.getMe);
router.post("/signup", AuthControllers.signup);
router.post("/login", AuthControllers.login);
router.post('/admin/signup', AuthControllers.adminSignup);

export default router;
