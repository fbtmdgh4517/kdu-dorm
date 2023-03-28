const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('../models');
const noticeRouter = require('./routes/notice');
const weekDietRouter = require('./routes/weekDiet');
const app = express();

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

app.use('/', express.static(path.join(__dirname, '../../frontend/build')));
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
app.use('/notice', noticeRouter);
app.use('/weekDiet', weekDietRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

const port = PORT || 4000;
app.listen(port, () => {
    console.log(port, '번 포트에서 대기 중');
});
