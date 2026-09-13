const connectDB = require('../data/db');

// GET all workouts
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

// POST a new workout
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

    if (
      !date ||
      !exerciseName ||
      sets === undefined ||
      reps === undefined ||
      weight === undefined ||
      duration === undefined ||
      caloriesBurned === undefined
    ) {
      return res.status(400).json({
        error:
          'Required fields: date, exerciseName, sets, reps, weight, duration, caloriesBurned',
      });
    }

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