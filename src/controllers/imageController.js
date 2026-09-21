const prisma = require("../config/prisma");
const ApiError = require('../utils/ApiError');


// get all images
const getMyImages = async (req, res ,next) => {
    try {
        const images = await prisma.image.findMany({
            where: {
                userId: Number(req.user.id)
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            count: images.length,
            data: images
        });
    }
    catch (error) {
        next(error);
    }
};

// Upload image

const uploadImage = async (req, res,next) => {
    try {

        if (!req.file) {
            throw new ApiError(400, 'خطا در ذخیره تصویر');
        }
        const url = `/uploads/${req.file.filename}`;

        const image = await prisma.image.create({
            data: {
                url,
                userId: Number(req.user.id)
            }
        });

        res.json({
            success: true,
            data: image,
            message: 'تصویر با موفقیت آپلود شد'
        });
    }
    catch (error) {
        next(error);
    }
};

// delete image

const deleteImage = async (req, res ,next ) => {
    try {
        const id = Number(req.params.id);


        const image = await prisma.image.findUnique({
            where: { id }
        });


        await prisma.image.delete({
            where: { id }
        });

        res.json({
            success: true,
            count: image ? 1 : 0,
            data: image
        });
    }
    catch (error) {
        next(error);
    }
};


module.exports = {
    getMyImages,
    uploadImage,
    deleteImage
};