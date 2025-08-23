const Field = require('../Models/FieldsModel');
const Reservation = require('../models/ReservationModel');

// Ajouter un terrain (gestionnaire ou admin)
module.exports.addManagedField = async (req, res) => {
    try {
        const { name, location, pricePerHour } = req.body;
        const field = new Field({
            name,
            location,
            pricePerHour,
            manager: req.user.id
        });
        await field.save();
        res.status(201).json({ message: "Terrain ajouté par gestionnaire", field });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Voir ses propres terrains
module.exports.getMyFields = async (req, res) => {
    try {
        const fields = await Field.find({ manager: req.user.id });
        res.json(fields);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Voir les réservations sur ses terrains
module.exports.getFieldReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("field")
            .populate("user", "firstName lastName Email");

        const myReservations = reservations.filter(r => r.field.manager.toString() === req.user.id);

        res.json(myReservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
