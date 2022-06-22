const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');

router.get('/', categoryController.getCategories);