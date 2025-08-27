const express = require('express');
const router = express.Router();
const FieldController = require('../controllers/FieldsController');

router.post('/addField', FieldController.addField);
router.get('/getAllFields', FieldController.getAllFields);
router.get('/getFieldById/:id', FieldController.getFieldById);
router.put('/updateField/:id', FieldController.updateField);
router.delete('/deleteField/:id', FieldController.deleteField);

module.exports = router;
