const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "El texto del comentario es obligatorio"],
    trim: true,
    minlength: [1, "El comentario no puede estar vacío"],
    maxlength: [300, "El comentario debe tener como máximo 300 caracteres"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
}, {
  timestamps: true
});

commentSchema.virtual("isVisible").get(function () {
  const months = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
  const ms = months * 30.44 * 24 * 60 * 60 * 1000;
  return this.createdAt > new Date(Date.now() - ms);
});

commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Comment", commentSchema);
