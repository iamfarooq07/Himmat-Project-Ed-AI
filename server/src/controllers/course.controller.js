import { Course } from "../models/course.model.js";
import { apiResponse } from "../middlewares/apiRespones.middleware.js";

// Get All Courses
const getCourse = async (req, res, next) => {
    try {
        const courses = await Course.find();

        return apiResponse(
            res,
            200,
            "Courses fetched successfully",
            {
                count: courses.length,
                courses,
            }
        );
    } catch (error) {
        next(error);
    }
};

// Get Course By ID
const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return apiResponse(
                res,
                404,
                "Course not found"
            );
        }

        return apiResponse(
            res,
            200,
            "Course fetched successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

// Create Course
const postCourse = async (req, res, next) => {
    try {
        const courseData = req.body;

        if (!courseData || Object.keys(courseData).length === 0) {
            return apiResponse(
                res,
                400,
                "Course data is required"
            );
        }

        const course = await Course.create(courseData);

        return apiResponse(
            res,
            201,
            "Course created successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

// Update Course
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseData = req.body;

        if (!courseData || Object.keys(courseData).length === 0) {
            return apiResponse(
                res,
                400,
                "Update data is required"
            );
        }

        const course = await Course.findByIdAndUpdate(
            id,
            courseData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!course) {
            return apiResponse(
                res,
                404,
                "Course not found"
            );
        }

        return apiResponse(
            res,
            200,
            "Course updated successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

// Delete Course
const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return apiResponse(
                res,
                404,
                "Course not found"
            );
        }

        return apiResponse(
            res,
            200,
            "Course deleted successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

export {
    getCourse,
    getCourseById,
    postCourse,
    updateCourse,
    deleteCourse
}