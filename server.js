import dotevn from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './connectDB.js';

dotevn.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Welcome to blog app api');
});

app.listen(PORT, console.log(`listening on port: ${PORT}`));
