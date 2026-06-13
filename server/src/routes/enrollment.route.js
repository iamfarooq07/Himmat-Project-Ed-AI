import express from "express";
import { enrollmentGet, enrollmentPost } from "../controllers/enrollment.controller.js";

export const enrollmentRoute = express.Router();

enrollmentRoute.get("/my", enrollmentGet);
enrollmentRoute.post("/:courseId", enrollmentPost);