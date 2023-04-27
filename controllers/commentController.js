const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.comments_get = (req, res) => {
  Post.findById(params.postId)
    .populate("comments")
    .exec((err, comments) => {
      if (err) return res.json(err);
      return res.json(comments);
    });
}

exports.comment_create = asyncHandler(async(req, res, next) => {
  res.send();
})

exports.comment_update = asyncHandler(async(req, res, next) => {
  res.send();
})

exports.comment_delete = asyncHandler(async(req, res, next) => {
  res.send();
})