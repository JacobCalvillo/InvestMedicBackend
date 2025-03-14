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
exports.createStatusController = exports.getStatusController = exports.getStatusesController = void 0;
const status_service_1 = require("../services/status.service");
const error_handle_1 = require("../utils/error.handle");
const getStatusesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statuses = yield (0, status_service_1.getStatuses)();
        if (statuses) {
            res.status(200).send(statuses);
        }
        else {
            res.status(404).send(statuses);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_GET_STATUSES", error);
    }
});
exports.getStatusesController = getStatusesController;
const getStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, status_service_1.getStatus)(Number(req.params.id));
        if (status) {
            res.status(200).send(status);
        }
        else {
            res.status(404).send(status);
        }
    }
    catch (er) {
        console.log(er);
        (0, error_handle_1.handleHttp)(res, "ERR_GET_STATUS");
    }
});
exports.getStatusController = getStatusController;
const createStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, status_service_1.createStatus)(req.body.name);
        console.log(status);
        if (status) {
            res.status(201).send();
        }
        else {
            res.status(400).send(status);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_CREATE_STATUS", error);
    }
});
exports.createStatusController = createStatusController;
