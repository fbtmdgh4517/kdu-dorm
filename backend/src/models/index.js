const Sequelize = require('sequelize');
const Student = require('./student');
const Administrator = require('./administrator');
const OvernightApplication = require('./overnightApplication');
const ScoreRecord = require('./scoreRecord');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Student = Student;
db.Administrator = Administrator;
db.OvernightApplication = OvernightApplication;
db.ScoreRecord = ScoreRecord;

Student.initiate(sequelize);
Administrator.initiate(sequelize);
OvernightApplication.initiate(sequelize);
ScoreRecord.initiate(sequelize);

Student.associate(db);
Administrator.associate(db);
OvernightApplication.associate(db);
ScoreRecord.associate(db);

module.exports = db;
