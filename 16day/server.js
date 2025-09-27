require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const profileRoutes = require('./routes/profile');
const searchRoutes = require('./routes/search');
const analyticsRoutes = require('./routes/analytics');
const errorHandler = require('./middleware/handler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const projectRoutes = require('./routes/project');
app.use('/api/project', projectRoutes);

app.use('/api/profile', profileRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/combinedApi';

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`working http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('DB error', err);
    process.exit(1);
  });