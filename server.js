// require('module-alias/register')
import dotevn from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/connectDB.js';
import path from 'path';
import {
	errorResponseHandler,
	invalidPathHandler,
} from './middleware/errorHandler.js';

//Routes
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js'

import { fileURLToPath } from 'url';

dotevn.config();
connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to blog app api');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(PORT, console.log(`listening on port: ${PORT}`));
