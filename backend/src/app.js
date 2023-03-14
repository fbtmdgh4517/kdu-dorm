const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const request = require('request');
const cheerio = require('cheerio');
const { sequelize } = require('../models');
const app = express();
const data = new FormData();

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const { COOKIE_SECRET, PORT } = process.env;

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use('/', express.static(path.join(__dirname, '../frontend/build/index.html')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: 'session-cookie',
    })
);

app.get('/', (req, res) => {
    //get 요청 시 어떤 동작을 할지
    res.send('Hello, Express');
    // var options = {
    //     method: 'POST',
    //     url: 'https://www.kduniv.ac.kr/kor/CMS/DietMenuMgr/list.do',
    //     headers: {
    //         Cookie: 'JSESSIONID=F4E37BA5A82D4B0EFFF4CC34744F03B2.worker1',
    //     },
    //     formData: {
    //         mCode: 'MN183',
    //         searchDay: '2023-03-06',
    //         searchDietCategory: '5',
    //     },
    // };
    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     let $ = cheerio.load(body);
    //     try {
    //         $('tbody tr td').each(function (index, elem) {
    //             var rate_text = $(this).text().trim(); //해당 태그의 text부분만 잘라오기
    //             console.log(rate_text);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    // var config = {
    //     method: 'post',
    //     url: 'https://metrodorm.kduniv.ac.kr/bbs/getBbsView.kmc?seq=907&bbs_locgbn=KY&bbs_id=notice',
    //     headers: {
    //         Cookie: 'JSESSIONID="Da37_SvWUQagRes4nxCaTHxzqNke7gKncJ70h8eP.master:NON-HAKSA-1"; SCOUTER=z36j0dbdjppeus',
    //         ...data.getHeaders(),
    //     },
    //     data: data,
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
});
const port = PORT || 4000;
app.listen(port, () => {
    //포트 연결, app.get(키)를 사용해 위에서 설정했던 포트 가져옴
    console.log(port, '번 포트에서 대기 중');
});
