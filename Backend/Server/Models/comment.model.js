const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
    {

        text: {
            type: String,
            trim: true,
            required: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "USer"
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: true
        }

    }, {
    timestamps: true
}
)

const Comment = new mongoose.model("Comment", commentSchema)
module.exports = Comment