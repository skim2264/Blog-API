const Post = require("../models/post");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.all_posts_get = (req, res) => {
  Post.find({})
    .exec((err, posts) => {
      if (err) return res.json(err);
      return res.json(posts);
    });
}

exports.post_create = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please enter a title"),
  body("blog_text")
    .trim()
    .notEmpty()
    .withMessage("Please enter a title"),

  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      blog_text: req.body.blog_text,
      timestamp: new Date(),
      author: res.locals.currentUser,
      isPrivate: req.body.isPrivate
    })

    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      return res.json(post);
    }
  })
]

exports.post_get = (req, res) => {
  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) return res.json(err);
      return res.json(post);
    });
}

exports.post_update = asyncHandler(async(req, res, next) => {
  res.json();
})

exports.post_delete = asyncHandler(async(req, res, next) => {
  res.json();
})