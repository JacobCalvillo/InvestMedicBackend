import { Router} from "express";
import { StatusController } from "../controllers/status.controller";
import { RequestHandler } from 'express';


export function statusRoutes(statusController: StatusController, authenticate: RequestHandler) {
    const router = Router();

    router.get('/status', authenticate, statusController.getStatuses);
    router.get('/status/:id', authenticate, statusController.getStatusById);

    return router;

}