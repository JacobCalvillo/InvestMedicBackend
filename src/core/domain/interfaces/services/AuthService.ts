export interface AuthService {
    verifyToken(token: string): Promise<any>;
    generateToken(payload: any): Promise<string>;
}