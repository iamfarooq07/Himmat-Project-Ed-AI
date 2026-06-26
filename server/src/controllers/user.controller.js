import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { apiResponse } from "../middlewares/apiRespones.middleware.js";

const userRegister = async (req, res, next) => {
    try {
        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password) {
            return apiResponse(
                res,
                401,
                "Please All Field Fill"
            );
        };

        const extraEmail = await User.findOne({ email });

        if (extraEmail) {
            return apiResponse(
                res,
                400,
                "Email Already Access"
            );
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

        return apiResponse(res, 201, "Register Successfully", user, token)
    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return apiResponse(res, 401, "Please All Field Fill")
        }

        const user = await User.findOne({ email });

        if (!user) {
            return apiResponse(res, 400, "Your Email is Not Match")
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

        return apiResponse(res, 201, "Logged In Successfully", token)
    } catch (error) {
        next(error)
    }
}

export { userRegister, userLogin }