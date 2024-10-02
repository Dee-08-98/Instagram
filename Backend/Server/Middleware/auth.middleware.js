const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    const token = req.cookies["instaCookie"]

    if (!token) {
        return res.status(401).json({
            message: "User not authenticated",
            sucess: true
        })
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY)

    if (!decoded) {
        return res.status(401).json({
            message: "User not authenticated",
            sucess: true
        })
    }

    req.id = decoded.userId
    next()

}

module.exports = auth