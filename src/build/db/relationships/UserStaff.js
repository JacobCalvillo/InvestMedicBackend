"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Staff_1 = __importDefault(require("../models/Staff"));
const User_1 = __importDefault(require("../models/User"));
Staff_1.default.belongsTo(User_1.default, {
    foreignKey: {
        name: "user_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
