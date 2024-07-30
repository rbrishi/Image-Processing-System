const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    original_url: { type: String, required: true },
    processed_url: { type: String },
    status: { type: String, default: 'pending' }, // e.g., 'pending', 'processing', 'completed', 'failed'
    processing_request_id: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);
