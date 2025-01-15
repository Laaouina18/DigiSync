import {Router} from "express";
const router = Router();

import *as authCtr from "../../controllers/auth/AuthController.js";

router.post("/inscrir",authCtr.register);
router.post("/login",authCtr.login)
export default router;