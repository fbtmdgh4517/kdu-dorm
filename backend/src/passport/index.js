const passport = require('passport');
const local = require('./localStrategy');
const Student = require('../models/student');

module.exports = () => {
    passport.serializeUser((student, done) => {
        done(null, student.student_id);
    });

    passport.deserializeUser((student_id, done) => {
        Student.findOne({ where: { student_id } })
            .then((student) => done(null, student))
            .catch((err) => done(err));
    });

    local();
};
