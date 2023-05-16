const express = require("express");
const db = require("../../db");

const router = express.Router();

router.post("/checkComplete", (req, res) => {
  const studentId = req.body.studentId;
  const isChecked = req.body.isChecked;
  const date = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < studentId.length; i++) {
    // console.log(studentId[i], isChecked[i], date);
    const query = `INSERT INTO rollcall_records (student_id, is_checked, record_date) VALUES (${studentId[i]}, "${isChecked[i]}", "${date}")`;
    db.query(query, (error, results) => {
      if (error) throw error;
      // res.status(200).send("출석체크 완료");
      console.log("점호 완료");
    });
  }
});

router.get("/rollCallList/:date", (req, res) => {
  const date = req.params.date;
  // console.log(date);
  const query = `SELECT * FROM rollcall_records WHERE record_date = "${date}"`;
  console.log(query);
  db.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
