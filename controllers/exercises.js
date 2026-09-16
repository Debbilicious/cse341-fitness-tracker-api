const { ObjectId } = require('mongodb');
const connectDB = require('../data/db');

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

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise id format' });
    }

    const db = await connectDB();
    const exercise = await db
      .collection('exercises')
      .findOne({ _id: new ObjectId(id) });

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.status(200).json(exercise);
  } catch (err) {
    console.error('Error fetching exercise:', err);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, category, equipment, description } = req.body;
    const db = await connectDB();
    const newExercise = { name, category, equipment, description };
    const result = await db.collection('exercises').insertOne(newExercise);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error('Error creating exercise:', err);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise id format' });
    }

    const { name, category, equipment, description } = req.body;
    const updatedExercise = { name, category, equipment, description };

    const db = await connectDB();
    const result = await db
      .collection('exercises')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedExercise });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error updating exercise:', err);
    res.status(500).json({ error: 'Failed to update exercise' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise id format' });
    }

    const db = await connectDB();
    const result = await db
      .collection('exercises')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error('Error deleting exercise:', err);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
};