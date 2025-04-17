import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateCreateUser, validateUpdateUser, validateLogin } from '../validators/user.validator';

export function userRoutes(userController: UserController): Router {
    const router = Router();

    // Rutas públicas
    router.post('/login', validateLogin, userController.login);
    router.post('/register', validateCreateUser, userController.register);

    // Rutas protegidas
    router.get('/users', authenticate, userController.getUsers);
    router.get('/users/:id', authenticate, userController.getUserById);
    router.post('/users', authenticate, validateCreateUser, userController.createUser);
    router.put('/users', authenticate, validateUpdateUser, userController.updateUser);
    router.delete('/users/:id', authenticate, userController.deleteUser);

    return router;
}