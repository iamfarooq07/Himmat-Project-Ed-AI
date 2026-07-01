import express from "express";
import { enrollmentGet, enrollmentPost, getMyStudents } from "../controllers/enrollment.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

export const enrollmentRoute = express.Router();

// Student routes
enrollmentRoute.get("/my", enrollmentGet);
enrollmentRoute.post("/:courseId", enrollmentPost);

// Instructor route — get all students in my courses
enrollmentRoute.get("/my-students", roleMiddleware, getMyStudents);
