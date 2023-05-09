const express = require('express');
const db = require('../../db');
const router = express.Router();

router.get('/list', (req, res) => {
    db.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.put('/bonusPoint', (req, res) => {
    const studentId = req.body.student_id;
    const bonusPoint = req.body.bonusPoint;
    const scoreReason = req.body.score_reason;
    const updateQuery = 'UPDATE students SET bonus_point = bonus_point + ? WHERE student_id = ?';
    const insertQuery =
        'INSERT INTO score_records (student_id, score_type, given_score, score_reason) VALUES (?, "상점", ?, ?)';
    db.query(updateQuery, [bonusPoint, studentId], (error, results) => {
        if (error) throw error;
    });
    db.query(insertQuery, [studentId, bonusPoint, scoreReason], (error, results) => {
        if (error) throw error;
        res.status(200).send('상점 부여 완료');
    });
});

router.put('/penaltyPoint', (req, res) => {
    const { student_id, penalty_point, score_reason } = req.body;
    const updateQuery = 'UPDATE students SET penalty_point = penalty_point + ? WHERE student_id = ?';
    const insertQuery =
        'INSERT INTO score_records (student_id, score_type, given_score, score_reason) VALUES (?, "벌점", ?, ?)';
    db.query(updateQuery, [penalty_point, student_id], (error, results) => {
        if (error) throw error;
    });
    db.query(insertQuery, [student_id, penalty_point, score_reason], (error, results) => {
        if (error) throw error;
        res.status(200).send('벌점 부여 완료');
    });
});
module.exports = router;