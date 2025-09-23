// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Serve frontend
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hey at last'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

