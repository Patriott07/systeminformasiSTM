import mongoose from "mongoose"

const SchemaEvent = mongoose.Schema({
    created_by: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    judul_event : String,
    deskripsi_event : String,
    tanggal : {
        type : Date,
        default : Date.now
    },
    time : {
        type : Number,
        default : new Date().getTime()
    },
    alamat : String
}, {
    timestamps : true
});


export const Events = mongoose.model('events', SchemaEvent);