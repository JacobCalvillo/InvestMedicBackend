import { User } from '../../entities/User';

export interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<boolean>;
}