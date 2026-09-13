const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');

router.get('/', workoutsController.getAll);
router.post('/', workoutsController.create);

module.exports = router;
