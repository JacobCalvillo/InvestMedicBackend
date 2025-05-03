import {User} from '../domain/entities/User';
import {UserRepository} from "../domain/interfaces/repositories/UserRepository";
import {UserService} from '../domain/interfaces/services/UserService'
import {AuthService} from "../domain/interfaces/services/AuthService";
import {AppError} from "../domain/errors/AppError";
import {PasswordHasher} from '../../infrastructure/security/PasswordHasher'

export class UserServiceImpl implements UserService {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private authService: AuthService
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async createUser(user: User): Promise<User> {
        // Verificar si el email ya existe
        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new AppError('Email already in use', 409);
        }

        // Hashear la contraseña
        user.password = await this.passwordHasher.hash(user.password);

        return this.userRepository.create(user);
    }

    async updateUser(user: User): Promise<User | null> {
        if (!user.id) {
            throw new AppError('User ID is required for update', 400);
        }

        // Verificar si el usuario existe
        const existingUser = await this.userRepository.findById(user.id);
        if (!existingUser) {
            return null;
        }

        // Si se está actualizando la contraseña, hashearla
        if (user.password && user.password !== existingUser.password) {
            user.password = await this.passwordHasher.hash(user.password);
        }

        return this.userRepository.update(user);
    }

    async deleteUser(id: number): Promise<boolean> {
        return this.userRepository.delete(id);
    }

    async authenticate(email: string, password: string): Promise<{ user: User, token: string } | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }

        const isPasswordValid = await this.passwordHasher.verify(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        // Generar token JWT
        const token = await this.authService.generateToken({ id: user.id });

        // No devolver la contraseña
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword as User,
            token
        };
    }

    async register(user: User): Promise<{ user: User, token: string } | null> {
        const createdUser = await this.createUser(user);

        // Generar token JWT
        const token = await this.authService.generateToken({ id: createdUser.id });

        // No devolver la contraseña
        const { password: _, ...userWithoutPassword } = createdUser;
        return {
            user: userWithoutPassword as User,
            token
        };
    }
}