const express = require("express");
const router = express.Router();
const ReservationController = require("../Controllers/ReservationController");

router.post("/createReservation", ReservationController.createReservation);
router.get("/getAllReservations", ReservationController.getAllReservations);
router.get("/user/getMyReservations/:id", ReservationController.getMyReservations);
router.put("/cancelReservation/:id", ReservationController.cancelReservation);

module.exports = router;
