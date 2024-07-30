const mongoose = require('mongoose');

const processingRequestSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status: { type: String, default: 'processing' } // e.g., 'processing', 'completed', 'failed'
});

module.exports = mongoose.model('ProcessingRequest', processingRequestSchema);
