const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
    name: String,
    location: String,
    pricePerHour: Number,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // 🔥 ajout gestionnaire
}, { timestamps: true });

module.exports = mongoose.model("Field", FieldSchema);
