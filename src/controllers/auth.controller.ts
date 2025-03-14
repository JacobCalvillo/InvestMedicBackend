import { loginUser, registerUser } from "../services/auth.service";
import { Request, Response } from "express";
import {handleHttp} from "../utils/error.handle";
import { sendWelcomeEmail } from "../services/email.service";

export const loginUserController = async (req:Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const enterUser = await loginUser(email, password);
        if (enterUser) {
            res.status(200).send(enterUser);
        } else {
            res.status(400).send(enterUser);
        }
    } catch (error) {
        handleHttp(res, 'ERROR_LOGIN_USER', error);
    }
}

export const registerUserController = async (req: Request, res: Response ) => {
    try {
        const user = await registerUser(req.body);
        console.log(user);
        if (user) {
            res.status(200).send({user: user, message: await sendWelcomeEmail(user.email, user.username)});
        } else {
            res.status(400).send(user);
        }
    } catch (error) {
        handleHttp(res, 'ERROR_REGISTER_USER', error);
    }
}