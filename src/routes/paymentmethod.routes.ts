import { getPaymentMethodsController } from "../controllers/paymentmethod.controller";
import { Router} from "express";

const router = Router();

// GET
router.get("/payment/methods", getPaymentMethodsController);


export { router };