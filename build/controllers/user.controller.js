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
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByEmailController = exports.getUserByIdController = exports.getUsersController = void 0;
const error_handle_1 = require("../utils/error.handle");
const user_service_1 = require("../services/user.service");
const getUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(400).send({ message: users });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USERS', error);
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.getUserById)(Number(id));
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: user });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USER', error);
    }
});
exports.getUserByIdController = getUserByIdController;
const getUserByEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const user = (0, user_service_1.getUserByEmail)(email);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: user });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USER', error);
    }
});
exports.getUserByEmailController = getUserByEmailController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
        if (user) {
            console.log();
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: user });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_USER', error);
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.updateUser)(req.body);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: user });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_USER', error);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.deleteUser)(Number(id));
        if (user) {
            res.status(200).send({ message: user });
        }
        else {
            res.status(400).send({ message: user });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_USER', error);
    }
});
exports.deleteUserController = deleteUserController;
