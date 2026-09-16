const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory, deleteCategory, patchCategory, updateCategory } = require('../controllers/catgoryController');
const {createCategoryValidator , updateCategoryValidator , patchCategoryValidator , idValidator} = require("../validators/categoryValidator");
router.get("/", getAllCategories)
router.get("/:id",idValidator, getCategoryById,)
router.post("/", createCategoryValidator,createCategory, )
router.delete("/:id", deleteCategory)
router.patch("/:id",patchCategoryValidator, patchCategory,)
router.put("/:id",updateCategoryValidator, updateCategory,)


module.exports = router;