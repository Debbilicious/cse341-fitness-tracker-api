const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const validateWorkout = require('../middleware/validateWorkout');
const authenticate = require('../middleware/authenticate');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getOne);
router.post('/', authenticate, validateWorkout, workoutsController.create);
router.put('/:id', authenticate, validateWorkout, workoutsController.update);
router.delete('/:id', authenticate, workoutsController.remove);

module.exports = router;