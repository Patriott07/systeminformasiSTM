import mongoose from "mongoose";

const SchemaMedia = mongoose.Schema({
    link : String,
    path : String,
    type : String
});

export const Medias = mongoose.model('medias', SchemaMedia)