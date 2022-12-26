const express = require('express');
const commentController = require('../controller/commentController');

//Comment API
const router = express.Router();

router.post('/', commentController.createComments);
router.get('/', commentController.getComments);
router.delete('/:id', commentController.deleteComments);
router.patch('/:id', commentController.updateComments);
router.post('/comments', commentController.addComments);

module.exports = router;
