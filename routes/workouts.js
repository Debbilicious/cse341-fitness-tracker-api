const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const validateWorkout = require('../middleware/validateWorkout');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getOne);
router.post('/', validateWorkout, workoutsController.create);
router.put('/:id', validateWorkout, workoutsController.update);
router.delete('/:id', workoutsController.remove);

module.exports = router;
