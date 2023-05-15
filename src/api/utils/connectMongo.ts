/* This is a database connection function*/
import mongoose from 'mongoose';
const dotenv = require('dotenv');

dotenv.config();

const connection: any = {};

const USER = encodeURIComponent(process.env['DB_USER']!);
const PASSWORD = encodeURIComponent(process.env['DB_PASSWORD']!);
const DB_NAME = encodeURIComponent(process.env['DB_NAME']!);
const DB_HOST = encodeURIComponent(process.env['DB_HOST']!);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const connectMongo = async () => {
  console.log("USER",USER)
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(MONGO_URI);
  connection.isConnected = db.connections[0].readyState;
};

export default connectMongo;
