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
            default: 0,
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
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
