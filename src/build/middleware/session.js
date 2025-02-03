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
exports.sessionActive = exports.checkJWT = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtUser = req.headers.authorization || null;
        const jwt = jwtUser === null || jwtUser === void 0 ? void 0 : jwtUser.split(' ').pop();
        const isOk = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (!isOk) {
            res.sendStatus(401).send("Sesion invalida");
            return;
        }
        else {
            console.log({ jwtUser });
            next();
        }
    }
    catch (error) {
        res.sendStatus(400).send("Sesion invalida");
        return;
    }
});
exports.checkJWT = checkJWT;
const sessionActive = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403).send("Sesion invalida");
    }
    try {
        const data = (0, jwt_handle_1.verifyToken)(token);
        if (!data) {
            return res.sendStatus(403).send("TOKEN INVALIDO");
        }
    }
    catch (error) {
        return res.sendStatus(500).send("Problemas con el servidor");
    }
    next();
});
exports.sessionActive = sessionActive;
