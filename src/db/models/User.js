const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: [true, "El Nickname es obligatorio"],
        trim: true,
        unique: true,
        minlength: [3, "El Nickname debe tener al menos 3 caracteres"],
        maxlength: [30, "El Nickname debe tener como máximo 30 caracteres"]
    }
})