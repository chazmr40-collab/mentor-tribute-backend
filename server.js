require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tributes', require('./routes/tributes'));

const PORT = process.env.PORT || 5000;
// with this single-line variant to bind all interfaces
app.listen(PORT, '127.0.0.1', () => { console.log(`?? Server running on port ${PORT}`); });
