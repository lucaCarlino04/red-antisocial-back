const User = require("../database/models/User");

async function create(data) {
  const existing = await User.findOne({ nickName: data.nickName });
  if (existing) {
    const err = new Error("El nickname ya está en uso");
    err.status = 409;
    throw err;
  }
  return await User.create(data);
}

async function list() {
  return await User.find();
}

async function getByNick(nickName) {
  const user = await User.findOne({ nickName });
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }
  return user;
}

async function update(nickName, data) {
  if (data.nickName) {
    const existing = await User.findOne({ nickName: data.nickName });
    if (existing && existing.nickName !== nickName) {
      const err = new Error("El nickname ya está en uso");
      err.status = 409;
      throw err;
    }
  }
  const user = await User.findOneAndUpdate({ nickName }, data, { new: true, runValidators: true });
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }
  return user;
}

async function remove(nickName) {
  const user = await User.findOneAndDelete({ nickName });
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }
  return user;
}

async function follow(nickFollower, nickFollowed) {
  if (nickFollower === nickFollowed) {
    const err = new Error("No puedes seguirte a ti mismo");
    err.status = 400;
    throw err;
  }

  const follower = await User.findOne({ nickName: nickFollower });
  if (!follower) {
    const err = new Error("Usuario seguidor no encontrado");
    err.status = 404;
    throw err;
  }

  const followed = await User.findOne({ nickName: nickFollowed });
  if (!followed) {
    const err = new Error("Usuario a seguir no encontrado");
    err.status = 404;
    throw err;
  }

  if (follower.following.includes(followed._id)) {
    const err = new Error("Ya sigues a este usuario");
    err.status = 400;
    throw err;
  }

  await User.findByIdAndUpdate(follower._id, { $push: { following: followed._id } });
  await User.findByIdAndUpdate(followed._id, { $push: { followers: follower._id } });

  return { message: `Ahora sigues a ${nickFollowed}` };
}

async function unfollow(nickFollower, nickFollowed) {
  const follower = await User.findOne({ nickName: nickFollower });
  if (!follower) {
    const err = new Error("Usuario seguidor no encontrado");
    err.status = 404;
    throw err;
  }

  const followed = await User.findOne({ nickName: nickFollowed });
  if (!followed) {
    const err = new Error("Usuario a dejar de seguir no encontrado");
    err.status = 404;
    throw err;
  }

  await User.findByIdAndUpdate(follower._id, { $pull: { following: followed._id } });
  await User.findByIdAndUpdate(followed._id, { $pull: { followers: follower._id } });

  return { message: `Has dejado de seguir a ${nickFollowed}` };
}

module.exports = { create, list, getByNick, update, remove, follow, unfollow };
