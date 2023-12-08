import express from "express";
import appartement from "./AppartementRoutes.js";
import Syndic from "./SyndicRoutes.js"
const router = express.Router();
  
router.use("/appartements",appartement);
router.use("/syndic",Syndic);

export default router;
