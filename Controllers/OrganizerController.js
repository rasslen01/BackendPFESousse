const Organizer = require("../Models/OrganizerModel");

// ➕ Ajouter un organisateur
module.exports.addOrganizer = async (req, res) => {
  try {
    const { userId, organizationName, phone } = req.body;

    const newOrganizer = new Organizer({
      user: userId,
      organizationName,
      phone
    });

    await newOrganizer.save();
    res.status(201).json({ message: "Organisateur ajouté avec succès", organizer: newOrganizer });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 📋 Récupérer tous les organisateurs
module.exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().populate("user");
    res.status(200).json(organizers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 📋 Récupérer un organisateur par ID
module.exports.getOrganizerById = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await Organizer.findById(id).populate("user");
    if (!organizer) {
      return res.status(404).json({ message: "Organisateur non trouvé" });
    }
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ⚽ Créer un match par un organisateur
module.exports.createOrganizedMatch = async (req, res) => {
  try {
    const { name, date, location, organizerId } = req.body;

    const match = new Match({
      name,
      date,
      location,
      organizer: organizerId
    });

    await match.save();
    res.status(201).json({ message: "Match créé avec succès", match });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 📋 Voir les matchs d’un organisateur
module.exports.getOrganizerMatches = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const matches = await Match.find({ organizer: organizerId }).populate("organizer");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✏️ Modifier un match organisé
module.exports.updateOrganizedMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMatch = await Match.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Match mis à jour", match: updatedMatch });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ❌ Annuler un match
module.exports.cancelOrganizedMatch = async (req, res) => {
  try {
    const { id } = req.params;
    await Match.findByIdAndDelete(id);
    res.status(200).json({ message: "Match annulé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
