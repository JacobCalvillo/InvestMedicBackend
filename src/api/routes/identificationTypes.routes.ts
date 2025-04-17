import {IdentificationTypesController} from "../controllers/identificationTypes.controller";
import {RequestHandler, Router} from "express";

export function identificationTypesRoutes(identificationTypesController: IdentificationTypesController, authenticate: RequestHandler): Router {
    const router = Router();

    router.get("/identificationTypes", identificationTypesController.getIdentificationTypes);
    return router;
}