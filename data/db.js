const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db;
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db('fitnessTrackerDB');
  return db;
}

module.exports = connectDB;