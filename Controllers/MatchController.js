const Match = require('../Models/MatchModel');
module.exports.createMatch = async (req, res) => {
    try {
        const { fieldId, date, time } = req.body;
        const match = new Match({ field: fieldId, date, time, players: [req.user.id] });
        await match.save();
        res.status(200).json({ message: "Match créé", match });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate('field').populate('players', 'firstName lastName Email');
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.joinMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: "Match non trouvé" });
        if (!match.players.includes(req.user.id)) match.players.push(req.user.id);
        await match.save();
        res.json({ message: "Rejoint le match", match });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.leaveMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: "Match non trouvé" });
        match.players = match.players.filter(p => p.toString() !== req.user.id);
        await match.save();
        res.json({ message: "Quitte le match", match });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports.deleteMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMatch = await Match.findByIdAndDelete(id);
        if (!deletedMatch) return res.status(404).json({ message: "Match non trouvé" });
        res.json({ message: "Match supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un match
module.exports.updateMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMatch = await Match.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedMatch) return res.status(404).json({ message: "Match non trouvé" });
        res.json({ message: "Match mis à jour", match: updatedMatch });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Définir le résultat d’un match
module.exports.setResultMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const { result } = req.body;

        const match = await Match.findById(id);
        if (!match) return res.status(404).json({ message: "Match non trouvé" });

        match.result = result;
        await match.save();

        res.json({ message: "Résultat mis à jour", match });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
