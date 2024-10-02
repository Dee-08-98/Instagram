
const express = require('express')
const { register, login, edit, logout, profile, suggestedUser, follorUnfollow } = require('../Contrillers/user.controllers')
const auth = require('../Middleware/auth.middleware')
const upload = require('../Middleware/multer')

const route = express.Router()

route.post('/register', register)
route.post('/login', login)
route.get('/profile/:id', auth, profile)
route.post('/logout', auth, logout)
route.post('/edit', auth, upload.single("profilePicture") ,edit)
route.get('/suggestedUser', auth, suggestedUser)
route.post('/follorUnfollow/:id', auth, follorUnfollow)




module.exports = route