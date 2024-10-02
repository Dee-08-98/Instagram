const mongoose = require('mongoose')
const conversessionSchema = new mongoose.Schema(
    {

        partcipents: [
           {
            type: mongoose.Schema.ObjectId,
            ref: "User"
           }
        ],
        partcipents: [
            {
             type: mongoose.Schema.ObjectId,
             ref: "Message"
            }
         ],

    }
)

const converSession = new mongoose.model("converSession", conversessionSchema)
module.exports = converSession