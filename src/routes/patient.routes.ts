import express from "express";
import { getAllPatientsController, getPatientByIdController, createPatientController } from "../controllers/patient.controller";

const router = express.Router();

//GET
router.get("/patients", getAllPatientsController)
router.get("/patient/:id", getPatientByIdController);

//POST
router.post("/patient", createPatientController)

export { router };
