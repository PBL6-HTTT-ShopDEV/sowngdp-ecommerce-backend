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

router.put("/category/:id", asyncHandler(categoryController.updateCategory));

router.delete("/category/:id", asyncHandler(categoryController.deleteCategory));

module.exports = router;
