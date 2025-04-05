import { Request, Response } from 'express';
import { UserService } from '../../core/domain/interfaces/services/UserService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class UserController {
    constructor(private userService: UserService) {}

    getUsers = catchAsync(async (_req: Request, res: Response): Promise<void> => {
        const users = await this.userService.getAllUsers();
        res.status(200).json(users);
    });

    getUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const user = await this.userService.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json(user);
    });

    createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const user = await this.userService.createUser(req.body);
        res.status(201).json(user);
    });

    updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const user = await this.userService.updateUser(req.body);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json(user);
    });

    deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const deleted = await this.userService.deleteUser(id);

        if (!deleted) {
            throw new AppError('User not found', 404);
        }

        res.status(204).send();
    });

    login = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        const result = await this.userService.authenticate(email, password);

        if (!result) {
            throw new AppError('Invalid email or password', 401);
        }

        res.status(200).json(result);
    });

    register = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const result = await this.userService.register(req.body);
        res.status(201).json(result);
    });
}