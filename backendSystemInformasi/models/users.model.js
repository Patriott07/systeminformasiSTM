import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        role: String,
    },
    {
        timestamps: true
    }
);

export const Users = mongoose.model("users", UserSchema);