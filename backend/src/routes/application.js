const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/ownlist", (req, res) => {
    console.log("ownlist");
    console.log(req.session);
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
    console.log(req.session);
    const sqlQuery =
        "SELECT overnight_applications.*, students.student_name FROM overnight_applications join students on students.student_id = overnight_applications.student_id";
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
    // console.log(req.params.id);
    console.log("외박신청 상세");
    const sqlQuery = "SELECT * FROM overnight_applications WHERE application_id = ?";

    db.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

router.put("/accept/:id", (req, res) => {
    console.log("외박신청 승인");
    const sqlQuery = 'UPDATE overnight_applications SET approval_status = "승인" WHERE application_id = ?';

    db.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

router.put("/refuse/:id", (req, res) => {
    console.log("외박신청 거부");
    const rejectionReason = req.body.rejection_reason;

    const sqlQuery = 'UPDATE overnight_applications SET approval_status = "거부", rejection_reason = ? WHERE application_id = ?';

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

module.exports = router;
