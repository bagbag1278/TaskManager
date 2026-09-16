const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'توکن ارائه نشده است');
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            throw new ApiError(401, 'کاربر پیدا نشد');
        }

        req.user = user;

        next();

    } catch (error) {
        next(new ApiError(401, 'توکن نامعتبر است'));
    }
};

module.exports = { authenticate };