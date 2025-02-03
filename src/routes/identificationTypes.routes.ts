import {
    getIdentificationTypesController,
    createIdentificationTypeController
} from "../controllers/IdentificationTypeController";

import { Router } from "express";

const router = Router();

router.get('/identifications/types', getIdentificationTypesController);

router.post('/identification/type', createIdentificationTypeController);


export { router };