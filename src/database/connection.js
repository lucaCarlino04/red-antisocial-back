const mongoose = require("mongoose");
const config = require("../config/env");

async function connectDatabase() {
  let uri = config.mongoUri;
  let inMemory = false;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado en:", uri);
  } catch {
    console.warn("MongoDB no disponible en", uri);
    console.log("Iniciando MongoDB en memoria...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create({
      instance: { dbName: "redantisocial" },
    });
    uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log("MongoDB en memoria conectado en:", uri);
    inMemory = true;
  }

  if (inMemory) {
    const User = require("./models/User");
    const Tag = require("./models/Tag");
    const Post = require("./models/Post");
    const Comment = require("./models/Comentario");

    const usersData = [
      "pixelhunter", "codewizard", "neonbyte", "bugslayer", "devnoob",
      "matrixghost", "cloudrunner", "debuggingking", "syntheticmind", "bytefury"
    ];

    const tagsData = ["tech", "gaming", "programming", "memes", "lifestyle"];

    const postsData = [
      { description: "Aprendí React en una semana y ahora todo es un componente", images: [] },
      { description: "Este bug me hizo cuestionar mi carrera", images: ["https://pbs.twimg.com/media/D5tgy4cWsAMk3kf?format=png&name=small"] },
      { description: "Setup nuevo de dev 🚀", images: ["https://www.webpagedesign.ie/wp-content/uploads/2024/01/Linux-Linux-Torvalds.webp"] },
      { description: "Nunca confíes en console.log en producción", images: [] },
      { description: "Hoy programé sin Google", images: ["https://preview.redd.it/woman-breaking-chains-meme-but-the-chain-is-unbroken-v0-6xuoed8li8ge1.jpeg?auto=webp&s=f721f956a1cfce490008eeab95ff1bcc866985a3"] },
      { description: "undefined is not a function… yo tampoco sé qué pasó", images: [] },
      { description: "Mi primer API en Node 💀", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/250px-Cat_November_2010-1a.jpg"] },
      { description: "CSS es magia negra", images: [] },
      { description: "Estoy a un bug de renunciar", images: ["https://static.nationalgeographicla.com/files/styles/image_3200/public/75552.webp?w=1600&h=900"] },
      { description: "Entendí closures… creo", images: [] }
    ];

    const commentsData = [
      "jajaja totalmente", "me pasó lo mismo", "esto es demasiado real",
      "qué sufrimiento", "top", "no entendí pero me gustó",
      "literalmente yo", "esto es ilegal", "brutal", "xd"
    ];

    const users = await User.insertMany(usersData.map(n => ({ nickName: n })));
    const tags = await Tag.insertMany(tagsData.map(d => ({ description: d })));

    for (let i = 0; i < users.length; i++) {
      const following = users.filter((_, j) => j !== i).sort(() => 0.5 - Math.random()).slice(0, 3);
      users[i].following = following.map(u => u._id);
      for (const f of following) f.followers.push(users[i]._id);
      await users[i].save();
      for (const f of following) await f.save();
    }

    await Promise.all(postsData.map((p, i) =>
      Post.create({
        description: p.description,
        images: p.images,
        user: users[i % users.length]._id,
        tags: [tags[i % tags.length]._id, tags[(i + 1) % tags.length]._id]
      })
    ));

    const posts = await Post.find();
    await Promise.all(commentsData.map((text, i) =>
      Comment.create({ text, post: posts[i % posts.length]._id, user: users[i % users.length]._id, fechaPublicacion: new Date() })
    ));

    console.log("Base de datos en memoria inicializada con datos de prueba");
  }
}

module.exports = connectDatabase;
