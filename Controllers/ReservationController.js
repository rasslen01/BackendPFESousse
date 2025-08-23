const Reservation = require('../models/ReservationModel');

// Créer une réservation
module.exports.createReservation = async (req, res) => {
    try {
        const { fieldId, date, time, duration } = req.body;

        // Vérifier que le terrain existe
        const field = await Field.findById(fieldId);
        if (!field) return res.status(404).json({ message: "Terrain non trouvé" });

        const reservation = new Reservation({
            field: fieldId,
            user: req.user.id,
            date,
            time,
            duration,
            status: "pending"
        });

        await reservation.save();
        res.status(201).json({ message: "Réservation créée", reservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Voir toutes les réservations (admin / gestionnaire)
module.exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("field")
            .populate("user", "firstName lastName Email");
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Voir mes réservations (utilisateur connecté)
module.exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id })
            .populate("field");
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Annuler une réservation
module.exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });

        if (reservation.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Non autorisé" });
        }

        reservation.status = "cancelled";
        await reservation.save();

        res.json({ message: "Réservation annulée", reservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
