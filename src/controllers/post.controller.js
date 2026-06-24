const postService = require("../services/postService");

async function create(req, res, next) {
  try {
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const post = await postService.create({...req.body, images: imageUrls});
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const posts = await postService.list();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const post = await postService.getById(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const post = await postService.update(req.params.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await postService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function addImages(req, res, next) {
  try {
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const post = await postService.addImages(req.params.id, imageUrls);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function removeImages(req, res, next) {
  try {
    const post = await postService.removeImages(req.params.id, req.body.urls);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function addTags(req, res, next) {
  try {
    const post = await postService.addTags(req.params.id, req.body.tagIds);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function removeTags(req, res, next) {
  try {
    const post = await postService.removeTags(req.params.id, req.body.tagIds);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove, addImages, removeImages, addTags, removeTags };
