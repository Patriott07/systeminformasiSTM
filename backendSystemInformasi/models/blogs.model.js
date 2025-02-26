import mongoose from "mongoose";

const SchemaValueContents = mongoose.Schema({
    type: String, // text, img, vidio
    content: String
});

const SchemaChildComment = mongoose.Schema({
    comment: String,
    date : {
        type : Date,
        default : Date.now
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    details_comment: [
        {
            comment: String,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            }
        },
    ]
})

const SchemaBlog = mongoose.Schema({
    title: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contents: [
        SchemaValueContents
    ],
    photo: String,
    like: Number,
    comments: [SchemaChildComment],
    tags : [String],
}, {
    timestamps: true
})


export const Blogs = mongoose.model('blogs', SchemaBlog);