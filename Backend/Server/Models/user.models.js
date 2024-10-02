const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
    {

        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            enum: ["Male", "Female"]
        },
        followers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        following: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        post: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Post"
            }
        ],
        bookMarks: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Post"
            }
        ]


    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)

})


userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword , this.password)
}


const User = new mongoose.model("User", userSchema)
module.exports = User