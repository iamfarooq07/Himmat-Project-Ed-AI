import { apiResponse } from "../middlewares/apiRespones.middleware.js";
import { Enrollment } from "../models/enrollment.model.js";
import { Course } from "../models/course.model.js";

// Student: get my enrollments
const enrollmentGet = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user._id })
            .populate("course", "title description category price lectures");

        return apiResponse(res, 200, "Enrollments fetched successfully", enrollments);
    } catch (error) {
        next(error);
    }
};

// Student: enroll in a course
const enrollmentPost = async (req, res, next) => {
    try {
        const alreadyEnrolled = await Enrollment.findOne({
            student: req.user._id,
            course: req.params.courseId
        });

        if (alreadyEnrolled) {
            return apiResponse(res, 400, "You are already enrolled in this course.");
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: req.params.courseId
        });

        const populated = await enrollment.populate("course", "title category price");

        return apiResponse(res, 201, "Enrolled successfully!", populated);
    } catch (error) {
        next(error);
    }
};

// Instructor: get all students enrolled in my courses
const getMyStudents = async (req, res, next) => {
    try {
        // Find all courses created by this instructor
        const myCourses = await Course.find({ instructor: req.user._id }, "_id title");

        if (myCourses.length === 0) {
            return apiResponse(res, 200, "No courses found", { students: [], total: 0 });
        }

        const courseIds = myCourses.map(c => c._id);

        // Find all enrollments for these courses
        const enrollments = await Enrollment.find({ course: { $in: courseIds } })
            .populate("student", "userName email role createdAt")
            .populate("course", "title category");

        // Build a clean student list with course info
        const students = enrollments.map(e => ({
            enrollmentId: e._id,
            enrolledAt: e.enrolledAt,
            student: e.student,
            course: e.course,
            progress: e.progress,
        }));

        return apiResponse(res, 200, "Students fetched successfully", {
            total: students.length,
            students,
        });
    } catch (error) {
        next(error);
    }
};

export { enrollmentGet, enrollmentPost, getMyStudents };
