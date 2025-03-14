"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const status_controller_1 = require("../controllers/status.controller");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get("/status/:id", status_controller_1.getStatusController);
router.get("/status", status_controller_1.getStatusesController);
//POST
router.post("/status", status_controller_1.createStatusController);
