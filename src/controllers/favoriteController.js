const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

// getAll
const getMyFavorites = async (req, res, next) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.user.id },
            include: {
                product: {
                    include: {
                        category: {
                            select: { id: true, name: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            count: favorites.length,
            data: favorites
        });

    } catch (error) {
        next(error);
    }
};

// ADD 

const addToFavorites = async (req, res, next) => {
    try {
        const { productId } = req.body;

        const product = await prisma.product.findUnique({
            where: { id: Number(productId) }
        });

        if (!product) {
            throw new ApiError(404, 'محصول پیدا نشد');
        }

        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId: Number(productId)
                }
            }
        });

        if (existingFavorite) {
            throw new ApiError(400, 'این محصول قبلاً به علاقه‌مندی‌ها اضافه شده');
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.user.id,
                productId: Number(productId)
            },
            include: {
                product: true
            }
        });

        res.status(201).json({
            success: true,
            data: favorite,
            message: 'به علاقه‌مندی‌ها اضافه شد'
        });

    } catch (error) {
        next(error);
    }
};

// delete 

const removeFromFavorites = async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);

        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId
                }
            }
        });

        if (!favorite) {
            throw new ApiError(404, 'این محصول توی علاقه‌مندی‌های شما نیست');
        }

        await prisma.favorite.delete({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId
                }
            }
        });

        res.json({
            success: true,
            message: 'از علاقه‌مندی‌ها حذف شد'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyFavorites,
    addToFavorites,
    removeFromFavorites
};