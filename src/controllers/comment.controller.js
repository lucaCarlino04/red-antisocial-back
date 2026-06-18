const commentService = require("../services/commentService");

async function create(req, res, next) {
  try {
    const comment = await commentService.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const comments = await commentService.list();
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const comment = await commentService.getById(req.params.id);
    res.json(comment);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const comment = await commentService.update(req.params.id, req.body);
    res.json(comment);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await commentService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function listByPost(req, res, next) {
  try {
    const comments = await commentService.listByPost(req.params.postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove, listByPost };
