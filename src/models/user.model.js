import mongoose, { Schema, model } from 'mongoose';

const usersCollection = "users";

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: {
        type: String,
        unique: true
    },
    age: { type: Number },
    password: { type: String },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        default: "user"
    }
});

/* userSchema.pre('findOne', function () { this.populate(cart) }); */

export const userModel = model(usersCollection, userSchema);