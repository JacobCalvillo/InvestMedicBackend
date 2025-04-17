import {AuthService} from '../../core/domain/interfaces/services/AuthService';
import {sign, verify} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Asegúrate de que estas constantes tengan el tipo correcto
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Definir explícitamente como string
const JWT_EXPIRES_IN = '2h';

export class JwtAuthService implements AuthService {
    async verifyToken(token: string): Promise<any> {
        try {
            // Usar la versión síncrona para evitar problemas de callback
            const decoded = verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            throw error;
        }
    }

    async generateToken(payload: any): Promise<string> {
        try {
            // Usar la versión síncrona y indicar el tipo explícitamente
            // @ts-ignore
            return sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN as string
            });
        } catch (error) {
            throw error;
        }
    }
}