const { ObjectId } = require('mongodb');
const connectDB = require('../data/db');

exports.getAll = async (req, res) => {
  try {
    const db = await connectDB();
    const workouts = await db.collection('workouts').find({}).toArray();
    res.status(200).json(workouts);
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id format' });
    }

    const db = await connectDB();
    const workout = await db
      .collection('workouts')
      .findOne({ _id: new ObjectId(id) });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (err) {
    console.error('Error fetching workout:', err);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      date,
      exerciseName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      notes,
    } = req.body;

    const db = await connectDB();
    const newWorkout = {
      date,
      exerciseName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      notes: notes || '',
    };
    const result = await db.collection('workouts').insertOne(newWorkout);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error('Error creating workout:', err);
    res.status(500).json({ error: 'Failed to create workout' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id format' });
    }

    const {
      date,
      exerciseName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      notes,
    } = req.body;

    const updatedWorkout = {
      date,
      exerciseName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      notes: notes || '',
    };

    const db = await connectDB();
    const result = await db
      .collection('workouts')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedWorkout });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error updating workout:', err);
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id format' });
    }

    const db = await connectDB();
    const result = await db
      .collection('workouts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error('Error deleting workout:', err);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};