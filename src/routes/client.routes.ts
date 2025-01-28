import { createCustomerConstroller, getClientSecretConstroller } from "../controllers/customerController";
import { Router } from "express";


const router = Router();

router.post('/client', createCustomerConstroller);

router.post('/client/secret', getClientSecretConstroller);

export { router };