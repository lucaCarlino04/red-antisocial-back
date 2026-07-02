const express = require("express");
const path = require("path");
const connectDatabase = require("./database/connection");
const redisClient = require('./database/redis');
const config = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const tagRoutes = require("./routes/tag.routes");
const uploadRoutes = require("./routes/upload.routes");
const cors = require("cors");


connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use("/api/archivos", express.static(path.resolve(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({ message: "UnaHur Anti-Social Net API" });
});

app.use("/api/usuarios", userRoutes);
app.use("/api/publicaciones", postRoutes);
app.use("/api/comentarios", commentRoutes);
app.use("/api/etiquetas", tagRoutes);
app.use("/api/archivos", uploadRoutes);

// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("*any", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });


app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
