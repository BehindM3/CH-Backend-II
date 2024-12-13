import jwt from 'jsonwebtoken';
import 'dotenv/config';


export const generateToken = (user) => {
    const {SECRET_KEY} = process.env;
    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age ?? null,
        role: user.role ?? 'user'
    };

    jwt.sign(payload, SECRET_KEY, { expiresIn: "30min"});
}