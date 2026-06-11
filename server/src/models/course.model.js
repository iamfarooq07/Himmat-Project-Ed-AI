import mongoose from "mongoose"

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    duration: { type: Number, default: 0 },
});

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        thumbnail: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            enum: ["Programming", "Design", "Business", "Marketing", "Other"],
            default: "Other",
        },
        price: {
            type: Number,
            default: 0,
        },

        lectures: [lectureSchema],

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);