const express = require("express");
const db = require("../../db");
const router = express.Router();

router.get("/list", (req, res) => {
    db.query("SELECT * FROM students ORDER BY student_name", (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.get("/penaltyDangerStudentsList", (req, res) => {
    const query = "SELECT * FROM students WHERE penalty_point >= 7 ORDER BY penalty_point DESC";
    db.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.put("/bonusPoint", (req, res) => {
    const studentId = req.body.student_id;
    const bonusPoint = req.body.bonusPoint;
    const scoreReason = req.body.score_reason;
    const updateQuery = "UPDATE students SET bonus_point = bonus_point + ? WHERE student_id = ?";
    const insertQuery = 'INSERT INTO score_records (student_id, score_type, given_score, score_reason) VALUES (?, "상점", ?, ?)';
    db.query(updateQuery, [bonusPoint, studentId], (error, results) => {
        if (error) throw error;
    });
    db.query(insertQuery, [studentId, bonusPoint, scoreReason], (error, results) => {
        if (error) throw error;
        res.status(200).send("상점 부여 완료");
    });
});

router.put("/penaltyPoint", (req, res) => {
    const { student_id, penalty_point, score_reason } = req.body;
    const updateQuery = "UPDATE students SET penalty_point = penalty_point + ? WHERE student_id = ?";
    const insertQuery = 'INSERT INTO score_records (student_id, score_type, given_score, score_reason) VALUES (?, "벌점", ?, ?)';
    db.query(updateQuery, [penalty_point, student_id], (error, results) => {
        if (error) throw error;
    });
    db.query(insertQuery, [student_id, penalty_point, score_reason], (error, results) => {
        if (error) throw error;
        res.status(200).send("벌점 부여 완료");
    });
});

router.get("/studentInfo", (req, res) => {
    const studentId = req.session.student_id;
    const query = "SELECT * FROM students WHERE student_id = ?";
    db.query(query, [studentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.get("/studentInfo/:id", (req, res) => {
    const studentId = req.params.id;
    const query = "SELECT * FROM students WHERE student_id = ?";
    db.query(query, [studentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.get("/pointRecords", (req, res) => {
    const studentId = req.session.student_id;
    const query = "SELECT * FROM score_records WHERE student_id = ? ORDER BY score_date DESC";
    db.query(query, [studentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 호실별 학생 목록
router.get("/list/:room", (req, res) => {
    const room = req.body.room;
    const query = "SELECT * FROM students WHERE room = ? ORDER BY student_name";
    db.query(query, [room], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

module.exports = router;
