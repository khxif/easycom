import { Router } from "express";
import * as ProductControllers from "../controllers/product-controllers";

const router = Router();

router.get("/", ProductControllers.getAllProducts);
router.post("/", ProductControllers.createProduct);

export default router;
