import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import posts from './routes/posts.js';
import errorHandler from './middleware/error.js'
import notfound from './middleware/notfound.js';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 5050;

const connectDB = async () => {
    console.log('MongoDB URI:', process.env.MONGO_DB); // Log the URI to check if it's defined
    try {
      await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process with failure
    }
  };
  
  // Connect to MongoDB
  connectDB();
  
//get directory name
const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app = express();
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//Routes
app.use('/api/posts',posts);


//error middleware
app.use(notfound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));