const express = require("express");
const router = express.Router();

const organizerController = require("../Controllers/OrganizerController");


router.post("/addOrganizer", organizerController.addOrganizer);
router.get("/all", organizerController.getAllOrganizers);
router.get("/:id", organizerController.getOrganizerById);
router.post("/createMatch", organizerController.createOrganizedMatch);
router.get("/:organizerId/matches", organizerController.getOrganizerMatches);
router.put("/updateMatch/:id", organizerController.updateOrganizedMatch);
router.delete("/cancelMatch/:id", organizerController.cancelOrganizedMatch);

module.exports = router;
