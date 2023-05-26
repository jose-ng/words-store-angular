/* This is a database connection function*/
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = {
  isConnected: mongoose.ConnectionStates.uninitialized,
};

const USER = encodeURIComponent(process.env['DB_USER'] ?? false);
const PASSWORD = encodeURIComponent(process.env['DB_PASSWORD'] ?? false);
const DB_NAME = encodeURIComponent(process.env['DB_NAME'] ?? false);
const DB_HOST = encodeURIComponent(process.env['DB_HOST'] ?? false);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const connectMongo = async () => {
  /* check if we have connection to our databse*/
  if (connection.isConnected === mongoose.ConnectionStates.connected) {
    return;
  }
  const db = await mongoose.connect(MONGO_URI);
  connection.isConnected = db.connections[0].readyState;
};

export default connectMongo;
