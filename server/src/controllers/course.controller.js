import { Course } from "../models/course.model.js";

const getCourse = async (req, res) => {
    try {
        const courses = await Course.find();

        if (courses.length === 0) {
            return res.status(404).json({
                message: "No courses found"
            });
        }

        res.status(200).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        if (!courseId) {
            return res.status(404).json({
                message: "No course Id found"
            });
        }

        const courses = await Course.findById(courseId);

        res.status(200).json({
            message: "Course fetched successfully",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const postCourse = async (req, res) => {
    try {
        const courseData = req.body;

        if (!courseData) {
            return res.status(404).json({
                message: "course Not found"
            });
        }

        const courses = await Course.create(courseData);

        res.status(200).json({
            message: "Course Create successfully",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const courseId = req.params.id;

        if (!courseData || !courseId) {
            return res.status(401).json({ message: "Not Found" })
        }

        const courses = await Course.findByIdAndUpdate(courseId, courseData, { new: true });

        if (!courses) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        if (!courseId) {
            return res.status(404).json({
                message: "course Not found"
            });
        };

        const courses = await Course.findByIdAndDelete(courseId);

        if (!courses) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course Deleted successfully",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export { getCourse, getCourseById, postCourse, updateCourse, deleteCourse }