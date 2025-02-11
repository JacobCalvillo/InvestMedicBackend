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
exports.decrypt = exports.encrypt = void 0;
const bcrypt_1 = require("bcrypt");
const encrypt = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new Error('Password is required');
    }
    const passwordHashed = yield (0, bcrypt_1.hash)(password, 10);
    return passwordHashed;
});
exports.encrypt = encrypt;
const decrypt = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrect = yield (0, bcrypt_1.compare)(password, hash);
    return isCorrect;
});
exports.decrypt = decrypt;
