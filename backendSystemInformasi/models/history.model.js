import mongoose from "mongoose"

const SchemaHistories = mongoose.Schema({
    created_by: String, // type data string yang menampung id
    name : String,
    aktivitas : String,
    date : {
        type : Date,
        default : Date.now
    }
}, {
    timestamps : true
});


export const History = mongoose.model('histories', SchemaHistories);