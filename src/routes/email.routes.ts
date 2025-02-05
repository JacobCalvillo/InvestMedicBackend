import { sendWelcomeEmailController } from "../controllers/emailController";
import { Router } from "express";

const router = Router();

router.post('/email', sendWelcomeEmailController);

export { router };