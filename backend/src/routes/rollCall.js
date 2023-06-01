const express = require("express");
const db = require("../../db");

const router = express.Router();

router.post("/checkComplete", (req, res) => {
  const studentId = req.body.studentId;
  const isChecked = req.body.isChecked;
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();

  for (let i = 0; i < studentId.length; i++) {
    const query = `INSERT INTO rollcall_records (student_id, is_checked, record_date) VALUES (${studentId[i]}, "${isChecked[i]}", "${year}-${month}-${day}")`;
    if (isChecked[i] === "무단외박") {
      const penaltyUpdateQuery = `UPDATE students SET penalty_point = penalty_point + 1 WHERE student_id = ${studentId[i]}`;
      const penaltyRecordQuery = `INSERT INTO score_records (student_id, score_type, given_score, score_reason) VALUES (${studentId[i]}, '벌점', 3, '점호 불참으로 인한 벌점')`;

      db.query(penaltyUpdateQuery, (error, results) => {
        if (error) throw error;
      });

      db.query(penaltyRecordQuery, (error, results) => {
        if (error) throw error;
      });
    }
    db.query(query, (error, results) => {
      if (error) throw error;
      console.log("점호 완료");
    });
  }
  res.status(200).send("출석체크 완료");
});

router.get("/rollCallList/:date", (req, res) => {
  const date = req.params.date;
  const adminFloor = req.session.admin_floor;
  // console.log(date);
  const query = `SELECT * FROM rollcall_records r, students s WHERE record_date = '${date}' AND r.student_id = s.student_id AND s.student_room LIKE '${adminFloor}%'`;
  // console.log(query);
  db.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
