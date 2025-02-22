import client  from '../db/db-config/connect.db'
import { User } from '../db/models/User';
import { encrypt, decrypt } from "../utils/bcrypt.handle";

export const registerUser = async (user: User): Promise<User | null> => {
    try {
        const { password } = user;
        const hashedPassword = await encrypt(password);
        const newUser = await client.query(
            `INSERT INTO "User" (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.username, user.email, hashedPassword, user.phone]);

        return newUser.rows[0] || null;
    } catch (error) {
        return null;
    }
}

export const loginUser = async(email:string, password:string) : Promise<User | null> => {
    try {

        const loginUser = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
        if (loginUser) {
            if (!loginUser.rows[0].password === await decrypt(password, loginUser.rows[0].password)) {
                return null
            }
        }
        return loginUser.rows[0] || null;
    } catch (error) {
        return null;
    }
}