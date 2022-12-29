const express = require('express');
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.post('/', authController.protect, commentController.createComments);
router.get('/', commentController.getComments);
router.delete('/:id', commentController.deleteComments);
router.patch('/:id', commentController.updateComments);

module.exports = router;
