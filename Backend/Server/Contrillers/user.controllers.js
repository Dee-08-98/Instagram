const User = require("../Models/user.models")
const getDataUri = require("../Utils/datauri")
const genToken = require("../Utils/generateToken")
const cloudinary = require('../Utils/cloudinary')

const register = async (req, res) => {
    try {

        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            })
        }

        const userPresent = await User.findOne({ email })

        if (userPresent) {
            return res.status(400).json({
                message: "User Already registered ! please use another email",
                sucess: false
            })
        }

        const result = await User.create({
            userName, email, password
        })
        // console.log(result);

        return res.status(200).json({
            message: "Registration Sucessfull",
            sucess: true,
            // result : result
        })

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-",error:error.message })

    }
}


const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            })
        }

        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(400).json({
                message: "Incorrect email or password",
                sucess: false
            })
        }

        const passwordMatch = await findUser.comparePassword(password)

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                sucess: false
            })
        }

        const payload = findUser._id
        const token = await genToken(payload)
        // console.log(token);

        const options = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Strict"
        }

        const userDetails = {
            _id: findUser._id,
            userName: findUser.userName,
            email: findUser.email,
            profilePicture: findUser.profilePicture,
            bio: findUser.bio,
            gender: findUser.gender,
            followers: findUser.followers,
            following: findUser.following,
            post: findUser.post
        }

        return res.status(200).cookie("instaCookie", token, options).json({
            message: `Welcome back ${findUser.userName}`,
            sucess: true,
            token: token,
            user: userDetails
        })

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-", error : error.message })

    }
}


const logout = async (req, res) => {
    try {

        const options = {
            maxAge: 0,
            httpOnly: true,
            sameSite: "Strict"
        }

        return res.status(200).clearCookie("instaCookie", options).json({
            message: `Logout Sucessfully`,
            sucess: true,
        })

    } catch (error) {

        res.status(500).json({ "msg": "Internal Server Error :-", error })

    }
}


const profile = async (req, res) => {
    try {

        const userId = req.params.id
        // console.log(userId);

        const user = await User.findById(userId)
        return res.status(200).json({
            user,
            sucess: true,
        })

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-", error })

    }
}


const edit = async (req, res) => {
    try {

        const userId = req.id

        const { bio, gender } = req.body
        const profilePicture = req.files
        console.log(profilePicture)

        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture)
            cloudResponse = await cloudinary.uploader.upload(fileUri)
        }
        console.log(fileUri);
        console.log(cloudResponse);



        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                sucess: false,
            })
        }

        const data = new User({
            bio: bio ? bio : "",
            gender: gender ? gender : "",
            profilePicture: profilePicture ? cloudResponse.secure_url : ""
        })

        const result = await data.save
        return res.status(200).json({
            message: "Profile Updation Sucessfull",
            sucess: true,
            result
        })


    } catch (error) {

        res.status(500).json({ "msg": "Internal Server Error :-", error:error.message })

    }
}


const suggestedUser = async (req, res) => {

    try {

        const suggestedUser = await User.find({ _id: { $ne: req.id } }).select("-password")

        if (!suggestedUser) {
            return res.status(400).json({ message: "Currently not any user available", sucess: false })
        }

        return res.status(200).json({ user: suggestedUser, sucess: false })

    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error :-", error })
    }

}



const follorUnfollow = async (req, res) => {

    try {

        const followKarneWala = req.id
        const jiskoFollowKarunga = req.params.id

        if (followKarneWala === jiskoFollowKarunga) {
            return res.status(400).json({ message: "You can't follow/unfollow yourself", sucess: false })
        }

        const user = await User.findById(followKarneWala)
        const targetUser = await User.findById(jiskoFollowKarunga)


        if (!user || !targetUser) {
            return res.status(400).json({ message: "User not found", sucess: false })
        }


        //  to check for follow or unfollow

        const isFollowing = user.following.includes(jiskoFollowKarunga)

        if (isFollowing) {

            // unfollow logic

            await Promise.all([
                User.updateOne({ _id: followKarneWala }, { $pull: { following: jiskoFollowKarunga } }),
                User.updateOne({ _id: jiskoFollowKarunga }, { $pull: { followers: followKarneWala } })
            ])

            return res.status(200).json({ message: "Unfollow Sucessfully", sucess: true })

        }

        else {

            // follow logic

            await Promise.all([
                User.updateOne({ _id: followKarneWala }, { $push: { following: jiskoFollowKarunga } }),
                User.updateOne({ _id: jiskoFollowKarunga }, { $push: { followers: followKarneWala } })
            ])

            return res.status(200).json({ message: "Follow Sucessfully", sucess: true })
        }


    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error :-", error })
    }

}



module.exports = { register, login, profile, logout, edit, suggestedUser, follorUnfollow }