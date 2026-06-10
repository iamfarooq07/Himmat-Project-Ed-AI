import mongoose from "mongoose";

export const dataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`DB Connected`);
    } catch (error) {
        console.error("Error", error);
        process.exit(1)
    }
}