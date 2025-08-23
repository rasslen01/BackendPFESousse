const express = require("express");
const router = express.Router();
const ManagerController = require("../Controllers/ManagerController");

router.post("/addManagedField", ManagerController.addManagedField);
router.get("/getMyFields", ManagerController.getMyFields);
router.get("/getFieldReservations", ManagerController.getFieldReservations);

module.exports = router;
