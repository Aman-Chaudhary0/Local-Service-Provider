const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const serviceRoutes = require('./routes/serviceRoutes')

const app = express();

app.use(express.json());

// connect backend with frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));


// handle cookie
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/add', serviceRoutes);
app.use('/api/get', serviceRoutes);


module.exports = app;
