import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { UserEntity } from "../entities/user.entity";
import { User } from "../../../core/domain/entities/User";
import { UserRepository } from "../../../core/domain/interfaces/repositories/UserRepository";

export class TypeORMUserRepository implements UserRepository {
    private repository: Repository<UserEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity);
    }

    async findAll(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.repository.findOneBy({ id });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOneBy({ email });
        return user;
    }

    async create(user: User): Promise<User> {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    async update(user: User): Promise<User> {
        if (!user.id) {
            throw new Error('User ID is required for update');
        }

        // Primero verificamos que el usuario existe
        const existingUser = await this.repository.findOneBy({ id: user.id });
        if (!existingUser) {
            throw new Error(`User with id ${user.id} not found`);
        }

        // Actualizamos los campos
        Object.assign(existingUser, user);

        // Guardamos los cambios
        return await this.repository.save(existingUser);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}