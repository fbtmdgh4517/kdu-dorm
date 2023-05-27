const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/todayStatistics", (req, res) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();

  const sendData = [];

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
    sendData.push({ id: "외박 신청 수", value: results[0]["COUNT(*)"] });
    sendData.push({ id: "외박 신청 승인 수", value: results[1]["COUNT(*)"] });
    sendData.push({ id: "외박 신청 거부 수", value: results[2]["COUNT(*)"] });
    sendData.push({ id: "점호 완료 인원 수", value: results[3]["COUNT(*)"] });
    sendData.push({ id: "외박 인원 수", value: results[4]["COUNT(*)"] });
    sendData.push({ id: "무단 외박 인원 수", value: results[5]["COUNT(*)"] });
    sendData.push({ id: "벌점 받은 인원 수", value: results[6]["COUNT(*)"] });
    sendData.push({ id: "상점 받은 인원 수", value: results[7]["COUNT(*)"] });
    console.log(sendData);
    res.send(sendData);
  });
});

router.get("/compareStatistics/:day", (req, res) => {
  const day = req.params.day;
  const query =
    "SELECT record_date, dayofweek(record_date) as _day, count(*), is_checked " +
    "FROM rollcall_records " +
    "WHERE is_checked = '무단외박' " +
    `AND record_date >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(record_date), record_date " +
    "UNION ALL " +
    "SELECT record_date, dayofweek(record_date) as _day, count(*), is_checked " +
    "FROM rollcall_records " +
    "WHERE is_checked = '외박' " +
    `AND record_date >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(record_date), record_date " +
    "UNION ALL " +
    "SELECT record_date, dayofweek(record_date) as _day, count(*), is_checked " +
    "FROM rollcall_records " +
    "WHERE is_checked = '완료' " +
    `AND record_date >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(record_date), record_date " +
    "ORDER BY record_date";

  const applicationQuery =
    "SELECT date(application_time) application_date, dayofweek(date(application_time)) as _day, count(*), approval_status " +
    "FROM overnight_applications " +
    "WHERE approval_status = '승인' " +
    `AND application_time >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(date(application_time)), date(application_time) " +
    "UNION ALL " +
    "SELECT date(application_time), dayofweek(date(application_time)) as _day, count(*), approval_status " +
    "FROM overnight_applications " +
    "WHERE approval_status = '거부' " +
    `AND application_time >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(date(application_time)), date(application_time) " +
    "ORDER BY application_date";

  const pointQuery =
    "SELECT date(score_date) score_date, dayofweek(date(score_date)) as _day, count(*), score_type " +
    "FROM score_records " +
    "WHERE score_type = '상점' " +
    `AND score_date >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(date(score_date)), date(score_date) " +
    "UNION ALL " +
    "SELECT date(score_date), dayofweek(date(score_date)) as _day, count(*), score_type " +
    "FROM score_records " +
    "WHERE score_type = '벌점' " +
    `AND score_date >= CURRENT_DATE() - INTERVAL ${day} DAY ` +
    "GROUP BY dayofweek(date(score_date)), date(score_date) " +
    "ORDER BY score_date";

  const sendData = {
    rollCallCompareStatistics: [],
    applicationCompareStatistics: [],
    pointCompareStatistics: [],
  };

  db.query(query, (error, results) => {
    if (error) throw error;
    sendData.rollCallCompareStatistics = results;
  });

  db.query(applicationQuery, (error, results) => {
    if (error) throw error;
    sendData.applicationCompareStatistics = results;
  });

  db.query(pointQuery, (error, results) => {
    if (error) throw error;
    sendData.pointCompareStatistics = results;
    res.send(sendData);
  });
});

router.get("/statistics/:day", (req, res) => {
  const day = req.params.day;
  const applicationQuery =
    "SELECT count(*) as value " +
    "FROM overnight_applications " +
    `WHERE application_time BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND approval_status = '승인' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM overnight_applications " +
    `WHERE application_time BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND approval_status = '거부' ";

  const rollCallQuery =
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    `WHERE record_date BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND is_checked = '완료' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    `WHERE record_date BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND is_checked = '외박' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    `WHERE record_date BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND is_checked = '무단외박' ";

  const pointQuery =
    "SELECT count(*) as value " +
    "FROM score_records " +
    `WHERE score_date BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND score_type = '상점' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM score_records " +
    `WHERE score_date BETWEEN date_add(now(), INTERVAL -${day} DAY) AND now() ` +
    "AND score_type = '벌점'";

  const query = applicationQuery + "UNION ALL " + rollCallQuery + "UNION ALL " + pointQuery;

  const sendData = {
    applicationStatistics: {
      "승인된 외박신청 수": 0,
      "거부된 외박신청 수": 0,
    },
    rollCallStatistics: {
      "점호 완료 인원 수": 0,
      "외박 인원 수": 0,
      "무단 외박 인원 수": 0,
    },
    pointStatistics: {
      "상점 부여 횟수": 0,
      "벌점 부여 횟수": 0,
    },
  };

  db.query(query, (error, results) => {
    if (error) throw error;
    sendData.applicationStatistics["승인된 외박신청 수"] = results[0];
    sendData.applicationStatistics["거부된 외박신청 수"] = results[1];
    sendData.rollCallStatistics["점호 완료 인원 수"] = results[2];
    sendData.rollCallStatistics["외박 인원 수"] = results[3];
    sendData.rollCallStatistics["무단 외박 인원 수"] = results[4];
    sendData.pointStatistics["상점 부여 횟수"] = results[5];
    sendData.pointStatistics["벌점 부여 횟수"] = results[6];
    res.send(sendData);
  });
});

router.get("/monthlyStatistics", (req, res) => {
  const applicationQuery =
    "SELECT count(*) as value " +
    "FROM overnight_applications " +
    "WHERE application_time BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND approval_status = '승인' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM overnight_applications " +
    "WHERE application_time BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND approval_status = '거부' ";

  const rollCallQuery =
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND is_checked = '완료' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND is_checked = '외박' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM rollcall_records " +
    "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND is_checked = '무단외박' ";

  const pointQuery =
    "SELECT count(*) as value " +
    "FROM score_records " +
    "WHERE score_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND score_type = '상점' " +
    "UNION ALL " +
    "SELECT count(*) as value " +
    "FROM score_records " +
    "WHERE score_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
    "AND score_type = '벌점'";

  const query = applicationQuery + "UNION ALL " + rollCallQuery + "UNION ALL " + pointQuery;

  const sendData = {
    applicationStatistics: {
      "승인된 외박신청 수": 0,
      "거부된 외박신청 수": 0,
    },
    rollCallStatistics: {
      "점호 완료 인원 수": 0,
      "외박 인원 수": 0,
      "무단 외박 인원 수": 0,
    },
    pointStatistics: {
      "상점 부여 횟수": 0,
      "벌점 부여 횟수": 0,
    },
  };

  db.query(query, (error, results) => {
    if (error) throw error;
    sendData.applicationStatistics["승인된 외박신청 수"] = results[0];
    sendData.applicationStatistics["거부된 외박신청 수"] = results[1];
    sendData.rollCallStatistics["점호 완료 인원 수"] = results[2];
    sendData.rollCallStatistics["외박 인원 수"] = results[3];
    sendData.rollCallStatistics["무단 외박 인원 수"] = results[4];
    sendData.pointStatistics["상점 부여 횟수"] = results[5];
    sendData.pointStatistics["벌점 부여 횟수"] = results[6];
    res.send(sendData);
  });
});

// router.get("/weeklyCompareStatistics", (req, res) => {
//   const todayDate = new Date();
//   const year = todayDate.getFullYear();
//   const month = todayDate.getMonth() + 1;
//   const date = todayDate.getDate();

//   const sendData = {
//     applicationStatistics: [],
//     rollCallStatistics: [],
//   };

//   const applicationQuery =
//     "SELECT '외박신청 승인 수' as id, date(application_time) application_date, count(*) " +
//     "FROM overnight_applications " +
//     "WHERE application_time BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
//     "AND approval_status = '승인' " +
//     "GROUP BY date(application_time) " +
//     "UNION ALL " +
//     "SELECT '외박신청 거부 수' as id, date(application_time) application_date, count(*) " +
//     "FROM overnight_applications " +
//     "WHERE application_time BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
//     "AND approval_status = '거부' " +
//     "GROUP BY date(application_time) " +
//     "ORDER BY application_date";

//   const rollCallQuery =
//     "SELECT '외박 인원 수' as id, record_date, count(*) " +
//     "FROM rollcall_records " +
//     "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
//     "AND is_checked = '외박' " +
//     "GROUP BY record_date " +
//     "UNION ALL " +
//     "SELECT '무단 외박 인원 수' as id, record_date, count(*) " +
//     "FROM rollcall_records " +
//     "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
//     "AND is_checked = '무단외박' " +
//     "GROUP BY record_date " +
//     "UNION ALL " +
//     "SELECT '점호 완료 인원 수' as id, record_date, count(*) " +
//     "FROM rollcall_records " +
//     "WHERE record_date BETWEEN date_add(now(), INTERVAL -1 WEEK) AND now() " +
//     "AND is_checked = '완료' " +
//     "GROUP BY record_date " +
//     "ORDER BY record_date";

//   db.query(applicationQuery, (error, results) => {
//     if (error) throw error;
//     // console.log(results);
//     sendData.applicationStatistics = results;
//     // res.send(sendData);
//   });

//   db.query(rollCallQuery, (error, results) => {
//     if (error) throw error;
//     // console.log(results);
//     sendData.rollCallStatistics = results;
//     console.log(sendData);
//     res.send(sendData);
//   });
// });

module.exports = router;
