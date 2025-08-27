const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserById/:id', UserController.getUsersById);
router.get('/getUserByImage/:image', UserController.getUserByImage);
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser);

// ⚠️ Important: endpoint pour ajouter avec image
router.post('/add-player', upload.single('profilePicture'), UserController.addPlayer);

module.exports = router;
