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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield connect_db_1.default.query('SELECT * FROM "User"');
        if (users) {
            return users.rows;
        }
        return 'No hay usuarios en la base de datos';
    }
    catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield connect_db_1.default.query('SELECT * FROM "User" WHERE id = $1', [id]);
        return user.rows[0];
    }
    catch (error) {
        console.log(error);
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield connect_db_1.default.query('SELECT * FROM "User" WHERE email = $1', [email]);
        return user.rows[0];
    }
    catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield connect_db_1.default.query(`
            INSERT INTO "User" (username, password, email, phone, profile_picture_url) VALUES ($1, $2, $3, $4) RETURNING *`, [user.username, user.password, user.email, user.phone, user.profile_picture_url]);
        if (newUser) {
            return newUser.rows[0];
        }
        return 'No se pudo crear el usuario';
    }
    catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.createUser = createUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield connect_db_1.default.query(`
            UPDATE "User" SET username = $1, password = $2, email = $3, phone = $4, profile_picture_url = $5 WHERE id = $6 RETURNING *`, [user.username, user.password, user.email, user.phone, user.profile_picture_url, user.id]);
        if (updatedUser) {
            return updatedUser.rows[0];
        }
        return 'No se pudo actualizar el usuario';
    }
    catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield connect_db_1.default.query('DELETE FROM "User" WHERE id = $1', [id]);
        if (deletedUser) {
            return 'Usuario eliminado';
        }
        return 'No se pudo eliminar el usuario';
    }
    catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
});
exports.deleteUser = deleteUser;
