import dotevn from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/connectDB.js';

//Routes
import userRoutes from './routes/userRoutes.js'

dotevn.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to blog app api');
});

app.use('/api/users', userRoutes);

app.listen(PORT, console.log(`listening on port: ${PORT}`));
