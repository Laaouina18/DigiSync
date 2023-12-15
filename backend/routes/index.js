import express from "express";
import appartement from "./AppartementRoutes.js";
import Syndic from "./SyndicRoutes.js";
import auth from "./auth/AuthRoutes.js"
const router = express.Router();
  
router.use("/appartements",appartement);
router.use("/syndic",Syndic);
router.use("/auth",auth)

export default router;
