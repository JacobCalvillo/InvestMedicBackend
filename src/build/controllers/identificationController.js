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
exports.deleteIdentificationController = exports.updateIdentificationController = exports.getIdentificationByIdController = exports.getIdentificationsController = exports.createIdentificationController = void 0;
const identificationService_1 = require("../services/identificationService");
const createIdentificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const identification = yield (0, identificationService_1.createIdentification)(body);
        res.status(200).send(identification);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createIdentificationController = createIdentificationController;
const getIdentificationsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield (0, identificationService_1.getIdentifications)();
        res.status(200).send(identifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getIdentificationsController = getIdentificationsController;
const getIdentificationByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const identification = yield (0, identificationService_1.getIdentificationById)(Number(id));
        res.status(200).send(identification);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getIdentificationByIdController = getIdentificationByIdController;
const updateIdentificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const identification = yield (0, identificationService_1.updateIdentification)(Number(id), body);
        res.status(200).send(identification);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.updateIdentificationController = updateIdentificationController;
const deleteIdentificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const identification = yield (0, identificationService_1.deleteIdentification)(Number(id));
        res.status(200).send(identification);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.deleteIdentificationController = deleteIdentificationController;
