const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const MySQLStore = require('express-mysql-session')(session);

const noticeRouter = require('./routes/notice');
const weekDietRouter = require('./routes/weekDiet');
const authRouter = require('./routes/auth');
const applicationRouter = require('./routes/application');
const app = express();
const cors = require('cors');

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });
passportConfig();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 's03203614@',
    database: 'kdu_dorm',

    clearExpired: true,
    checkExpirationInterval: 10000,
    expiration: 60 * 60 * 1000 * 2,
};

const sessionStore = new MySQLStore(options);

const { COOKIE_SECRET, PORT } = process.env;

// sequelize
//     .sync({ force: false })
//     .then(() => {
//         console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: COOKIE_SECRET,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000 * 24,
        },
        name: 'session-cookie',
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use('/', express.static(path.join(__dirname, '../../frontend/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use('/notice', noticeRouter);
app.use('/weekDiet', weekDietRouter);
app.use('/auth', authRouter);
app.use('/application', applicationRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

const port = PORT || 4000;
app.listen(port, () => {
    console.log(port, '번 포트에서 대기 중');
});
