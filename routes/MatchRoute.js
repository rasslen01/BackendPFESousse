const express = require('express');
const router = express.Router();
const MatchController = require('../Controllers/MatchController');

router.post('/add', MatchController.createMatch);
router.get('/getAllMatches', MatchController.getAllMatches);
router.post('/:id/join', MatchController.joinMatch);
router.post('/:id/leave', MatchController.leaveMatch);

module.exports = router;
