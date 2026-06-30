const Comment = require("../database/models/Comentario");
const Post = require("../database/models/Post");
const User = require("../database/models/User");
const config = require("../config/env");

async function create(data) {
  const user = await User.findById(data.user);
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }
  const post = await Post.findById(data.post);
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }

<<<<<<< HEAD
  const newComment = await Comment.create(data);
  // post.comments.push(newComment._id);
  // await post.save();
  return newComment;
=======
  return await Comment.create(data);
>>>>>>> 7ea6718d8cf50434f0e67c7ebe2cb1c56e3aa151
}

async function list() {
  const meses = config.commentVisibilityMonths;
  const limite = new Date();
  limite.setMonth(limite.getMonth() - meses);
  return await Comment.find({ fechaPublicacion: { $gte: limite } }).populate("user", "nickName").populate("post", "description");
}

async function getById(id) {
  const comment = await Comment.findById(id).populate("user", "nickName").populate("post", "description");
  if (!comment) {
    const err = new Error("Comentario no encontrado");
    err.status = 404;
    throw err;
  }
  return comment;
}

async function update(id, data) {
  const comment = await Comment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!comment) {
    const err = new Error("Comentario no encontrado");
    err.status = 404;
    throw err;
  }
  return comment;
}

async function remove(id) {
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    const err = new Error("Comentario no encontrado");
    err.status = 404;
    throw err;
  }
  return comment;
}

async function listByPost(postId) {
<<<<<<< HEAD
  return await Comment.find({ post: postId }).populate("user", "nickName")
  .sort({fechaPublicacion: -1});
=======
  const meses = config.commentVisibilityMonths;
  const limite = new Date();
  limite.setMonth(limite.getMonth() - meses);
  return await Comment.find({ post: postId, fechaPublicacion: { $gte: limite } }).populate("user", "nickName");
>>>>>>> 7ea6718d8cf50434f0e67c7ebe2cb1c56e3aa151
}

module.exports = { create, list, getById, update, remove, listByPost };
