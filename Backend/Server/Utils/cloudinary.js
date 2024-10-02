const { CLOUD_NAME, API_KEY, API_SECRET_KEY } = require('./others');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET_KEY,
});




module.exports = cloudinary

