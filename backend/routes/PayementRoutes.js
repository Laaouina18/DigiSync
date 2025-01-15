import {Router} from "express";
import * as payement  from "../controllers/PayementController.js";

const router=Router();

router.post("/", payement.createPayment);
router.get("/",payement.getPayments);
export default router;