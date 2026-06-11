const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        minlength: [2, "La tag debe tener al menos 2 caracteres"],
        maxnlength: [10, "La tag debe tener como máximo 10 caracteres"],
        trim: true
    }
})