import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();
import { CreateApp, UpadetApp, DeleteApp, getAllApp, getApp} from "../controllers/AppartmentController.js";
router.post("/", CreateApp);
router.get("/", getAllApp);
router.get("/:id", getApp);

router.patch("/:id", UpadetApp);
router.delete("/:id", DeleteApp);
export default router;