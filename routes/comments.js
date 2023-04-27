var express = require('express');
var router = express.Router();
const commentController = require("../controllers/commentController");

//GET all comments of post
router.get('/', commentController.comments_get);

//POST create comment
router.get('/create', commentController.comment_create);

//PUT update comment
router.put('/:commentId', commentController.comment_update);

//DELETE comment
router.delete('/:commentId', commentController.comment_delete);

module.exports = router;