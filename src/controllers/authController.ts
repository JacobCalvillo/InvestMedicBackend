import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/authService";
import { handleHttp } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";


const registercontroller = async (req: Request, res: Response) => {
    try {
        const user = req.body.user;
        const response = await registerNewUser(user);
        if (response) {
            res.status(200).send({
                data: response,
                message: 'User created',
            });
        } else {
            res.status(400).send({ message: 'User not created' });
        }
    } catch (error) {
        return handleHttp(res, 'ERROR_REGISTER_USER', error);
    }
};


const logincontroller = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const user = await loginUser(data); 

        if (user) {
            const token = generateToken(req.body.email);

            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 
            }).status(200).send({ user, token });

        } else {
            res.status(400).send({ message: 'Password or email incorrect' });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_LOGIN_USER', error);
    }
};




export { registercontroller, logincontroller };