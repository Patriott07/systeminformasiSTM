import mongoose from "mongoose";

const SchemaValueContents = mongoose.Schema({
    type: String, // text, img, vidio
    content: String
});

const SchemaChildComment = mongoose.Schema({
    comment: String,
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    details_comment: {
        type: [
            {
                comment: String,
                name: String,
            },
        ],
        required : false
    }
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
    // like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    comments: [SchemaChildComment],
    tags: [String],
}, {
    timestamps: true
})


export const Blogs = mongoose.model('blogs', SchemaBlog);