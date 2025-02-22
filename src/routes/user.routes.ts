import express from "express";
import { getUsersController,
        getUserByIdController,
        createUserController,
        deleteUserController,
        updateUserController,
    } from "../controllers/user.controller";
import { loginUserController, registerUserController } from "../controllers/auth.controller";

const router = express.Router();

//GET
router.get("/users", getUsersController);
router.get("/user/:id", getUserByIdController);

//POST
router.post("/user",createUserController);
router.post("/register/user", registerUserController);
router.post("/login/user", loginUserController);

//PUT
router.put("/user", updateUserController);

//DELETE
router.delete("/user/:id", deleteUserController);

export { router };