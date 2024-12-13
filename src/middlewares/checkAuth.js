import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const checkAuthCookies = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });
        const { SECRET_KEY } = process.env;
        const payloadDecoded = jwt.verify(token, SECRET_KEY);
        req.user = payloadDecoded;
        next();
    } catch (error) {
        throw new Error(error);
    }
}