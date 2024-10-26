"use strict";

const categoryModel = require("../models/category.model");

class CategoryService {
  static async getAllCategory() {
    const categories = await categoryModel.find().lean();
    return categories;
  }

  static async getCategoryById(id) {
    const category = await categoryModel.findById(id).lean();
    return category;
  }

  static async createCategory(data) {
    console.log(data);
    const category = await categoryModel.create(data);
    if (!category) {
      throw new Error("Create category failed!");
    }
    return category;
  }

  static async createMultipleCategory(data) {
    const options = {
      ordered: true,
    };
    const categories = await categoryModel.insertMany(data, options);
    if (!categories) {
      throw new Error("Create multiple category failed!");
    }
    return categories;
  }

  static async updateCategory(id, data) {
    const category = await categoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return category;
  }

  static async deleteCategory(id) {
    const category = await categoryModel.findByIdAndDelete(id);
    return category;
  }
}

module.exports = CategoryService;
