import { Enrollment } from "../models/enrollment.model.js";

const enrollmentGet = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.find({ student: req.user._id });

        if (enrollment.length === 0) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.status(200).json({ message: "Enrollment fetched successfully", enrollment });
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

        if (alreadyEnrolled) return res.status(400).json({ message: "Pehle se enrolled ho" });

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: req.params.courseId
        });

    } catch (error) {
        next(error)
    }
};

export { enrollmentGet, enrollmentPost }