import { hashSync, genSaltSync, compareSync } from "bcrypt";

const iteration = 10;

export const createHash = (password) => hashSync(password, genSaltSync(iteration));

export const isValidPassword = (password, user) => compareSync(password, user.password);