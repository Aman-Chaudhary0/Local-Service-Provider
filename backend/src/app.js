const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const authRoutes = require('./routes/authRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const errorHandler = require('./middlewares/errorHandler')
const { requestLogger } = require('./middlewares/requestLogger')
const rateLimit = require('express-rate-limit')

const app = express();

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

// connect backend with frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

// implement rate limiting for sending requests to server
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 10 * 1000,
    message: {
        success: false,
        message: "You send multiple request please try after sometime",
        data: null,
        errors: [],
        meta: null,
    }
})

app.use('/api/auth', limiter)
// handle cookie
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/add', serviceRoutes);
app.use('/api/get', serviceRoutes);

app.use(errorHandler);


module.exports = app;
