"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const IdentificationTypeController_1 = require("../controllers/IdentificationTypeController");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/identifications/types', IdentificationTypeController_1.getIdentificationTypesController);
router.post('/identification/type', IdentificationTypeController_1.createIdentificationTypeController);
