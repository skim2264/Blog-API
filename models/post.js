const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true},
  post_text: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: "User", required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  isPrivate: {type: Boolean, default: false}
},{timestamps: true});

module.exports = mongoose.model("Post", PostSchema);