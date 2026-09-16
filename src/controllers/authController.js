const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )
}

let userResponse = (user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
})

// register

const register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ApiError(400, 'این ایمیل قبلا ثبت نام شده بودش')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
                role: 'USER'
            }
        });
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            data: { user: userResponse(user), token },
            message: 'ثبت‌نام با موفقیت انجام شد'
        });
    }
    catch (error) {
        next(error)
    }
}


// login

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "رمز و ایمیل اجباریه ")
        }
        const user = await prisma.user.findUnique({
            where: { email }
        })

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            throw new ApiError(401, 'ایمیل یا رمز عبور اشتباه است');
        }
        const token = generateToken(user)

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                token
            },
            message: 'ورود با موفقیت انجام شد'
        });
    }
    catch (error) {
        next(error)
    }
}

// updateProfile 
const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                name: name,
                email: email
            }
        });
        res.json({
            success: true,
            data: userResponse(updatedUser),
            message: 'پروفایل با موفقیت بروزرسانی شد'
        });
    }

    catch (error) {
        next(error)
    }

}

//get proflie
const getProfile = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            throw new ApiError(404, 'کاربر پیدا نشد');
        }

        res.json({
            success: true,
            data: userResponse(user),
            message: 'پروفایل با موفقیت دریافت شد'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getProfile,updateProfile }
