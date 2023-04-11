const mysql = require('mysql2');
const path = require('path');
const envPath = path.join(__dirname, './.env');
require('dotenv').config({ path: envPath });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

db.connect();

module.exports = db;
