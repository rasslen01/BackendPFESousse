const Field = require('../Models/FieldsModel');

module.exports.addField = async (req, res) => {
    try {
        const { name, location, pricePerHour } = req.body;
        const field = new Field({ name, location, pricePerHour });
        await field.save();
        res.status(201).json({ message: "Terrain ajouté", field });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.getAllFields = async (req, res) => {
    try {
        const fields = await Field.find();
        res.json(fields);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
