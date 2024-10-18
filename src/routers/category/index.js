'use strict';

const express = require('express');

const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.get('/categories', categoryController.getAllCategory);

router.get('/category/:id', categoryController.getCategoryById);

router.post('/category', categoryController.createCategory);

router.put('/category/:id', categoryController.updateCategory);

router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;