const axios = require('axios');
const sharp = require('sharp');
const Image = require('../models/image');
const ProcessingRequest = require('../models/processingRequest');
const path = require('path');

const Queue = require('bull');
const config = require('../config');
const imageQueue = new Queue('image-processing', config.redisURL);

imageQueue.process(async (job) => {
    const { url, productId, requestId } = job.data;
    
    try {
        const response = await axios({ url, responseType: 'arraybuffer' });
        const originalImage = response.data;
        
        // Compress image
        const compressedImageBuffer = await sharp(originalImage).resize({ width: 800 }).toBuffer();
        
        // Generate new URL or save locally
        const processedUrl = `https://example.com/processed-image-${path.basename(url)}`;
        // In a real application, you would upload to cloud storage and get the URL
        
        // Save to MongoDB
        await Image.create({
            product_id: productId,
            original_url: url,
            processed_url: processedUrl,
            status: 'completed',
            processing_request_id: requestId
        });
        
        // Check if all images are processed
        const images = await Image.find({ processing_request_id: requestId });
        if (images.every(img => img.status === 'completed')) {
            await ProcessingRequest.updateOne({ _id: requestId }, { status: 'completed' });
            // Optionally, trigger a webhook
        }
    } catch (error) {
        console.error(error);
        await Image.updateOne({ original_url: url }, { status: 'failed' });
    }
});
