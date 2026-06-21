export const errorMiddleware = async (err, req, res, next) => {
    const statusCode = err.statusCode || 501;
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        message: message,
        success: true
    })
};