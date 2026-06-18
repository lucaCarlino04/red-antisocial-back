const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "La descripción de la etiqueta es obligatoria"],
        minlength: [2, "La etiqueta debe tener al menos 2 caracteres"],
        maxlength: [20, "La etiqueta debe tener como máximo 20 caracteres"],
        trim: true,
        unique: true
    }
})

module.exports = mongoose.model("Tag", tagSchema);
