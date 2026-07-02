const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 3) {
                console.error("Redis inalcanzable. Continuando sin caché...");
                return false; // Detiene los reintentos y libera el servidor Express
            }
            return 2000; // Reintenta cada 2 segundos
        }
    }
});

redisClient.on("error", err => console.log("Redis Client Log:", err.message));
redisClient.on("connect", () => console.log("Conectado a Redis con éxito"));

// 2. Conectamos sin trabar el arranque general del backend
redisClient.connect().catch(err => console.error("Error inicial al conectar Redis: ", err.message));

module.exports = redisClient;
