import { apiResponse } from "../middlewares/apiRespones.middleware.js";
import { Enrollment } from "../models/enrollment.model.js";

const enrollmentGet = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.find({ student: req.user._id });

        if (enrollment.length === 0) {
            return apiResponse(
                res,
                404,
                "Not Found"
            );
        }

        return apiResponse(
            res,
            200,
            "Enrollment fetched successfully",
            enrollment
        );
    } catch (error) {
        next(error)
    }
};

const enrollmentPost = async (req, res, next) => {
    try {
        const alreadyEnrolled = await Enrollment.findOne({
            student: req.user._id,
            course: req.params.courseId
        });

        if (alreadyEnrolled) {
            return apiResponse(
                res,
                400,
                "User Already Access"
            );
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: req.params.courseId
        });

        return apiResponse(
            res,
            201,
            "Enrollment Successfully",
            enrollment
        )

    } catch (error) {
        next(error)
    }
};

export { enrollmentGet, enrollmentPost }