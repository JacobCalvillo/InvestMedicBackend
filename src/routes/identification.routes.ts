import {
    createIdentificationController,
    deleteIdentificationController,
    getIdentificationsController,
    updateIdentificationController
} from "../controllers/identificationController";
import { Router } from "express";

const router = Router();

router.get('/identifications', getIdentificationsController);

router.post('/identification', createIdentificationController);

router.put('/identification/:id', updateIdentificationController);

router.delete('/identification/:id', deleteIdentificationController);

export { router };