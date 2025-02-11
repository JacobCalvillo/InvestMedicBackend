import User from "../db/models/User";

export const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        
        if (users) {
            return users;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await User.findOne({ where: { id: id } });
        if (user) {
            return user;
        } else {
            return [];
        }
    } catch (error) {
        return null;
    }
}

export const updateUser = async(id: number, user: any) => {
    try {
        const updatedUser = await User.update(user, { where: { id: id } });
        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteUser = async(id: number) => {
    try {
        const deletedUser = await User.destroy({ where: { id: id } });
        return deletedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
