import express from "express";
import { getUsers, getUserForId, userUpdate, userDelete, getUserByEmailController } from "../controllers/userController";


const router = express.Router();

//GET
router.get("/users", getUsers);
router.get("/user/:id", getUserForId);
router.get("/user/email/:email", getUserByEmailController);

//PUT
router.put("/user", userUpdate);

//DELETE
router.delete("/user/:id", userDelete);


export { router };