const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const Product = require('../models/product');
const Image = require('../models/image');
const ProcessingRequest = require('../models/processingRequest');
const { v4: uuidv4 } = require('uuid');
const Queue = require('bull');
const config = require('../config');

const imageQueue = new Queue('image-processing', config.redisURL);

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadCSV = async (req, res) => {
    const file = req.file;
    const requestId = uuidv4();
    
    // Store processing request
    await ProcessingRequest.create({ _id: requestId });
    
    // Process CSV
    fs.createReadStream(file.buffer)
        .pipe(csvParser())
        .on('data', async (row) => {
            const { serial_number, product_name, input_image_urls } = row;
            // Find or create product
            let product = await Product.findOne({ serial_number });
            if (!product) {
                product = new Product({ serial_number, product_name });
                await product.save();
            }
            // Enqueue image processing tasks
            input_image_urls.split(',').forEach(url => {
                imageQueue.add({ url, productId: product._id, requestId });
            });
        })
        .on('end', () => {
            res.json({ request_id: requestId });
        })
        .on('error', (error) => {
            res.status(500).send(error.message);
        });
};
