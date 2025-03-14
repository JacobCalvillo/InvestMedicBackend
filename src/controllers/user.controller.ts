import { handleHttp } from "../utils/error.handle";
import { Response, Request} from "express";
import { getAllUsers, getUserById, createUser, deleteUser, updateUser, getUserByEmail } from '../services/user.service';

export const getUsersController = async (_req: Request, res: Response ) => {
    try {
        const users = await getAllUsers();

        if (users) {
            res.status(200).send(users);
        } else {
            res.status(400).send({ message: users });
        }
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USERS', error);
    }
}

export const getUserByIdController = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const user = await getUserById(Number(id));
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send({ message: user });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USER', error);
    }
}

export const getUserByEmailController = async (req: Request, res: Response ) => {
    try {
        const email = req.params.email;
        const user = getUserByEmail(email);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send({ message: user });
        }

    } catch (error) {
        handleHttp(res, 'ERROR_GET_USER', error);
    }
}

export const createUserController = async (req: Request, res: Response ) => {
    try {
        const user = await createUser(req.body);
        if (user) {
            console.log()
            res.status(200).send(user);
        } else {
            res.status(400).send({ message: user });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_CREATE_USER', error);
    }
}

export const updateUserController = async (req: Request, res: Response ) => {
    try {
        const user = await updateUser(req.body);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send({ message: user });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_USER', error);
    }
}


export const deleteUserController = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(Number(id));
        if (user) {
            res.status(200).send({ message: user });
        } else {
            res.status(400).send({ message: user });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_USER', error);
    }
}