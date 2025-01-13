import { Router } from "express";
import * as AuthControllers from "../controllers/auth-controllers";

const router = Router();

router.post("/signup", AuthControllers.signup);
router.post("/login", AuthControllers.login);

export default router;
