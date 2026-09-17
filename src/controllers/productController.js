const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

// getAllproducte

const getAllProducts = async (req, res, next) => {
    try {
        const { search, categoryId, minPrice, maxPrice } = req.query;
        const where = {};

        if (categoryId) {
            where.categoryId = Number(categoryId);
        }

        if (search) {
            where.name = { contains: search };
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = Number(minPrice);
            if (maxPrice) where.price.lte = Number(maxPrice);
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: {
                    select: { id: true, name: true }
                }
            }
        });

        res.json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        next(error);
    }
};

// getProductById 

const getProductById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!product) {
            throw new ApiError(404, 'محصول پیدا نشد');
        }

        res.json({
            success: true,
            data: product
        });

    } catch (error) {
        next(error);
    }
};

// createProdut

const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, stock, categoryId } = req.body;

        const category = await prisma.category.findUnique({
            where: { id: Number(categoryId) }
        });

        if (!category) {
            throw new ApiError(404, 'دسته‌بندی پیدا نشد');
        }

        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await prisma.product.create({
            data: {
                name,
                description: description || null,
                price: Number(price),
                stock: Number(stock),
                image,
                categoryId: Number(categoryId)
            },
            include: { category: true }
        });

        res.status(201).json({
            success: true,
            data: product,
            message: 'محصول ایجاد شد'
        });

    } catch (error) {
        next(error);
    }
};

//updateProduct

const updateProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, price, description, stock, categoryId } = req.body;

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            throw new ApiError(404, 'محصول پیدا نشد');
        }

        const category = await prisma.category.findUnique({
            where: { id: Number(categoryId) }
        });

        if (!category) {
            throw new ApiError(404, 'دسته‌بندی پیدا نشد');
        }

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : existingProduct.image;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description: description || null,
                price: Number(price),
                stock: Number(stock),
                image,
                categoryId: Number(categoryId)
            },
            include: { category: true }
        });

        res.json({
            success: true,
            data: product,
            message: 'محصول بروزرسانی شد'
        });

    } catch (error) {
        next(error);
    }
};
// patchProduct
const patchProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, price, description, stock, categoryId } = req.body;

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            throw new ApiError(404, 'محصول پیدا نشد');
        }

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : existingProduct.image;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: name || undefined,
                description: description || undefined,
                price: price ? Number(price) : undefined,
                stock: stock ? Number(stock) : undefined,
                image,
                categoryId: categoryId ? Number(categoryId) : undefined
            },
            include: { category: true }
        });

        res.json({
            success: true,
            data: product,
            message: 'محصول بروزرسانی شد'
        });

    } catch (error) {
        next(error);
    }
};

// delete product

const deleteProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            throw new ApiError(404, 'محصول پیدا نشد');
        }

        await prisma.product.delete({
            where: { id }
        });

        res.json({
            success: true,
            message: `محصول "${product.name}" حذف شد`
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};