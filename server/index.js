import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import colors from 'colors';

// API Routes
import postRoutes from './routes/postRoutes.js';

// Error handling middleware

dotenv.config();

connectDB();

const app = express();

// Allows access to JSON data in the body
app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
