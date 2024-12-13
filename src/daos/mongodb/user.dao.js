import { userModel } from '../../models/user.model.js';

class UserManager {
    constructor(model) {
        this.model = model
    }
    
    async register(user) {
        try {
            return await this.model.create( user ); 
        } catch (error) {
            throw new Error("Error al crear el usuario: ", error.message);
        }
    }

    async getByEmail(email) {
        return await this.model.findOne({ email })
    }
    
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
     
}

export const userDao = new UserManager(userModel);
