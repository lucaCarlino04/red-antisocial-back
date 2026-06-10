const mongoose = require("mongoose");

async function conectarDB() {
  try {
    await mongoose.connect(
      "mongodb://admin:admin123@localhost:27017/redantisocial?authSource=admin"
    );

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
  }
}

conectarDB();