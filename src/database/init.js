const mongoose = require("mongoose");
const connectDatabase = require("./connection");
const User = require("./models/User");
const Tag = require("./models/Tag");
const Post = require("./models/Post");
const Comment = require("./models/Comentario");

const init = async () => {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Tag.deleteMany({}),
    Post.deleteMany({}),
    Comment.deleteMany({})
  ]);

  const [user1, user2] = await Promise.all([
    User.create({ nickName: "Usuario1" }),
    User.create({ nickName: "Usuario2" })
  ]);

  const tag1 = await Tag.create({ description: "Tag1" });

  const post1 = await Post.create({
    description: "Post 1 de prueba",
    user: user1._id,
    tags: [tag1._id]
  });

  const comentario1 = await Comment.create({
    text: "Comentario 1 de prueba",
    post: post1._id,
    user: user1._id
  });

  const ochoMesesAtras = new Date();
  ochoMesesAtras.setMonth(ochoMesesAtras.getMonth() - 8);

  const comentario2 = await Comment.create({
    text: "Comentario viejo, no debería aparecer en listByPost",
    post: post1._id,
    user: user2._id,
    fechaPublicacion: ochoMesesAtras
  });

  console.log("Base de datos sincronizada correctamente.");
  console.log({
    user1: user1._id.toString(),
    user2: user2._id.toString(),
    post1: post1._id.toString(),
    tag1: tag1._id.toString()
  });

  await mongoose.connection.close();
};

module.exports = init;

if (require.main === module) {
  init().then(() => process.exit(0));
}