import jwt from 'jsonwebtoken';
import { apiResponse } from './apiRespones.middleware.js';

export const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return apiResponse(res, 401, 'No token provided, authorization denied');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        return apiResponse(res, 401, 'Token is not valid');
    }
};

