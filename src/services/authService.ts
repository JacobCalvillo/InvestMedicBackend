import User from "../db/models/User";

import { encrypt, decrypt } from "../utils/bcrypt.handle";

const registerNewUser = async (user: User) => {
    try {
        const existEmail = await User.findOne({ where: { email: user.email } });
        if (!existEmail) {
            const password = user.password;
            console.log(user)
            if (!password || !user.username || !user.email || !user.phone) {
                throw new Error('Faltan campos obligatorios');
            }

            // Cifrar la contraseña
            const hashedPassword = await encrypt(password);
            // Crear un nuevo usuario
            const newUser = await User.create({ 
                username: user.username, 
                email: user.email, 
                phone: user.phone,
                password: hashedPassword,
            });

            return newUser;
        } else {
            return null; 
        }
    } catch (error) {
        console.log(error);
        return null; 
    }
};



const loginUser = async (body : any) => {
    try {
        const user = await User.findOne({ where: { email: body.email } });
        if (user) {
            const isPasswordValid = await decrypt(body.password, user.password);
            if (isPasswordValid) {
                return user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('Error login user');
    }
}

export { registerNewUser, loginUser }