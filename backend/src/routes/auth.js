const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const db = require("../../db");

const router = express.Router();

router.post("/signupRequest", (req, res) => {
    const studentName = req.body.student_name;
    const studentId = req.body.student_id;
    const studentDepartment = req.body.student_department;
    const studentContact = req.body.student_contact;
    const studentRoom = req.body.student_room;
    const studentPassword = req.body.student_password;

    const sendData = { isSuccess: "" };

    if (studentName && studentId && studentDepartment && studentContact && studentRoom && studentPassword) {
        db.query("SELECT * FROM students where student_id = ?", [studentId], (error, results) => {
            if (error) throw error;
            if (results.length <= 0) {
                const hashedPassword = bcrypt.hashSync(studentPassword, 10);
                db.query(
                    "INSERT INTO signup_requests (student_id, student_name, student_department, student_contact, student_room, student_password) VALUES (?, ?, ?, ?, ?, ?)",
                    [studentId, studentName, studentDepartment, studentContact, studentRoom, hashedPassword],
                    (error, results) => {
                        if (error) throw error;
                        sendData.isSuccess = "True";
                        res.send(sendData);
                    }
                );
            } else {
                sendData.isSuccess = "이미 존재하는 아이디입니다.";
                res.send(sendData);
            }
        });
    }
});

router.get("/signupRequest", (req, res) => {
    db.query("SELECT * FROM signup_requests", (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
});

router.get("/signupRequest/:id", (req, res) => {
    db.query("SELECT * FROM signup_requests WHERE request_id = ?", [req.params.id], (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
});

router.put("/signupRequest/accept/:id", (req, res) => {
    console.log("회원가입 승인");
    const id = req.params.id;
    const updateStatusQuery = 'UPDATE signup_requests SET request_status = "승인" WHERE request_id = ?';
    const insertStudentInfoQuery =
        "INSERT INTO students (student_id, student_name, student_department, student_contact, student_room, student_password) SELECT student_id, student_name, student_department, student_contact, student_room, student_password FROM signup_requests WHERE request_id = ?";

    db.query(updateStatusQuery, [id], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
    db.query(insertStudentInfoQuery, [id], (error, results) => {
        if (error) throw error;
    });
});

router.put("/signupRequest/reject/:id", (req, res) => {
    console.log("회원가입 거절");
    const id = req.params.id;
    const rejectionReason = req.body.rejection_reason;
    const sqlQuery = 'UPDATE signup_requests SET request_status = "거절", rejection_reason = ? WHERE request_id = ?';
    db.query(sqlQuery, [rejectionReason, id], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.post("/login", (req, res) => {
    // 여기 바꿔야ㅐ됨
    const id = req.body.student_id;
    const studentPassword = req.body.student_password;
    const sendData = {
        isLogin: "",
        studentName: "",
        sessionID: "",
        isAdmin: "",
    };

    if (id && studentPassword) {
        db.query("SELECT * FROM students where student_id = ?", [id], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                bcrypt.compare(studentPassword, results[0].student_password, (err, result) => {
                    if (result) {
                        req.session.is_logined = true;
                        req.session.student_id = id;
                        req.session.student_name = results[0].student_name;
                        req.session.is_admin = false;
                        req.session.save(() => {
                            sendData.studentName = results[0].student_name;
                            sendData.isLogin = "True";
                            sendData.sessionID = req.sessionID;
                            sendData.isAdmin = "False";
                            res.send(sendData);
                            console.log("로그인 성공");
                        });
                        console.log(req.sessionID);
                    } else {
                        sendData.isLogin = "로그인 정보 일치하지 않음";
                        res.send(sendData);
                    }
                });
            } else if (results.length <= 0) {
                console.log("관리자");
                db.query("SELECT * FROM administrators where admin_id = ?", [id], (error, results) => {
                    console.log(results);
                    if (error) throw error;
                    if (results.length > 0) {
                        bcrypt.compare(studentPassword, results[0].admin_password, (err, result) => {
                            if (result) {
                                req.session.is_logined = true;
                                req.session.admin_id = id;
                                req.session.admin_floor = results[0].admin_floor;
                                req.session.is_admin = true;
                                req.session.save(() => {
                                    sendData.studentName = results[0].admin_id;
                                    sendData.isLogin = "True";
                                    sendData.sessionID = req.sessionID;
                                    sendData.isAdmin = "True";
                                    res.send(sendData);
                                    console.log("관리자 로그인 성공");
                                });
                                console.log(req.sessionID);
                            } else {
                                sendData.isLogin = "로그인 정보 일치하지 않음";
                                res.send(sendData);
                            }
                        });
                    }
                });
            } else {
                sendData.isLogin = "아이디 정보 일치하지 않음";
                res.send(sendData);
            }
        });
    } else {
        sendData.isLogin = "아이디와 비밀번호를 입력해주세요";
        res.send(sendData);
    }
});

router.get("/authcheck", (req, res) => {
    const sendData = {
        isLogin: "",
        studentId: "",
        studentName: "",
        isAdmin: "",
    };
    console.log("authcheck");
    console.log(req.sessionID);
    console.log(req.session);
    if (req.session.is_logined) {
        sendData.isLogin = "True";
        if (req.session.is_admin === true) {
            sendData.studentId = req.session.admin_id;
            sendData.isAdmin = req.session.is_admin;
        } else {
            sendData.studentId = req.session.student_id;
            sendData.studentName = req.session.student_name;
            sendData.isAdmin = req.session.is_admin;
        }
    } else {
        sendData.isLogin = "False";
    }
    res.send(sendData);
});

router.get("/logout", (req, res) => {
    res.clearCookie("session-cookie", { path: "/" });
    req.session.destroy(() => {
        console.log("로그아웃 성공");
        res.redirect("/");
    });
});

module.exports = router;
