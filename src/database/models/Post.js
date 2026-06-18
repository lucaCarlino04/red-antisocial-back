const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "La descripción no puede estar vacía"],
        trim: true,
        minlength: [5, "La descripción debe tener al menos 5 caracteres"],
        maxlength: [500, "La descripción debe tener como máximo 500 caracteres"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    images: [String]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

module.exports = mongoose.model("Post", postSchema);
