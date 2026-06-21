const Comment = require("../database/models/Comentario");
const Post = require("../database/models/Post");
const User = require("../database/models/User");
const config = require("../config/env")

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
  return await Comment.create(data);
}

async function list() {
  return await Comment.find().populate("user", "nickName").populate("post", "description");
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
  const meses = config.commentVisibilityMonths;
  const fechaLimite = new Date(Date.now() - meses * 30.44 * 24 * 60 * 60 * 1000);
  return await Comment.find({ post: postId, fechaPublicacion: { $gte: fechaLimite } })
  .populate("user", "nickName"); //$gte es un operador de mongo: "greater than or equal"
  /*Se podría filtrar por el atributo isVisible pero es menos eficiente ya que trae comentarios que luego se descartan.*/
}

module.exports = { create, list, getById, update, remove, listByPost };
