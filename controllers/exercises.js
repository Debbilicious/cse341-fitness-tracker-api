const connectDB = require('../data/db');

// GET all exercises
exports.getAll = async (req, res) => {
  try {
    const db = await connectDB();
    const exercises = await db.collection('exercises').find({}).toArray();
    res.status(200).json(exercises);
  } catch (err) {
    console.error('Error fetching exercises:', err);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

// POST a new exercise
exports.create = async (req, res) => {
  try {
    const { name, category, equipment, description } = req.body;

    if (!name || !category || !equipment || !description) {
      return res.status(400).json({
        error: 'All fields are required: name, category, equipment, description',
      });
    }

    const db = await connectDB();
    const newExercise = { name, category, equipment, description };
    const result = await db.collection('exercises').insertOne(newExercise);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error('Error creating exercise:', err);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};