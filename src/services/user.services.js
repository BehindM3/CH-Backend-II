import { createHash, isValidPassword } from "../utils/utils.js";
import { userDao } from "../daos/mongoDB/user.dao.js";

export const getUserByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (user) => {
    try {
        const { email, password } = user;
        const exist = await getUserByEmail(email);
        if (exist) {
            throw new Error("Usuario ya existente.");
        }
        const newUser = {
            ...user,
            password: createHash(password)
        };
        return await userDao.register(newUser);
    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

export const login = async (credentials) => {
    try {
        const user = await userDao.getByEmail(credentials.email);
        const isValidCredentials = user && isValidPassword(credentials.password, user);
        if( !isValidCredentials ) throw new Error("Credenciales no validas.");
        return user;
    } catch (error) {
        throw new Error(`Error al intnetar loguear el usuario: ${error.message}`);
    }
}

export const getUserbyId = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const registerGithub = async (userData) => {
    try {
        console.log(userData)
        return await userDao.register(userData);
    } catch (error) {
        throw new Error("Error al crear el usuario: ", error.message);
    }
}