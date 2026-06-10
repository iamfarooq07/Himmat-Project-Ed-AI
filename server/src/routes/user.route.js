import express from "express";
import { User } from "../models/user.model";

const route = express.Router();

route.post("/register", async (req, res) => {
    try {
        const { userName, eamil, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(401).json({ message: "Please All Field Fill" })
        }

        const extraEmail = await User.findOne({ email });

        if (!extraEmail) {
            return res.status(400).json({ message: "Email Already Access" })
        };

        const user = await User.create({
            userName,
            eamil,
            password,
        })

        return res.status(201).json({ message: "Register Successfully", user })
    } catch (error) {
        res.status(500).json({ message: "Internet Error", error })
    }
})