const express = require('express');
const router = express.Router();
const FieldController = require('../controllers/FieldsController');

router.post('/add', FieldController.addField);
router.get('/', FieldController.getAllFields);

module.exports = router;
