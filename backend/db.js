const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's03203614@',
    database: 'kdu_dorm',
});

db.connect();

module.exports = db;
