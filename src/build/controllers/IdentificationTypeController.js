"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdentificationTypesController = exports.createIdentificationTypeController = void 0;
const identificationTypeService_1 = require("../services/identificationTypeService");
const createIdentificationTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const identificationType = yield (0, identificationTypeService_1.createIdentificationType)(body);
        res.status(200).send(identificationType);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createIdentificationTypeController = createIdentificationTypeController;
const getIdentificationTypesController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identificationTypes = yield (0, identificationTypeService_1.getIdentificationTypes)();
        res.status(200).send(identificationTypes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getIdentificationTypesController = getIdentificationTypesController;
