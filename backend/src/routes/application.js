const express = require("express");
const router = express.Router();
const db = require("../../db");
// const nodeMailer = require("nodemailer");

router.get("/ownlist", (req, res) => {
  console.log("ownlist");
  // console.log(req.session);
  const studentId = req.session.student_id;
  const sqlQuery =
    "SELECT overnight_applications.*, students.student_name FROM overnight_applications join students on students.student_id = overnight_applications.student_id WHERE overnight_applications.student_id = ?";
  db.query(sqlQuery, [studentId], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get("/list", (req, res) => {
  console.log("list");
  const adminFloor = req.session.admin_floor;
  const sqlQuery = `SELECT overnight_applications.*, students.student_name, students.student_room FROM overnight_applications join students on students.student_id = overnight_applications.student_id WHERE students.student_room LIKE '${adminFloor}%' ORDER BY overnight_applications.application_id DESC`;
  db.query(sqlQuery, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.post("/application", (req, res) => {
  console.log("외박신청 라우터");
  const studentId = req.body.student_id;
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;
  const reason = req.body.reason;
  const sendData = { isSuccess: "" };
  const sqlQuery = "INSERT INTO overnight_applications (student_id, start_date, end_date, application_reason) VALUES (?, ?, ?, ?)";

  if (studentId && startDate && endDate && reason) {
    db.query(sqlQuery, [studentId, startDate, endDate, reason], (error, result) => {
      if (error) throw error;
      sendData.isSuccess = "True";
      res.send(sendData);
    });
  }
});

router.get("/detail/:id", (req, res) => {
  const applicationId = req.params.id;
  const query =
    "SELECT overnight_applications.*, students.student_name, students.student_department, students.student_contact, students.student_room " +
    "FROM overnight_applications, students " +
    "WHERE overnight_applications.student_id = students.student_id " +
    "AND overnight_applications.application_id = ?";

  db.query(query, [applicationId], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.put("/accept/:id", (req, res) => {
  const applicationId = req.params.id;
  const sqlQuery = "UPDATE overnight_applications SET approval_status = '승인' WHERE application_id = ?";

  db.query(sqlQuery, [applicationId], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.put("/refuse/:id", (req, res) => {
  console.log("외박신청 거부");
  const rejectionReason = req.body.rejection_reason;
  // const id = req.params.id;

  const sqlQuery = "UPDATE overnight_applications SET approval_status = '거부', rejection_reason = ? WHERE application_id = ?";

  //     const selectEmailQuery = "SELECT s.student_email FROM students s, overnight_applications o WHERE s.student_id = o.student_id and o.application_id = ?";

  //   db.query(selectEmailQuery, [id], (error, results) => {
  //     if (error) throw error;

  //     const studentEmail = results[0].student_email;

  //     const mailPoster = nodeMailer.createTransport({
  //       service: "naver",
  //       host: "smtp.naver.com",
  //       port: 587,
  //       auth: {
  //         user: process.env.MAIL_USER,
  //         pass: process.env.MAIL_PASSWORD,
  //       },
  //     });

  //     const mailData = {
  //       from: process.env.MAIL_USER,
  //       to: studentEmail,
  //       subject: "[경동대학교 외박신청] 외박신청이 거부 되었습니다.",
  //       text: "회원가입이 승인 되었습니다.",
  //     };

  //     const sendMail = (mailOption) => {
  //       mailPoster.sendMail(mailOption, (err, info) => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           console.log("Email sent: " + info.response);
  //         }
  //       });
  //     };

  //     sendMail(mailData);
  //   });
  db.query(sqlQuery, [rejectionReason, req.params.id], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.patch("/update/:id", (req, res) => {
  console.log("외박신청 수정");
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;
  const reason = req.body.reason;
  const sqlQuery = "UPDATE overnight_applications SET start_date = ?, end_date = ?, application_reason = ? WHERE application_id = ?";

  db.query(sqlQuery, [startDate, endDate, reason, req.params.id], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  console.log("외박신청 삭제");
  const sqlQuery = "DELETE FROM overnight_applications WHERE application_id = ?";

  db.query(sqlQuery, [req.params.id], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

module.exports = router;
