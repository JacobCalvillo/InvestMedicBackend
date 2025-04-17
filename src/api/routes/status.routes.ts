import { Router} from "express";
import {
    getStatusController,
    getStatusesController,
    createStatusController,
} from "../controllers/status.controller";

const router = Router();

//GET
router.get("/status/:id", getStatusController);
router.get("/status", getStatusesController);

//POST
router.post("/status", createStatusController);

export {router};