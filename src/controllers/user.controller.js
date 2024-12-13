import { generateToken } from '../auth/jwt.js';
import * as services from '../services/user.services.js'

export const registerResponse = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await services.register(userData);
        res.status(201).json(user);
    } catch (error) {
        next(error);    
    }
};

export const githubRegisterResponse = () => {
    
}

export const loginResponse = async (req, res, next) => {
    try {
        const credentials = req.body;
        const user = await services.login(credentials);
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true}).json({msg: "Correct login."});
    } catch (error) {
        next(error);    
    }
};