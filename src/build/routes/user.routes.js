"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.router = router;
//GET
router.get("/users", userController_1.getUsers);
router.get("/user/:id", userController_1.getUserForId);
router.get("/user/email/:email", userController_1.getUserByEmailController);
//PUT
router.put("/user", userController_1.userUpdate);
//DELETE
router.delete("/user/:id", userController_1.userDelete);
