const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }}, {timestamps: {
        createdAt: 'fechaPublicacion',
        updatedAt: false
  }}
)

// Asi se ponen los atributos calculados, debajo del esquema principal
comentarioSchema.virtual("esVisible").get(function () {
    return this.fechaPublicacion > new Date(Date.now() - 182.5 * 24 * 60 * 60 * 1000);// Resta 6 meses (182.5 dias, ese valor se puede cambiar)  en milisegundos a la fecha de hoy
     // Otros ejemplos:
        // 5 * 1000                5 segundos
        // 30 * 1000               30 segundos
        // 2 * 60 * 1000           2 minutos
        // 15 * 60 * 1000          15 minutos
        // 2 * 60 * 60 * 1000      2 horas
        // 7 * 24 * 60 * 60 * 1000 7 días
})

// configuracion para que aparezcan los virtuals cuando se devuelva un json
comentarioSchema.set('toJSON', { virtuals: true });
comentarioSchema.set('toObject', { virtuals: true });