import express from "express";
import { apiRoute } from "../controllers/groqApi.controller.js";

export const groqRoute = express.Router();

groqRoute.post('/ask-ai', apiRoute)