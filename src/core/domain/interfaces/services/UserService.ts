// src/core/domain/interfaces/services/UserService.ts
import { User } from '../../entities/User';

export interface UserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
    authenticate(email: string, password: string): Promise<{ user: User, token: string } | null>;
    register(user: User): Promise<{ user: User, token: string } | null>;
}