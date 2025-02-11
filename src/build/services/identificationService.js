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
exports.deleteIdentification = exports.updateIdentification = exports.getIdentificationById = exports.getIdentifications = exports.createIdentification = void 0;
const IdentificationUser_1 = __importDefault(require("../db/models/IdentificationUser"));
const createIdentification = (identificationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(identificationData);
        const { identificationTypeId } = identificationData;
        const newIdentification = yield IdentificationUser_1.default.create(Object.assign(Object.assign({}, identificationData), { identificationTypeId: Number(identificationTypeId) }));
        return newIdentification;
    }
    catch (error) {
        console.error("Error al crear la identificación:", error);
        return null;
    }
});
exports.createIdentification = createIdentification;
const getIdentifications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield IdentificationUser_1.default.findAll();
        return identifications;
    }
    catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
});
exports.getIdentifications = getIdentifications;
const getIdentificationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identification = yield IdentificationUser_1.default.findOne({ where: { id: id } });
        return identification;
    }
    catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
});
exports.getIdentificationById = getIdentificationById;
const updateIdentification = (id, identificationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedIdentification = yield IdentificationUser_1.default.update(identificationData, { where: { id: id } });
        return updatedIdentification;
    }
    catch (error) {
        console.error("Error al actualizar la identificación:", error);
        return null;
    }
});
exports.updateIdentification = updateIdentification;
const deleteIdentification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedIdentification = yield IdentificationUser_1.default.destroy({ where: { id: id } });
        return deletedIdentification;
    }
    catch (error) {
        console.error("Error al eliminar la identificación:", error);
        return null;
    }
});
exports.deleteIdentification = deleteIdentification;
