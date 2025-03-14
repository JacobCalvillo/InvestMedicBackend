"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const identificationTypes_controller_1 = require("../controllers/identificationTypes.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get("/identificationTypes", identificationTypes_controller_1.getIdentificationTypesController);
