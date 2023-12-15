import {Router} from "express";
const router = Router();
import { CreateSyndic} from "../../controllers/SyndicController.js";
import {Login} from "../../controllers/auth/AuthController.js";
router.post("/inscrir",CreateSyndic);
router.post("/login",Login)
export default router;