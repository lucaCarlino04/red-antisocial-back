const path = require("path");
const fs = require("fs");

async function uploadImages(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No se envió ninguna imagen" });
  }
  const urls = req.files.map((file) => `/archivos/${file.filename}`);

  res.status(201).json({ message: "Imagen subida correctamente", urls });
}

async function deleteImageFromServer(req, res, next) {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "La imagen no existe" });
  }
  fs.unlinkSync(filePath);
  res.json({ message: "Imagen eliminada del servidor" });
}

module.exports = { uploadImages, deleteImageFromServer };
