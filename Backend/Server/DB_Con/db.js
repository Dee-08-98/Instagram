const mongoose = require('mongoose')

const db_Connection = async()=>{
    try {
        
        const connect = await mongoose.connect(process.env.DB_URL)
        if(connect){
            console.log("==== Database Connected Sucessfully ====");
        }

    } catch (error) {
        console.log(" Database Connection Error :-", error);
    }
}

module.exports = db_Connection