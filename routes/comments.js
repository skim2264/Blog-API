var express = require('express');
var router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");

//GET all comments of post
router.get('/', commentController.comments_get);

//POST create comment
router.post('/create', commentController.comment_create_post);

//PUT update comment
router.put('/:commentId', commentController.comment_update);

//DELETE comment
router.delete('/:commentId', commentController.comment_delete);

module.exports = router;