import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["student", "instructor"],
            default: "student",
        },
        // avatar: {
        //     type: String,
        //     default: "",
        // },
    },
    { timestamps: true }
);


export const User = mongoose.model("User", userSchema);
