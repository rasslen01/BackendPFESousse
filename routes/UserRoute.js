var express = require('express');
var router = express.Router();

const UserController = require('../Controllers/UserController');
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserById/:id', UserController.getUsersById);
router.post('/addPlayer', UserController.addPlayer);


module.exports = router;
