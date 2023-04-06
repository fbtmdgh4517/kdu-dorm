const bcrypt = require('bcrypt');
const passport = require('passport');
const Student = require('../models/student');

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, student, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!student) {
            return res.status(401).send('오류');
        }
        return req.login(student, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            console.log('로그인 성공');
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
