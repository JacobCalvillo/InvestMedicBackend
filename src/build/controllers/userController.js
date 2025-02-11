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
exports.userDelete = exports.getUserForId = exports.userUpdate = exports.getUsers = exports.getUserByEmailController = void 0;
const error_handle_1 = require("../utils/error.handle");
const userService_1 = require("../services/userService");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsers)();
        if (users !== null) {
            res.status(200).send(users);
        }
        else {
            res.status(200).send({ message: 'No users found' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USERS');
    }
});
exports.getUsers = getUsers;
const getUserForId = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    const { id } = params;
    try {
        const user = yield (0, userService_1.getUserById)(Number(id));
        if (user !== null) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: 'User not found' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USER');
    }
});
exports.getUserForId = getUserForId;
const userUpdate = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const userUpdated = yield (0, userService_1.updateUser)(Number(id), body);
        if (userUpdated !== null) {
            res.status(200).send(userUpdated);
        }
        else {
            res.status(400).send({ message: 'User not updated' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_USER');
    }
});
exports.userUpdate = userUpdate;
const userDelete = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const userDeleted = yield (0, userService_1.deleteUser)(Number(id));
        if (userDeleted !== null) {
            res.status(200).send(userDeleted);
        }
        else {
            res.status(400).send({ message: 'User not deleted' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_USER');
    }
});
exports.userDelete = userDelete;
const getUserByEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const user = yield (0, userService_1.getUserByEmail)(email);
        if (user !== null) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ message: 'User not found' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_USER');
    }
});
exports.getUserByEmailController = getUserByEmailController;
