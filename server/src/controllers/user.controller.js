import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userRegister = async (req, res) => {

    try {
        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password) {
            return res.status(401).json({ message: "Please All Field Fill" })
        }

        const extraEmail = await User.findOne({ email });

        if (extraEmail) {
            return res.status(400).json({ message: "Email Already Access" })
        };

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName,
            email,
            role,
            password: hashPassword
        });

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        return res.status(201).json({ message: "Register Successfully", user, token })
    } catch (error) {
        res.status(500).json({ message: "Internet Error", error })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Please All Field Fill" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Your Email is Not Match" })
        };

        const checkPassword = await bcrypt.compare(password, user.password);

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        return res.status(201).json({ message: "Logged In Successfully", token })
    } catch (error) {
        res.status(500).json({ message: "Internet Error", error })
    }
}

export { userRegister, userLogin }