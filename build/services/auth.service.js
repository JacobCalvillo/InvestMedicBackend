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
exports.loginUser = exports.registerUser = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = user;
        const hashedPassword = yield (0, bcrypt_handle_1.encrypt)(password);
        const newUser = yield connect_db_1.default.query(`INSERT INTO "User" (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`, [user.username, user.email, hashedPassword, user.phone]);
        return newUser.rows[0] || null;
    }
    catch (error) {
        return null;
    }
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield connect_db_1.default.query('SELECT * FROM "User" WHERE email = $1', [email]);
        if (loginUser) {
            if (!loginUser.rows[0].password === (yield (0, bcrypt_handle_1.decrypt)(password, loginUser.rows[0].password))) {
                return null;
            }
        }
        return loginUser.rows[0] || null;
    }
    catch (error) {
        return null;
    }
});
exports.loginUser = loginUser;
