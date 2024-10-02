const db_Connection = require("./DB_Con/db");
const app = require("./app");

const dotenv = require('dotenv')
dotenv.config({})


db_Connection()

const port =  process.env.PORT 

app.listen(port , ()=>{
    console.log('Server Running on Port :- ', port);
}) 