// src/api/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../core/domain/interfaces/services/AuthService';

export const createAuthMiddleware = (authService: AuthService) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get the token from the authorization header
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Unauthorized: No token provided' });
                return; // Importante: solo retornar sin valor
            }

            const token = authHeader.split(' ')[1];

            // Verify the token
            try {
                const decoded = await authService.verifyToken(token);

                // Add the user info to the request object
                (req as any).user = decoded;

                next();
            } catch (error) {
                res.status(401).json({ message: 'Unauthorized: Invalid token' });
                return; // Importante: solo retornar sin valor
            }
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(500).json({ message: 'Internal server error' });
            return; // Importante: solo retornar sin valor
        }
    };
};

// Crear una instancia del middleware
import { JwtAuthService } from '../../infrastructure/security/JwtAuthService';
const authService = new JwtAuthService();
export const authenticate = createAuthMiddleware(authService);