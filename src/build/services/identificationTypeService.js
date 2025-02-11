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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentificationType = exports.getIdentificationTypes = void 0;
const IdentificationType_1 = __importDefault(require("../db/models/IdentificationType"));
const getIdentificationTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identificationTypes = yield IdentificationType_1.default.findAll();
        return identificationTypes;
    }
    catch (error) {
        console.error("Error al obtener los tipos de identificación:", error);
        return null;
    }
});
exports.getIdentificationTypes = getIdentificationTypes;
const createIdentificationType = (identificationTypeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(identificationTypeData);
        const newIdentificationType = yield IdentificationType_1.default.create(identificationTypeData);
        return newIdentificationType;
    }
    catch (error) {
        console.error("Error al crear el tipo de identificación:", error);
        return null;
    }
});
exports.createIdentificationType = createIdentificationType;
