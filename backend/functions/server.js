import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import threadRoute from '../Endpoints/threadRoute.js';
import userRoute from '../Endpoints/userRoute.js';
import newsRoute from '../Endpoints/newsRoute.js';
import serverless from 'serverless-http';

// Load environment variables from .env
dotenv.config();
const mongoURI = process.env.MONGO_URI;
const app = express();

if (!mongoURI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

// Set up Express middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/.netlify/functions/server', threadRoute)
app.use('/.netlify/functions/server', userRoute);
app.use('/.netlify/functions/server', newsRoute);

const handler = serverless(app);
export { handler };
