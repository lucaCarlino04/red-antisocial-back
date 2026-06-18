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
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);
