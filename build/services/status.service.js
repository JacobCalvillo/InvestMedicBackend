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
exports.createStatus = exports.getStatus = exports.getStatuses = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getStatuses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statuses = yield connect_db_1.default.query(`SELECT * FROM Status`);
        return statuses.rows || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getStatuses = getStatuses;
const getStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield connect_db_1.default.query(`SELECT * FROM Status WHERE id = $1`, [id]);
        return status.rows[0] || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getStatus = getStatus;
const createStatus = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(name);
        const status = yield connect_db_1.default.query(`INSERT INTO Status (name) VALUES ($1)`, [name]);
        return status.rows[0] || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createStatus = createStatus;
