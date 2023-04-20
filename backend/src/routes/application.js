const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/ownlist', (req, res) => {
    console.log('ownlist');
    console.log(req.session);
    const studentId = req.session.student_id;
    const sqlQuery =
        'SELECT overnight_applications.*, students.student_name FROM overnight_applications join students on students.student_id = overnight_applications.student_id WHERE overnight_applications.student_id = ?';
    db.query(sqlQuery, [studentId], (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

router.get('/list', (req, res) => {
    console.log('list');
    console.log(req.session);
    const sqlQuery =
        'SELECT overnight_applications.*, students.student_name FROM overnight_applications join students on students.student_id = overnight_applications.student_id';
    db.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

router.post('/application', (req, res) => {
    console.log('외박신청 라우터');
    const studentId = req.body.student_id;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const reason = req.body.reason;
    const sendData = { isSuccess: '' };
    const sqlQuery =
        'INSERT INTO overnight_applications (student_id, start_date, end_date, application_reason) VALUES (?, ?, ?, ?)';

    if (studentId && startDate && endDate && reason) {
        db.query(sqlQuery, [studentId, startDate, endDate, reason], (error, result) => {
            if (error) throw error;
            sendData.isSuccess = 'True';
            res.send(sendData);
        });
    }
});

router.get('/:id', (req, res) => {});

module.exports = router;
