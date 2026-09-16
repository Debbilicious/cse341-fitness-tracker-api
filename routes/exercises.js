const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');
const validateExercise = require('../middleware/validateExercise');

router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getOne);
router.post('/', validateExercise, exercisesController.create);
router.put('/:id', validateExercise, exercisesController.update);
router.delete('/:id', exercisesController.remove);

module.exports = router;
