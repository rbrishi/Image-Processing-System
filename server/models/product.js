const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    serial_number: { type: String, unique: true, required: true },
    product_name: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
