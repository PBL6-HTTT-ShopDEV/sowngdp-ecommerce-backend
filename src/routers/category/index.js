"use strict";

const express = require("express");

const categoryController = require("../../controllers/category.controller");
const { asyncHandler } = require("../../auth/authUtils");

const router = express.Router();

router.get("/categories", asyncHandler(categoryController.getAllCategory));

router.get("/category/:id", asyncHandler(categoryController.getCategoryById));

router.post(
  "/categoriess",
  asyncHandler(categoryController.createMultipleCategory)
);

router.post("/category", asyncHandler(categoryController.createCategory));

router.put("/category", asyncHandler(categoryController.updateCategory)); // example: /category?categoryId=123

router.delete("/category", asyncHandler(categoryController.deleteCategory)); // example: /category?categoryId=123

module.exports = router;
