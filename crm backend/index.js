const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connect = require('./connectdb');
require('dotenv').config();

const app = express();

/* ================================
   🔥 CORS CONFIG (MUST BE FIRST)
================================ */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://crm.bharatproperties.co'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server & Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔥 Handle preflight requests
app.options('*', cors());

/* ================================
   BODY PARSER (LARGE PAYLOADS)
================================ */
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

/* ================================
   STATIC FILES
================================ */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* ================================
   DATABASE
================================ */
connect();

/* ================================
   ROUTES
================================ */
app.get('/', (req, res) => {
  res.send('Welcome to Bharat Properties API');
});

app.use('/', require('./routes/admin'));
app.use('/', require('./routes/Contacts/contact'));
app.use('/api/settings', require('./routes/Settings/settings'));
app.use('/api', require('./routes/Others/other'));
app.use('/api/upload', require('./routes/upload'));

/* ================================
   ERROR HANDLING (CORS SAFE)
================================ */
app.use((err, req, res, next) => {
  if (err.message === 'CORS not allowed') {
    return res.status(403).json({
      success: false,
      message: 'CORS blocked: Origin not allowed'
    });
  }
  next(err);
});

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🔥 Prevent timeout on big uploads
server.setTimeout(5 * 60 * 1000); // 5 minutes
