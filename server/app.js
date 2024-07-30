const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { uploadCSV } = require('./controllers/uploadController');
const { getStatus } = require('./controllers/statusController');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/upload', multer().single('file'), uploadCSV);
app.get('/status/:request_id', getStatus);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
