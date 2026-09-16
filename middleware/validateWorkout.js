function validateWorkout(req, res, next) {
  const {
    date,
    exerciseName,
    sets,
    reps,
    weight,
    duration,
    caloriesBurned,
  } = req.body;
  const errors = [];

  if (!date || typeof date !== 'string') {
    errors.push('date is required and must be a string (e.g. YYYY-MM-DD).');
  }
  if (!exerciseName || typeof exerciseName !== 'string') {
    errors.push('exerciseName is required and must be a string.');
  }
  if (sets === undefined || typeof sets !== 'number') {
    errors.push('sets is required and must be a number.');
  }
  if (reps === undefined || typeof reps !== 'number') {
    errors.push('reps is required and must be a number.');
  }
  if (weight === undefined || typeof weight !== 'number') {
    errors.push('weight is required and must be a number.');
  }
  if (duration === undefined || typeof duration !== 'number') {
    errors.push('duration is required and must be a number.');
  }
  if (caloriesBurned === undefined || typeof caloriesBurned !== 'number') {
    errors.push('caloriesBurned is required and must be a number.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = validateWorkout;
