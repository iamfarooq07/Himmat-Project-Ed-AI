export const apiResponse = (
    res,
    statusCode,
    message,
    data = null,
    token = null
) => {
    const responsePayload = {
        success: statusCode < 400,
        message,
        data,
    };

    if (token) {
        responsePayload.token = token;
    }

    res.status(statusCode).json(responsePayload);
};