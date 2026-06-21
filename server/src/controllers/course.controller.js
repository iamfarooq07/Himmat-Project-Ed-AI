import { Course } from "../models/course.model.js";

// Get All Courses
const getCourse = async (req, res, next) => {
    try {
        const courses = await Course.find();

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
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
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        next(error);
    }
};

// Create Course
const postCourse = async (req, res, next) => {
    try {
        const courseData = req.body;

        if (Object.keys(courseData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Course data is required",
            });
        }

        const course = await Course.create(courseData);

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        next(error);
    }
};

// Update Course
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseData = req.body;

        if (Object.keys(courseData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Update data is required",
            });
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
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course,
        });
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
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            course,
        });
    } catch (error) {
        next(error);
    }
};

export {
    getCourse,
    getCourseById,
    postCourse,
    updateCourse,
    deleteCourse,
};