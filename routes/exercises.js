const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');

router.get('/', exercisesController.getAll);
router.post('/', exercisesController.create);

module.exports = router;
