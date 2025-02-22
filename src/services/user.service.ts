import client from '../db/db-config/connect.db';
import { User } from '../db/models/User';

export const getAllUsers = async (): Promise<User[] | string> => {
    try {
        const users = await client.query('SELECT * FROM "User"');
        if(users) {
            return users.rows;
        }
        return 'No hay usuarios en la base de datos';
    } catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}

export const getUserById = async(id:number) : Promise<User | string> => {
    try {
        const user = await client.query('SELECT * FROM "User" WHERE id = $1', [id]);
        return user.rows[0];
    } catch (error) {
        console.log(error);
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}

export const getUserByEmail = async(email:string) : Promise<User | string> => {
    try {
        const user = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
        return user.rows[0];
    } catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}

export const createUser = async(user: User) : Promise<User | string> => {
    try {
        const newUser = await client.query(`
            INSERT INTO "User" (username, password, email, phone, profile_picture_url) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.username, user.password, user.email, user.phone, user.profile_picture_url]);

        if (newUser) {
            return newUser.rows[0];
        }
        return 'No se pudo crear el usuario';

    } catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}

export const updateUser = async(user: User) : Promise<User | string> => {
    try {
        const updatedUser = await client.query(`
            UPDATE "User" SET username = $1, password = $2, email = $3, phone = $4, profile_picture_url = $5 WHERE id = $6 RETURNING *`,
            [user.username, user.password, user.email, user.phone, user.profile_picture_url, user.id]);
        if (updatedUser) {
            return updatedUser.rows[0];
        }
        return 'No se pudo actualizar el usuario';
    } catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}

export const deleteUser = async(id: number) : Promise<string> => {
    try {
        const deletedUser = await client.query('DELETE FROM "User" WHERE id = $1', [id]);
        if (deletedUser) {
            return 'Usuario eliminado';
        }
        return 'No se pudo eliminar el usuario';
    } catch (error) {
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
}