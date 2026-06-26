import { apiResponse } from "./apiRespones.middleware.js";


export const roleMiddleware = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.role !== "instructor") {
            return apiResponse(res, 404, "Access Denied. Instructor Only"
            );
        }

        next();

    } catch (error) {
        next(error)
    }
};