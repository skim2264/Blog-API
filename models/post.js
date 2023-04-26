const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {type: String, required: true},
  blog_text: {type: String, required: true},
  timestamp: {type: Date, required: true},
  author: {type: Schema.Types.ObjectId, ref: "User", required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  isPrivate: {type: Boolean, default: false}
});

module.exports = mongoose.model("Blog", BlogSchema);