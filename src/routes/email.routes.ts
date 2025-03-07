import { sendWelcomeEmailController } from "../controllers/email.controller";
import { Router } from "express";

const router = Router();

router.post('/email/welcome', sendWelcomeEmailController);

export { router };