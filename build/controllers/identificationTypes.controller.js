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
exports.getIdentificationTypesController = void 0;
const identificationType_service_1 = require("../services/identificationType.service");
const error_handle_1 = require("../utils/error.handle");
const getIdentificationTypesController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identificationTypes = yield (0, identificationType_service_1.getIdentificationsType)();
        if (identificationTypes) {
            res.status(200).send(identificationTypes);
        }
        else {
            res.status(400).send({ message: 'No hay identificaciones registradas' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_IDENTIFICATION_TYPES', error);
    }
});
exports.getIdentificationTypesController = getIdentificationTypesController;
