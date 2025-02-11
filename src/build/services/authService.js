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
exports.loginUser = exports.registerNewUser = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const registerNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existEmail = yield User_1.default.findOne({ where: { email: user.email } });
        if (!existEmail) {
            const password = user.password;
            console.log(user);
            if (!password || !user.username || !user.email || !user.phone) {
                throw new Error('Faltan campos obligatorios');
            }
            // Cifrar la contraseña
            const hashedPassword = yield (0, bcrypt_handle_1.encrypt)(password);
            // Crear un nuevo usuario
            const newUser = yield User_1.default.create({
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: hashedPassword,
            });
            console.log(newUser);
            return newUser;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email: body.email } });
        if (user) {
            const isPasswordValid = yield (0, bcrypt_handle_1.decrypt)(body.password, user.password);
            if (isPasswordValid) {
                return user;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error('Error login user');
    }
});
exports.loginUser = loginUser;
