const express = require("express");
const router = express.Router();
const ReservationController = require("../Controllers/ReservationController");

router.post("/add", ReservationController.createReservation);
router.get("/all", ReservationController.getAllReservations);
router.get("/user/:userId", ReservationController.getMyReservations);
router.put("/cancel/:id", ReservationController.cancelReservation);

module.exports = router;
