const Tag = require("../database/models/Tag");

async function create(data) {
  const existing = await Tag.findOne({ description: data.description });
  if (existing) {
    const err = new Error("La etiqueta ya existe");
    err.status = 409;
    throw err;
  }
  return await Tag.create(data);
}

async function list() {
  return await Tag.find();
}

async function getById(id) {
  const tag = await Tag.findById(id);
  if (!tag) {
    const err = new Error("Etiqueta no encontrada");
    err.status = 404;
    throw err;
  }
  return tag;
}

async function update(id, data) {
  const tag = await Tag.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!tag) {
    const err = new Error("Etiqueta no encontrada");
    err.status = 404;
    throw err;
  }
  return tag;
}

async function remove(id) {
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    const err = new Error("Etiqueta no encontrada");
    err.status = 404;
    throw err;
  }
  return tag;
}

module.exports = { create, list, getById, update, remove };
