import express from "express";
import {
    deleteCourse,
    getCourse,
    getCourseById,
    postCourse,
    updateCourse
} from "../controllers/course.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

export const courseRoute = express.Router();

courseRoute.get("/", getCourse);
courseRoute.get("/:id", getCourseById);
courseRoute.post("/", roleMiddleware, postCourse);
courseRoute.put("/:id", roleMiddleware, updateCourse);
courseRoute.delete("/:id", roleMiddleware, deleteCourse)