import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { userLogin, userRegister } from "../controllers/user.controller.js";

export const route = express.Router();

route.post("/register", userRegister);
route.post("/login", userLogin);