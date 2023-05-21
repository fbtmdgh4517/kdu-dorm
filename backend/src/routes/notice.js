const express = require("express");
const FormData = require("form-data");
const axios = require("axios");
const request = require("request");
const form = new FormData();
const router = express.Router();

form.append("rows", "10");
form.append("bbs_locgbn", "KY");
form.append("bbs_id", "notice");
form.append("cPage", "1");

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

router.get("/", async (req, res) => {
  const noticeList = [];

  try {
    const res = await axios.post("https://metrodorm.kduniv.ac.kr/bbs/getBbsList.kmc", {
      rows: "10",
      bbs_locgbn: "KY",
      bbs_id: "notice",
      cPage: "1",
    });

    noticeList.push(...res.data.root[0].topList, ...res.data.root[0].list);

    const totalPages = Math.ceil(res.data.root[0].totalCount[0].cnt / 10);

    for (let i = 2; i <= totalPages; i++) {
      try {
        const res = await axios.post("https://metrodorm.kduniv.ac.kr/bbs/getBbsList.kmc", {
          rows: "10",
          bbs_locgbn: "KY",
          bbs_id: "notice",
          cPage: i.toString(),
        });

        noticeList.push(...res.data.root[0].list);
      } catch (err) {
        console.log(err);
        res.status(500).send("서버 오류");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("서버 오류");
  }
  res.send(noticeList.sort((a, b) => b.seq - a.seq));
});

module.exports = router;
