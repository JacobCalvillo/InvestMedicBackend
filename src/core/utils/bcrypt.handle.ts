import { hash, compare } from "bcrypt";

const encrypt = async (password: string) => {
    if (!password) {
        throw new Error('Password is required');
    }
    const passwordHashed = await hash(password, 10);
    return passwordHashed;
}

const decrypt = async (password: string, hash: string) => {
    const isCorrect = await compare(password, hash);
    return isCorrect;
}

export { encrypt, decrypt }