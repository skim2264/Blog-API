const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.comments_get = asyncHandler(async(req, res) => {
  const post = await Post.findById(req.params.postId).populate("comments").exec();
  const comments = post.comments;
  if (comments === null) {
    return res.json("no comments");
  }
  return res.json(comments);
});

exports.comment_create_post = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Please enter a comment"),
  
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const post = await Post.findById(req.params.postId).populate("comments").exec();

    const comment = new Comment({
      text: req.body.text,
      author: req.user,
      timestamp: new Date()
    });

    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      post.comments.push(comment);
      await comment.save();
      await post.save();
      return res.json(comment);
    }
})];

exports.comment_update = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Please enter a message"),
  
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      await Comment.findByIdAndUpdate(req.params.commentId, {
        text: req.body.text,
        timestamp: new Date()
      });
      const newComment = await Comment.findById(req.params.commentId);
      return res.json(newComment);
    }
  })
];

exports.comment_delete = asyncHandler(async(req, res, next) => {
  await Comment.findByIdAndRemove(req.params.commentId);
  res.json("comment deleted!");
})