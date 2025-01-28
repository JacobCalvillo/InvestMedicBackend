import { handleHttp } from "../utils/error.handle";
import { Response, Request} from "express";
import { getAllUsers, updateUser, getUserById, deleteUser } from "../services/userService";

const getUsers = async (_req: Request, res: Response ) => {
    try {
        const users  = await getAllUsers();

        if (users !== null) {
            res.status(200).send(users);
        } else {
            res.status(200).send({ message: 'No users found' });    
        }
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USERS');
    }
}

const getUserForId = async({ params }: Request, res : Response) => {
    const { id } = params;
    try {
        const user = await getUserById(Number(id));
        
        if (user !== null) {
            res.status(200).send(user);
        } else {
            res.status(400).send({ message: 'User not found' });
        }

    } catch (error) {
        handleHttp(res, 'ERROR_GET_USER');
    }
}
const userUpdate = async ({ params, body }: Request, res : Response) => {
    try { 
        const { id } = params;
        const userUpdated = await updateUser(Number(id), body);

        if (userUpdated !== null) {
            res.status(200).send(userUpdated);
        } else {
            res.status(400).send({ message: 'User not updated' });
        }

    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_USER');
    }
}

const userDelete = async ({ params }: Request, res : Response) => {
    try {
        const { id } = params;
        const userDeleted = await deleteUser(Number(id));
        
        if (userDeleted !== null) {
            res.status(200).send(userDeleted);
        } else {
            res.status(400).send({ message: 'User not deleted' });
        }

    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_USER');
    }
}

export { getUsers, userUpdate, getUserForId , userDelete };
