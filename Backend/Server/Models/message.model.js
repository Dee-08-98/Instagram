const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
    {

        senderId: {
            type: mongoose.Schema.ObjectId,
            ref: "USer"
        },
        receiverId: {
            type: mongoose.Schema.ObjectId,
            ref: "USer"
        }, 
        message: {
            type: String,
            required: true,
            trim :true
        }

    }
)

const Message = new mongoose.model("Message", messageSchema)
module.exports = Message