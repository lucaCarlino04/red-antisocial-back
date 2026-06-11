const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, "La descripción no puede estar vacía"],
        trim: true,
        minlength: [5, "La descripción debe tener al menos 5 caracteres"],
        maxlength: [100, "La descripción debe tener como máximo 100 caracteres"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // Asi se define una relacion N:N. Un array de ObjectIds en uno de los dos lados
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
       // Otra manera de declarar las imagenes, sin definirles una entidad o coleccion en el caso de Mongo.
       // Esto es una relacion embebida.
    post_images: [String]
}, {
    timestamps: {
    createdAt: 'fechaPublicacion',
    updatedAt: false
    }
})