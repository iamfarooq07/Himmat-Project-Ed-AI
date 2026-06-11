import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        progress: {
            type: Number,
            default: 0, // 0 to 100 percentage
        },
        completedLectures: [
            {
                type: mongoose.Schema.Types.ObjectId, // lecture ki _id
            },
        ],
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Ek student ek course mein sirf ek baar enroll ho
// enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
