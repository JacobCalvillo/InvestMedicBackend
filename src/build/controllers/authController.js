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
exports.logincontroller = exports.registercontroller = void 0;
const authService_1 = require("../services/authService");
const error_handle_1 = require("../utils/error.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const registercontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const response = yield (0, authService_1.registerNewUser)(user);
        if (response) {
            res.status(200).send({
                data: response,
                message: 'User created',
            });
        }
        else {
            res.status(400).send({ message: 'User not created' });
        }
    }
    catch (error) {
        return (0, error_handle_1.handleHttp)(res, 'ERROR_REGISTER_USER', error);
    }
});
exports.registercontroller = registercontroller;
const logincontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = yield (0, authService_1.loginUser)(data);
        if (user) {
            const token = (0, jwt_handle_1.generateToken)(req.body.email);
            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60
            }).status(200).send({ user, token });
        }
        else {
            res.status(400).send({ message: 'Password or email incorrect' });
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_LOGIN_USER', error);
    }
});
exports.logincontroller = logincontroller;
