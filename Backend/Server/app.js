const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({extended : true})) 

const route = require('./Routes/route')

app.use('/api/instagram', route)


module.exports = app
