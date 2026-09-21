const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/workouts', require('./workouts'));
router.use('/exercises', require('./exercises'));

module.exports = router;