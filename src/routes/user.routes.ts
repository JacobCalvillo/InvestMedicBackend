import express from "express";
import { getUsers, getUserForId, userUpdate, userDelete } from "../controllers/userController";


const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserForId);


router.put("/user", userUpdate);

router.delete("/user/:id", userDelete);


export { router };