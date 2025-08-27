const express = require('express');
const router = express.Router();
const MatchController = require('../Controllers/MatchController');

router.post('/createMatch', MatchController.createMatch);
router.get('/getAllMatches', MatchController.getAllMatches);
router.post('/:id/joinMatch', MatchController.joinMatch);
router.post('/:id/leaveMatch', MatchController.leaveMatch);
router.delete('/deleteMatch/:id', MatchController.deleteMatch);
router.put('/updateMatch/:id', MatchController.updateMatch);
router.get('/setResultMatch/:id', MatchController.setResultMatch);


module.exports = router;
