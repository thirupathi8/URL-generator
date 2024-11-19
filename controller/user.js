import User from "../models/user.js"
import jwt from "jsonwebtoken"

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        await User.create({
            name,
            email,
            password,
        })

        return res.status(200).send("Signup Successful")

    } catch (error) {
        console.error("Error during signup:", error)
        return res.status(500).send("An error occurred during signup.")
    }
}

const handleUserLogin = async (req, res) => {
    const secretKey = "VerySecureKey"
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
        const token = jwt.sign({ userId: user._id }, secretKey)
        return res.status(200).json({message: "Login Successful", token})


    } catch (error) {
        console.error("Error during login:", error)
        return res.status(500).send("An error occurred during login.")
    }
}

export { handleUserSignup, handleUserLogin }