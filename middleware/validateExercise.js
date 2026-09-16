function validateExercise(req, res, next) {
  const { name, category, equipment, description } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and must be a non-empty string.');
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push('category is required and must be a non-empty string.');
  }
  if (!equipment || typeof equipment !== 'string' || equipment.trim() === '') {
    errors.push('equipment is required and must be a non-empty string.');
  }
  if (
    !description ||
    typeof description !== 'string' ||
    description.trim() === ''
  ) {
    errors.push('description is required and must be a non-empty string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = validateExercise;
