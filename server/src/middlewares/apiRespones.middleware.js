export const apiRespones = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({ message, data, success: statusCode < 400, })
}