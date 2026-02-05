require('dotenv').config(); // ✅ Load environment variables FIRST

const express = require('express');
const cors = require('cors');
const path = require("path");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (profile/resume/offerLetter)
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// ✅ Load MongoDB URI and PORT from .env
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is undefined. Please check your .env file.");
}

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/user', require('./routes/user.route'));
app.use('/student', require('./routes/student.route'));
app.use('/tpo', require('./routes/tpo.route'));
app.use('/management', require('./routes/management.route'));
app.use('/admin', require('./routes/superuser.route'));
app.use('/company', require('./routes/company.route'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
