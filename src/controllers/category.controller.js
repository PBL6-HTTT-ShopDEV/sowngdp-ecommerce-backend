"use strict";

const categoryService = require("../services/category.service");
const { Success } = require("../core/success.response");

class CategoryController {
  static async getAllCategory(req, res, next) {
    const categories = await categoryService.getAllCategory();
    return new Success({
      message: "Get all category success!",
      metadata: categories,
    }).send(res);
  }

  static async getCategoryById(req, res, next) {
    const category = await categoryService.getCategoryById(req.params.id);
    return new Success({
      message: "Get category by id success!",
      metadata: category,
    }).send(res);
  }

  static async createCategory(req, res, next) {
    console.log(req.body);
    const category = await categoryService.createCategory(req.body);
    return new Success({
      message: "Create category success!",
      metadata: category,
    }).send(res);
  }

  static async createMultipleCategory(req, res, next) {
    const categories = await categoryService.createMultipleCategory(req.body);
    return new Success({
      message: "Create multiple category success!",
      metadata: categories,
    }).send(res);
  }

  static async updateCategory(req, res, next) {
    const { categoryId } = req.query;
    const category = await categoryService.updateCategory(
      categoryId,
      req.body
    );
    return new Success({
      message: "Update category success!",
      metadata: category,
    }).send(res);
  }

  static async deleteCategory(req, res, next) {
    const { categoryId } = req.query;
    const category = await categoryService.deleteCategory(categoryId);
    return new Success({
      message: "Delete category success!",
      metadata: category,
    }).send(res);
  }
}

module.exports = CategoryController;
