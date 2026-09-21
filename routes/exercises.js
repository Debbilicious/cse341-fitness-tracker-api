const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');
const validateExercise = require('../middleware/validateExercise');
const authenticate = require('../middleware/authenticate');

router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getOne);
router.post('/', authenticate, validateExercise, exercisesController.create);
router.put('/:id', authenticate, validateExercise, exercisesController.update);
router.delete('/:id', authenticate, exercisesController.remove);

module.exports = router;