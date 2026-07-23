const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {

    try {

        const { username, email, password, role } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password,
            role,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// Login User
const loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username,
            password,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Username or Password",
            });
        }

        res.json({
            message: "Login Successful",
            user,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    registerUser,
    loginUser,
};