const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // lien vers User
  organizationName: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;
