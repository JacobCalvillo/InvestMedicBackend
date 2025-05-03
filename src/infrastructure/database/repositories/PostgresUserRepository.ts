import { Pool } from 'pg';
import { User } from '../../../core/domain/entities/User';
import { UserRepository } from '../../../core/domain/interfaces/repositories/UserRepository';


export class PostgresUserRepository implements UserRepository {
    constructor(private db: Pool) {}

    async findAll(): Promise<User[]> {
        const result = await this.db.query('SELECT * FROM "User"');
        return result.rows;
    }

    async findById(id: number): Promise<User | null> {
        const result = await this.db.query('SELECT * FROM "User" WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.db.query('SELECT * FROM "User" WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    async create(user: User): Promise<User> {
        const result = await this.db.query(
            `INSERT INTO "User" (username, email, password, phone, profile_picture_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [
                user.username,
                user.email,
                user.password,
                user.phone,
                user.profilePictureUrl || null
            ]
        );
        return result.rows[0];
    }

    async update(user: User): Promise<User> {
        const result = await this.db.query(
            `UPDATE "User"
       SET username = $1, email = $2, password = $3, phone = $4, profile_picture_url = $5
       WHERE id = $6
       RETURNING *`,
            [
                user.username,
                user.email,
                user.password,
                user.phone,
                user.profilePictureUrl || null,
                user.id
            ]
        );
        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.db.query('DELETE FROM "User" WHERE id = $1 RETURNING id', [id]);
        if (!user) {
            return false;
        }
        return true;
    }

}