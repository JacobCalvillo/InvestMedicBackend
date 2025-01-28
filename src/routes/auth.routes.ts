import { Router } from "express";
import { registercontroller, logincontroller } from "../controllers/authController";

const router =  Router();

router.post('/login', logincontroller);
router.post('/register', registercontroller);


export { router };