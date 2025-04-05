import { getIdentificationTypesController } from "../controllers/identificationTypes.controller";
import { Router } from "express";

const router = Router();

//GET
router.get("/identificationTypes", getIdentificationTypesController);


export { router };