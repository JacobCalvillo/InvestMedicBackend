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
exports.getUserByEmail = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        if (users) {
            return users;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { id: id } });
        if (user) {
            return user;
        }
        else {
            return [];
        }
    }
    catch (error) {
        return null;
    }
});
exports.getUserById = getUserById;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_1.default.update(user, { where: { id: id } });
        return updatedUser;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.destroy({ where: { id: id } });
        return deletedUser;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.deleteUser = deleteUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email: email } });
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.getUserByEmail = getUserByEmail;
