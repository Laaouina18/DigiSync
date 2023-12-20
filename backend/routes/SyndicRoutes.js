import {Router} from "express";

const router = Router();
import { CreateSyndic,UpadetSyndic,DeleteSyndic,getAllSyndic, getSyndic ,getApartmentsForSyndic} from "../controllers/SyndicController.js";
router.post("/",CreateSyndic);
router.get("/",getAllSyndic);
router.get("/:id",getSyndic);
router.get("/appartement/:id",getApartmentsForSyndic);

router.patch("/:id",UpadetSyndic);
router.delete("/:id",DeleteSyndic);
export default router;