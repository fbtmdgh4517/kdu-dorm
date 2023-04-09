const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/list', (req, res) => {
    console.log('list');
    console.log(req.session);
    const studentId = req.session.student_id;
    const sqlQuery =
        'SELECT overnight_applications.*, students.student_name FROM overnight_applications join students on students.student_id = overnight_applications.student_id WHERE overnight_applications.student_id = ?';
    db.query(sqlQuery, [studentId], (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

module.exports = router;
