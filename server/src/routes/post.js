const express = require('express');
const router = express.Router();
const postController = require('../controller/PostController');

router.get('/:id', postController.getPost);
router.post('/store', postController.store);
router.put('/', postController.edit);
router.delete('/:id', postController.delete);

module.exports = router;
