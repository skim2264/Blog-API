const Post = require("../models/post");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.all_posts_get = asyncHandler(async(req, res) => {
  const posts = await Post.find({isPrivate:"false"}).sort({createdAt:-1}).populate("author").exec();
  if (posts === null) {
    return res.json("no posts");
  };
  return res.json(posts);
});

exports.post_create_post = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please enter a title"),
  body("post_text")
    .trim()
    .notEmpty()
    .withMessage("Please enter body text for the post"),
  body("image")
    .trim(),

  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      post_text: req.body.post_text,
      image: req.body.image,
      author: req.user,
      isPrivate: req.body.isPrivate
    })

    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      await post.save();
      return res.json(post);
    }
  })
]

exports.post_get = asyncHandler(async(req, res) => {
  const post = await Post.findById(req.params.postId).populate("author").populate({path:"comments", populate: {path:"author"}}).exec();
  return res.json(post);
});

exports.post_update = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please enter a title"),
  body("post_text")
    .trim()
    .notEmpty()
    .withMessage("Please enter a title"),
  body("image")
    .trim(),
    
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      await Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        post_text: req.body.post_text,
        image: req.body.image,
        isPrivate: req.body.isPrivate,
      });
      const newPost = await Post.findById(req.params.postId).populate("author").populate("comments").exec();
      return res.json(newPost);
    }
  })
];

exports.post_delete = asyncHandler(async(req, res, next) => {
  await Post.findByIdAndRemove(req.params.postId);
  res.json("Post deleted.");
})