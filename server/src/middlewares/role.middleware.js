export const roleMiddleware = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.role !== "instructor") {
            return res.status(403).json({
                message: "Access Denied. Instructor Only"
            });
        }

        next();

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Instructor Middleware Error"
        });
    }
};