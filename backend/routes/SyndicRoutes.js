import {Router} from "express";
const router = Router();
import { CreateSyndic,UpadetSyndic,DeleteSyndic,getAllSyndic, getSyndic ,Search} from "../controllers/SyndicController.js";
router.post("/",CreateSyndic);
router.get("/",getAllSyndic);
router.get("/:id",getSyndic);
router.get("/search",Search);
router.patch("/:id",UpadetSyndic);
router.delete("/:id",DeleteSyndic);
export default router;