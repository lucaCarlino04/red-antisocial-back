function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Error de validación", details });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "El valor ya existe en la base de datos" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID inválido" });
  }

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
