"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
Role_1.default.belongsToMany(User_1.default, { through: "User_Role" });
