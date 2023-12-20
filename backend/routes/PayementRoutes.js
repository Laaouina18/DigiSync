import {Router} from "express";
import { createPayement,getPayement } from "../controllers/PayementController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router=Router();

router.post("/", createPayement);
router.get("/",getPayement);
export default router;