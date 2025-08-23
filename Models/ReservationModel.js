const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);
