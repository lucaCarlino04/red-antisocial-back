const mongoose = require("mongoose");
const connectDatabase = require("./connection");

const User = require("./models/User");
const Tag = require("./models/Tag");
const Post = require("./models/Post");
const Comment = require("./models/Comentario");

// -------------------- DATA --------------------

const usersData = [
  "pixelhunter",
  "codewizard",
  "neonbyte",
  "bugslayer",
  "devnoob",
  "matrixghost",
  "cloudrunner",
  "debuggingking",
  "syntheticmind",
  "bytefury"
];

const tagsData = [
  "tech",
  "gaming",
  "programming",
  "memes",
  "lifestyle"
];

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
  "jajaja totalmente",
  "me pasó lo mismo",
  "esto es demasiado real",
  "qué sufrimiento",
  "top",
  "no entendí pero me gustó",
  "literalmente yo",
  "esto es ilegal",
  "brutal",
  "xd"
];

// -------------------- INIT --------------------

const init = async () => {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Tag.deleteMany({}),
    Post.deleteMany({}),
    Comment.deleteMany({})
  ]);

  // -------------------- USERS --------------------
  const users = await User.insertMany(
    usersData.map((nickName) => ({
      nickName,
      followers: [],
      following: []
    }))
  );

  // -------------------- FOLLOWERS / FOLLOWING --------------------
  const getRandomUsers = (arr, index, count) => {
    return arr
      .filter((_, i) => i !== index)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const following = getRandomUsers(users, i, 3);

    user.following = following.map((u) => u._id);

    for (const f of following) {
      f.followers.push(user._id);
      await f.save();
    }

    await user.save();
  }

  // -------------------- TAGS --------------------
  const tags = await Tag.insertMany(
    tagsData.map((description) => ({ description }))
  );

  // -------------------- POSTS --------------------
  const posts = await Promise.all(
    postsData.map((post, index) => {
      const user = users[index % users.length];

      const postTags = [
        tags[index % tags.length]._id,
        tags[(index + 1) % tags.length]._id
      ];

      return Post.create({
        description: post.description,
        images: post.images,
        user: user._id,
        tags: postTags
      });
    })
  );

  // -------------------- COMMENTS --------------------
  await Promise.all(
    commentsData.map((text, index) => {
      return Comment.create({
        text,
        post: posts[index % posts.length]._id,
        user: users[index % users.length]._id,
        fechaPublicacion: new Date()
      });
    })
  );

  console.log("Seed completo listo");

  await mongoose.connection.close();
};

module.exports = init;

if (require.main === module) {
  init().then(() => process.exit(0));
}