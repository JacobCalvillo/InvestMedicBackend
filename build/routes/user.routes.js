"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
exports.router = router;
//GET
router.get("/users", user_controller_1.getUsersController);
router.get("/user/:id", user_controller_1.getUserByIdController);
//POST
router.post("/user", user_controller_1.createUserController);
router.post("/register/user", auth_controller_1.registerUserController);
router.post("/login/user", auth_controller_1.loginUserController);
//PUT
router.put("/user", user_controller_1.updateUserController);
//DELETE
router.delete("/user/:id", user_controller_1.deleteUserController);
