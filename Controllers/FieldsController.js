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
module.exports.getFieldById = async (req, res) => {
    try {
        const { id } = req.params;
        const field = await Field.findById(id).populate("manager", "firstName lastName Email");
        if (!field) return res.status(404).json({ message: "Terrain non trouvé" });
        res.json(field);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un terrain
module.exports.updateField = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedField = await Field.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedField) return res.status(404).json({ message: "Terrain non trouvé" });
        res.json({ message: "Terrain mis à jour", field: updatedField });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un terrain
module.exports.deleteField = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedField = await Field.findByIdAndDelete(id);
        if (!deletedField) return res.status(404).json({ message: "Terrain non trouvé" });
        res.json({ message: "Terrain supprimé" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};