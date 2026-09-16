const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');
const { param } = require('../routes/authRoutes');


// getAll

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            count: categories.length,
            data: categories
        });

    }
    catch (error) {
        next(error)
    }
}


//get by id

const getCategoryById = async (req, res, next) => {
    try {
        const id = Number(req.params.id)

        const catgory = await prisma.category.findUnique({
            where: { id },
            include: {
                products: true
            }
        });
        if (!catgory) {
            throw new ApiError(400, "دسته بندی پیدا نشد")
        }
        res.json({
            success: true,
            data: catgory
        });
    }
    catch (error) {
        next(error);
    }
}


// CreatCategory

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingCategory = await prisma.category.findUnique({
            where: { name }
        });

        if (existingCategory) {
            throw new ApiError(400, 'این دسته‌بندی قبلاً وجود دارد');
        }
        const category = await prisma.category.create({
            data: { name }
        });

        res.status(201).json({
            success: true,
            data: category,
            message: 'دسته‌بندی با موفقیت ایجاد شد'
        });

    } catch (error) {
        next(error);
    }
};

// updateCat

const updateCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const { name } = req.body;

        const existingCategory = await prisma.category.findUnique({
            where: { id }
        })
        if (!existingCategory) {
            throw new ApiError(404, 'دسته‌بندی پیدا نشد');
        }

        const category = await prisma.category.update({
            where: { id },
            data: { name }
        })

        res.json({
            success: true,
            data: category,
            message: 'بروز شد'
        })
    }

    catch (error) {
        next(error)
    }
}

// patchCategory

const patchCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const { name } = req.body;

        const categoris = await prisma.category.findUnique({
            where: { id }
        })
        if (!categoris) {
            throw new ApiError(404, 'دسته‌بندی پیدا نشد');
        }
        const updated = await prisma.category.update({
            where: { id },
            data: {
                name: name || undefined
            }
        });

        res.json({
            success: true,
            data: updated,
            message: 'دسته‌بندی بروزرسانی شد'
        });
    }

    catch (error) {
        next(error)
    }
}


//deleteCat

const deleteCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const category = await prisma.category.findUnique({
            where: { id }
        })

        if (!category) {
            throw new ApiError(404, "این دسته بندی از قبل وجود داره مشتی")
        }
        await prisma.category.delete({
            where: { id }
        })
        res.json({
            data: category,
            success: true,
            message: "delete shod"
        })
    }
    catch (error) {
        next(error)
    }
}



module.exports = { getCategoryById, getAllCategories, createCategory, deleteCategory, patchCategory, updateCategory }