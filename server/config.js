require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    redisURL: process.env.REDIS_URL
};
