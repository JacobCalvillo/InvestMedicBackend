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
exports.registerUserController = exports.loginUserController = void 0;
const auth_service_1 = require("../services/auth.service");
const error_handle_1 = require("../utils/error.handle");
const email_service_1 = require("../services/email.service");
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const enterUser = yield (0, auth_service_1.loginUser)(email, password);
        if (enterUser) {
            res.status(200).send(enterUser);
        }
        else {
            res.status(400).send(enterUser);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_LOGIN_USER', error);
    }
});
exports.loginUserController = loginUserController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.registerUser)(req.body);
        console.log(user);
        if (user) {
            res.status(200).send({ user: user, message: yield (0, email_service_1.sendWelcomeEmail)(user.email, user.username) });
        }
        else {
            res.status(400).send(user);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_REGISTER_USER', error);
    }
});
exports.registerUserController = registerUserController;
