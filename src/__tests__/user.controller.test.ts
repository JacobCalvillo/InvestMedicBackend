import {
    getUsersController,
    getUserByIdController,
    getUserByEmailController,
    createUserController,
    updateUserController,
    deleteUserController
} from '../controllers/user.controller';
import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getUserByEmail
} from '../services/user.service';
import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

jest.mock('../services/user.service');
jest.mock('../utils/error.handle');

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        statusMock = res.status as jest.Mock;
        sendMock = res.send as jest.Mock;
    });

    describe('getUsersController', () => {

        it('returns 400 if no users found', async () => {
            (getAllUsers as jest.Mock).mockResolvedValue(null);
            await getUsersController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith({ message: null });
        });

        it('handles errors', async () => {
            const error = new Error('Test error');
            (getAllUsers as jest.Mock).mockRejectedValue(error);
            await getUsersController(req as Request, res as Response);
            expect(handleHttp).toHaveBeenCalledWith(res, 'ERROR_GET_USERS', error);
        });
    });

    describe('getUserByIdController', () => {
        it('returns 200 and user on success', async () => {
            req.params = { id: '1' };
            (getUserById as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe' });
            await getUserByIdController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
        });

        it('returns 400 if user not found', async () => {
            req.params = { id: '1' };
            (getUserById as jest.Mock).mockResolvedValue(null);
            await getUserByIdController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith({ message: null });
        });

        it('handles errors', async () => {
            const error = new Error('Test error');
            req.params = { id: '1' };
            (getUserById as jest.Mock).mockRejectedValue(error);
            await getUserByIdController(req as Request, res as Response);
            expect(handleHttp).toHaveBeenCalledWith(res, 'ERROR_GET_USER', error);
        });
    });


    describe('createUserController', () => {
        it('returns 200 and created user on success', async () => {
            req.body = { name: 'John Doe' };
            (createUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe' });
            await createUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
        });

        it('returns 400 if user creation fails', async () => {
            req.body = { name: 'John Doe' };
            (createUser as jest.Mock).mockResolvedValue(null);
            await createUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith({ message: null });
        });

        it('handles errors', async () => {
            const error = new Error('Test error');
            req.body = { name: 'John Doe' };
            (createUser as jest.Mock).mockRejectedValue(error);
            await createUserController(req as Request, res as Response);
            expect(handleHttp).toHaveBeenCalledWith(res, 'ERROR_CREATE_USER', error);
        });
    });

    describe('updateUserController', () => {
        it('returns 200 and updated user on success', async () => {
            req.body = { id: 1, name: 'John Doe' };
            (updateUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe' });
            await updateUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
        });

        it('returns 400 if user update fails', async () => {
            req.body = { id: 1, name: 'John Doe' };
            (updateUser as jest.Mock).mockResolvedValue(null);
            await updateUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith({ message: null });
        });

        it('handles errors', async () => {
            const error = new Error('Test error');
            req.body = { id: 1, name: 'John Doe' };
            (updateUser as jest.Mock).mockRejectedValue(error);
            await updateUserController(req as Request, res as Response);
            expect(handleHttp).toHaveBeenCalledWith(res, 'ERROR_UPDATE_USER', error);
        });
    });

    describe('deleteUserController', () => {
        it('returns 200 and message on success', async () => {
            req.params = { id: '1' };
            (deleteUser as jest.Mock).mockResolvedValue('User deleted');
            await deleteUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith({ message: 'User deleted' });
        });

        it('returns 400 if user deletion fails', async () => {
            req.params = { id: '1' };
            (deleteUser as jest.Mock).mockResolvedValue(null);
            await deleteUserController(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith({ message: null });
        });

        it('handles errors', async () => {
            const error = new Error('Test error');
            req.params = { id: '1' };
            (deleteUser as jest.Mock).mockRejectedValue(error);
            await deleteUserController(req as Request, res as Response);
            expect(handleHttp).toHaveBeenCalledWith(res, 'ERROR_DELETE_USER', error);
        });
    });
});