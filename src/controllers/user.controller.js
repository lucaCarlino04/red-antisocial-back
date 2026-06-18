const userService = require("../services/userService");

async function create(req, res, next) {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getByNick(req, res, next) {
  try {
    const user = await userService.getByNick(req.params.nickName);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const user = await userService.update(req.params.nickName, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await userService.remove(req.params.nickName);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function follow(req, res, next) {
  try {
    const result = await userService.follow(req.params.nickName, req.body.nickName);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function unfollow(req, res, next) {
  try {
    const result = await userService.unfollow(req.params.nickName, req.body.nickName);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getByNick, update, remove, follow, unfollow };
