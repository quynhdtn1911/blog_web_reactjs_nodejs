const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/:id', userController.getUser);
router.put('/:id/change-password', userController.changePassword);
router.put('/:id', userController.edit);

module.exports = router;