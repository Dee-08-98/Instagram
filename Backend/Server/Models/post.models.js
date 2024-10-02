const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const postSchema = new mongoose.Schema(
    {

        caption: {
            type: String,
            trim: true,
            default: ""
        },
        image: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "USer"
        },
        likes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "USer"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Comment"
            }
        ],

    }, {
    timestamps: true
} 
)

const Post = new mongoose.model("Post",postSchema)
module.exports = Post