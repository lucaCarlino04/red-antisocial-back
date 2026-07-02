// const {createClient} = require("redis");

// const redisClient = createClient({
//     url: process.env.REDIS_URL,
//     password: process.env.REDIS_PASSWORD
// });

// redisClient.on("error", err => console.log("Redis Client Error", err));
// redisClient.on("connect", () => console.log("Conectado a Redis"));

// redisClient.connect().catch(err => console.error("error al conectar Redis: ", err));

// module.exports = redisClient;