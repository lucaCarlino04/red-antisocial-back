const tagService = require("../services/tag.service");

async function create(req, res, next) {
  try {
    const tag = await tagService.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const tags = await tagService.list();
    res.json(tags);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const tag = await tagService.getById(req.params.id);
    res.json(tag);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const tag = await tagService.update(req.params.id, req.body);
    res.json(tag);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await tagService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };
