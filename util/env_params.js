const dotenv = require('dotenv').config();
const crypt = require('crypto');

exports.username = process.env.DB_USER;
exports.pass = process.env.DB_PASSWORD;
exports.db = process.env.DB_DATABASE;
exports.secretKey = crypt.randomBytes(256).toString('base64');

exports.dbConnString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}.nx26p.mongodb.net/delivery-app`;
exports.testDbConnString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}.nx26p.mongodb.net/test-delivery-app`;

