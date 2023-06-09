const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../db");
const nodeMailer = require("nodemailer");
const path = require("path");
const envPath = path.join(__dirname, "../../.env");
require("dotenv").config({ path: envPath });

const router = express.Router();

router.post("/signupRequest", (req, res) => {
  const studentName = req.body.student_name;
  const studentId = req.body.student_id;
  const studentDepartment = req.body.student_department;
  const studentContact = req.body.student_contact;
  const studentRoom = req.body.student_room;
  const studentPassword = req.body.student_password;
  const studentEmail = req.body.student_email;

  const query = "SELECT * FROM students where student_id = ?";

  const sendData = { isSuccess: "" };

  if (studentName && studentId && studentDepartment && studentContact && studentRoom && studentPassword) {
    db.query(query, [studentId], (error, results) => {
      if (error) throw error;
      if (results.length <= 0) {
        const hashedPassword = bcrypt.hashSync(studentPassword, 10);
        db.query(
          "INSERT INTO signup_requests (student_id, student_name, student_department, student_contact, student_email, student_room, student_password) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [studentId, studentName, studentDepartment, studentContact, studentEmail, studentRoom, hashedPassword],
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
  const adminFloor = req.session.admin_floor;
  const query = `SELECT * FROM signup_requests WHERE student_room LIKE '${adminFloor}%' ORDER BY request_id DESC`;
  db.query(query, (error, results) => {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

router.get("/signupRequest/:id", (req, res) => {
  const query = "SELECT * FROM signup_requests WHERE request_id = ?";
  db.query(query, [req.params.id], (error, results) => {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

router.put("/signupRequest/accept/:id", (req, res) => {
  console.log("회원가입 승인");
  const id = req.params.id;
  const updateStatusQuery = "UPDATE signup_requests SET request_status = '승인' WHERE request_id = ?";
  const insertStudentInfoQuery =
    "INSERT INTO students (student_id, student_name, student_department, student_contact, student_email, student_room, student_password) " +
    "SELECT student_id, student_name, student_department, student_contact, student_email, student_room, student_password " +
    "FROM signup_requests " +
    "WHERE request_id = ?";
  const selectEmailQuery = "SELECT student_email FROM signup_requests WHERE request_id = ?";

  db.query(selectEmailQuery, [id], (error, results) => {
    if (error) throw error;

    const studentEmail = results[0].student_email;

    const mailPoster = nodeMailer.createTransport({
      service: "naver",
      host: "smtp.naver.com",
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailData = {
      from: process.env.MAIL_USER,
      to: studentEmail,
      subject: "[경동대학교 외박신청] 회원가입이 승인 되었습니다.",
      text: "회원가입이 승인 되었습니다.",
    };

    const sendMail = (mailOption) => {
      mailPoster.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    };

    sendMail(mailData);
  });

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
  const sqlQuery = "UPDATE signup_requests SET request_status = '거부', rejection_reason = ? WHERE request_id = ?";

  const selectEmailQuery = "SELECT student_email FROM signup_requests WHERE request_id = ?";

  db.query(selectEmailQuery, [id], (error, results) => {
    if (error) throw error;

    const studentEmail = results[0].student_email;

    const mailPoster = nodeMailer.createTransport({
      service: "naver",
      host: "smtp.naver.com",
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailData = {
      from: process.env.MAIL_USER,
      to: studentEmail,
      subject: "[경동대학교 외박신청] 회원가입이 거부 되었습니다.",
      text: `회원가입이 거부 되었습니다. \n거부 사유: ${rejectionReason}`,
    };

    const sendMail = (mailOption) => {
      mailPoster.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    };

    sendMail(mailData);
  });

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
    adminFloor: "",
  };

  const query = "SELECT * FROM students where student_id = ?";

  if (id && studentPassword) {
    db.query(query, [id], (error, results) => {
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
          // console.log(results);
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
                  sendData.adminFloor = results[0].admin_floor;
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
