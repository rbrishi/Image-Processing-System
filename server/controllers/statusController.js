const ProcessingRequest = require('../models/processingRequest');

exports.getStatus = async (req, res) => {
    const { request_id } = req.params;
    const request = await ProcessingRequest.findById(request_id);
    
    if (!request) {
        return res.status(404).send('Request not found');
    }
    
    res.json({ request_id, status: request.status });
};
