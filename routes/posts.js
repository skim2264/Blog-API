var express = require('express');
var router = express.Router();

const postController = require("../controllers/postController");

//GET all posts
router.get('/', postController.all_posts_get);

//POST create post
router.post('/create', postController.post_create_post);

//GET single post 
router.get('/:postId', postController.post_get);

//PUT update post
router.put('/:postId', postController.post_update);

//DELETE post
router.delete('/:postId', postController.post_delete);

module.exports = router;