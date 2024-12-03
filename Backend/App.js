// app.js
process.noDeprecation = true;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none()); // Add multer middleware

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Teacher Signup API!");
});

// Routes
app.use("/api/teachers", teacherRoutes);
app.use('/api/books', bookRoutes);


// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
