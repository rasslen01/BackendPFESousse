const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 🔥 ajout organisateur
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Match", MatchSchema);
