// config.js
//const dotenv = require('dotenv');
//dotenv.config();
module.exports = {
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/peer-medical',
  port: process.env.PORT || 3000,
  jwtsecret: process.env.JWT_SECRET || "nicosecretjwt"
};