import {Router} from "express";
import { getPaymentsController } from "../controllers/payment.controller";

export const router = Router();

//GET
router.get("/payments", getPaymentsController);