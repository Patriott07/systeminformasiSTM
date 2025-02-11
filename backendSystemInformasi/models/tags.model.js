import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true
    }
);

export const Tags = mongoose.model("tags", TagSchema);