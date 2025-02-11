"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
const logMiddleware = (_req, _res, next) => {
    console.log("hola soy el LOg");
    next();
};
exports.logMiddleware = logMiddleware;
