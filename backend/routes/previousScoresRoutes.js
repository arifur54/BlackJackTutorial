const express = require('express');
const router = express.Router();
const previousScoresController = require('../controllers/previousScoresController');

router.post('/save_result', previousScoresController.saveResult);

router.get('/get_all_results', previousScoresController.getResults);

router.get('/get_results/:user_id', previousScoresController.getResultsByUserId);

router.delete('/delete_result/:_id', previousScoresController.deleteResultById);


module.exports = router;