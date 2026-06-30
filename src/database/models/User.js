const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: [true, "El nickname es obligatorio"],
        trim: true,
        unique: true,
        minlength: [3, "El nickname debe tener al menos 3 caracteres"],
        maxlength: [30, "El nickname debe tener como máximo 30 caracteres"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        trim: true,
        minlenght: [8, "La contraseña debe tener al menos 3 caracteres"],
        maxlenght: [30, "La contraseña debe tener como máximo 30 caracteres"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: false,
        default: "",
        trim: true,
        maxlenght: [50, "La descripcion debe tener como máximo 30 caracteres"]
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: false,
    versionKey: false
})

module.exports = mongoose.model("User", userSchema);
