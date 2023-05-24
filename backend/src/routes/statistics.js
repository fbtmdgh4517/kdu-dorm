const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/todayStatistics", (req, res) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();
  const sendData = {
    todayApplicationCount: 0,
    todayApplicationAcceptCount: 0,
    todayApplicationRejectCount: 0,
    todayRollcallCompletePersonnelCount: 0,
    todayRollcallOvernightPersonnelCount: 0,
    todayRollcallUncompletePersonnelCount: 0,
    todayPenaltyPointPersonnelCount: 0,
    todayBonusPointPersonnelCount: 0,
  };

  const sendData2 = [];

  const query =
    `SELECT COUNT(*) FROM overnight_applications WHERE YEAR(application_time) = ${year} AND MONTH(application_time) = ${month} AND DAY(application_time) = ${day} ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM overnight_applications WHERE YEAR(application_time) = ${year} AND MONTH(application_time) = ${month} AND DAY(application_time) = ${day} AND approval_status = '승인' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM overnight_applications WHERE YEAR(application_time) = ${year} AND MONTH(application_time) = ${month} AND DAY(application_time) = ${day} AND approval_status = '거부' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM rollcall_records WHERE YEAR(record_date) = ${year} AND MONTH(record_date) = ${month} AND DAY(record_date) = ${day} AND is_checked = '완료' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM rollcall_records WHERE YEAR(record_date) = ${year} AND MONTH(record_date) = ${month} AND DAY(record_date) = ${day} AND is_checked = '외박' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM rollcall_records WHERE YEAR(record_date) = ${year} AND MONTH(record_date) = ${month} AND DAY(record_date) = ${day} AND is_checked = '무단외박' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM score_records WHERE YEAR(score_date) = ${year} AND MONTH(score_date) = ${month} AND DAY(score_date) = ${day} AND score_type = '벌점' ` +
    "UNION ALL " +
    `SELECT COUNT(*) FROM score_records WHERE YEAR(score_date) = ${year} AND MONTH(score_date) = ${month} AND DAY(score_date) = ${day} AND score_type = '상점'`;

  db.query(query, (error, results) => {
    if (error) throw error;
    // console.log(results);
    // sendData.todayApplicationCount = results[0]["COUNT(*)"];
    // sendData.todayApplicationAcceptCount = results[1]["COUNT(*)"];
    // sendData.todayApplicationRejectCount = results[2]["COUNT(*)"];
    // sendData.todayRollcallCompletePersonnelCount = results[3]["COUNT(*)"];
    // sendData.todayRollcallOvernightPersonnelCount = results[4]["COUNT(*)"];
    // sendData.todayRollcallUncompletePersonnelCount = results[5]["COUNT(*)"];
    // sendData.todayPenaltyPointPersonnelCount = results[6]["COUNT(*)"];
    // sendData.todayBonusPointPersonnelCount = results[7]["COUNT(*)"];
    sendData2.push({ id: "외박 신청 수", value: results[0]["COUNT(*)"] });
    sendData2.push({ id: "외박 신청 승인 수", value: results[1]["COUNT(*)"] });
    sendData2.push({ id: "외박 신청 거부 수", value: results[2]["COUNT(*)"] });
    sendData2.push({ id: "점호 완료 인원 수", value: results[3]["COUNT(*)"] });
    sendData2.push({ id: "외박 인원 수", value: results[4]["COUNT(*)"] });
    sendData2.push({ id: "무단 외박 인원 수", value: results[5]["COUNT(*)"] });
    sendData2.push({ id: "벌점 받은 인원 수", value: results[6]["COUNT(*)"] });
    sendData2.push({ id: "상점 받은 인원 수", value: results[7]["COUNT(*)"] });
    res.send(sendData2);
  });
});

module.exports = router;
