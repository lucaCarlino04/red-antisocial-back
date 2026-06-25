const Post = require("../database/models/Post");
const User = require("../database/models/User");
const Tag = require("../database/models/Tag");
const redisClient = require("../database/redis");
const TTL = Number(process.env.CACHE_TTL_SEGUNDOS ?? 500);

async function create(data) {
  const user = await User.findById(data.user);
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  if (data.tags) {
    const tag = await Tag.findById(data.tags);
    if (!tag) {
      const err = new Error("Tag no encontrado");
      err.status = 404;
      throw err;
    }
  }

  return await Post.create(data);
}
async function list() {
  const posts = await Post.find().populate("user", "nickName").populate("tags", "description");
  // await redisClient.set(JSON.stringify(posts), {EX: TTL});
  return posts;
}

async function getById(id) {
  const post = await Post.findById(id).populate("user", "nickName").populate("tags", "description");
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }

  await redisClient.set(id, JSON.stringify(post), {EX: TTL});
  console.log("Dato añadido al cache");
  return post;
}

async function update(id, data) {
  const post = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

async function remove(id) {
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

async function addImages(id, urls) {
  const post = await Post.findByIdAndUpdate(id, { $push: { images: { $each: urls } } }, { new: true });
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

async function removeImages(id, urls) {
  const post = await Post.findByIdAndUpdate(id, { $pullAll: { images: urls } }, { new: true });
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

async function addTags(id, tagIds) {
  const post = await Post.findByIdAndUpdate(id, { $addToSet: { tags: { $each: tagIds } } }, { new: true }).populate("tags", "description");
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

async function removeTags(id, tagIds) {
  const post = await Post.findByIdAndUpdate(id, { $pullAll: { tags: tagIds } }, { new: true }).populate("tags", "description");
  if (!post) {
    const err = new Error("Publicación no encontrada");
    err.status = 404;
    throw err;
  }
  return post;
}

module.exports = { create, list, getById, update, remove, addImages, removeImages, addTags, removeTags };
