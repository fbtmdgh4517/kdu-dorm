const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Student = require('../models/student');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'student_id',
                passwordField: 'student_password',
                passReqToCallback: false,
            },
            async (student_id, student_password, done) => {
                try {
                    const exStudent = await Student.findOne({ where: { student_id } });
                    if (exStudent) {
                        const result = await bcrypt.compare(student_password, exStudent.student_password);
                        if (result) {
                            return done(null, exStudent);
                        } else {
                            return done(null, false, { reason: '비밀번호가 틀립니다.' });
                        }
                    } else {
                        return done(null, false, { reason: '존재하지 않는 아이디입니다.' });
                    }
                } catch (err) {
                    console.error(err);
                    return done(err);
                }
            }
        )
    );
};
