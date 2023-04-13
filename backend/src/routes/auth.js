const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { login, logout } = require('../controllers/auth');
const db = require('../../db');

const router = express.Router();

router.post('/signupRequest', (req, res) => {
    const studentName = req.body.student_name;
    const studentId = req.body.student_id;
    const studentDepartment = req.body.student_department;
    const studentContact = req.body.student_contact;
    const studentRoom = req.body.student_room;
    const studentPassword = req.body.student_password;

    const sendData = { isSuccess: '' };

    if (studentName && studentId && studentDepartment && studentContact && studentRoom && studentPassword) {
        db.query('SELECT * FROM students where student_id = ?', [studentId], (error, results, fields) => {
            if (error) throw error;
            if (results.length <= 0) {
                const hashedPassword = bcrypt.hashSync(studentPassword, 10);
                db.query(
                    'INSERT INTO students (student_name, student_id, student_department, student_contact, student_room, student_password) VALUES (?, ?, ?, ?, ?, ?)',
                    [studentName, studentId, studentDepartment, studentContact, studentRoom, hashedPassword],
                    (error, results, fields) => {
                        if (error) throw error;
                        sendData.isSuccess = 'True';
                        res.send(sendData);
                    }
                );
            } else {
                sendData.isSuccess = '이미 존재하는 아이디입니다.';
                res.send(sendData);
            }
        });
    }
});

router.post('/login', (req, res) => {
    const studentId = req.body.student_id;
    const studentPassword = req.body.student_password;
    const sendData = { isLogin: '', studentName: '', sessionID: '' };

    if (studentId && studentPassword) {
        db.query('SELECT * FROM students where student_id = ?', [studentId], (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0) {
                bcrypt.compare(studentPassword, results[0].student_password, (err, result) => {
                    if (result) {
                        req.session.is_logined = true;
                        req.session.student_id = studentId;
                        req.session.save(() => {
                            sendData.studentName = results[0].student_name;
                            sendData.isLogin = 'True';
                            sendData.sessionID = req.sessionID;
                            res.send(sendData);
                            console.log('로그인 성공');
                        });
                        console.log(req.sessionID);
                    } else {
                        sendData.isLogin = '로그인 정보 일치하지 않음';
                        res.send(sendData);
                    }
                });
            } else {
                sendData.isLogin = '아이디 정보 일치하지 않음';
                res.send(sendData);
            }
        });
    } else {
        sendData.isLogin = '아이디와 비밀번호를 입력해주세요';
        res.send(sendData);
    }
});

router.get('/authcheck', (req, res) => {
    const sendData = { isLogin: '' };
    console.log('authcheck');
    console.log(req.sessionID);
    console.log(req.session);
    if (req.session.is_logined) {
        sendData.isLogin = 'True';
    } else {
        sendData.isLogin = 'False';
    }
    res.send(sendData);
});

router.get('/logout', (req, res) => {
    res.clearCookie('session-cookie', { path: '/' });
    req.session.destroy(() => {
        console.log('로그아웃 성공');
        res.redirect('/');
    });
});

// router.post(
//     '/login',
//     (req, res, next) => {
//         console.log(req.isAuthenticated() + 'isLoggedOut');
//         if (!req.isAuthenticated()) {
//             console.log('로그인 상태 아님');
//             next();
//         } else {
//             console.log('로그인 상태');
//             const message = encodeURIComponent('로그인한 상태입니다.');
//             res.redirect(`/?error=${message}`);
//         }
//     },
//     (req, res, next) => {
//         passport.authenticate('local', async (authError, student, info) => {
//             console.log(student);
//             if (authError) {
//                 console.error(authError);
//                 return next(authError);
//             }
//             if (!student) {
//                 console.log(info.reason);
//                 return res.status(401).send('오류');
//             }
//             return req.login(student, (loginError) => {
//                 if (loginError) {
//                     console.error(loginError);
//                     return next(loginError);
//                 }
//                 console.log('로그인 성공');
//                 console.log(req.isAuthenticated());
//                 console.log(req.session.is_logined);
//                 if (req.isAuthenticated()) {
//                     return res.send(student.student_name);
//                 } else {
//                     return res.status(401).send('로그인 실패');
//                 }
//                 // return res.send(student.student_name);
//                 // return res.redirect('/');
//             });
//         })(req, res, next);
//     }
// );

// router.get(
//     '/logout',
//     (req, res, next) => {
//         console.log(req.isAuthenticated() + 'isLoggedIn');
//         console.log(req.session.is_logined);
//         // console.log(req);
//         if (req.isAuthenticated()) {
//             console.log('로그인 상태');
//             next();
//         } else {
//             console.log('로그인 필요');
//             res.status(403).send('로그인 필요');
//         }
//     },
//     (req, res) => {
//         console.log('로그아웃 성공');
//         req.logout();
//         req.session.destroy(() => {
//             res.clearCookie('session-cookie', { path: '/' });
//             res.send('로그아웃 성공');
//         });
//     }
// );

module.exports = router;
