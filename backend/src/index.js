const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const cors = require("cors");

const noticeRouter = require("./routes/notice");
const weekDietRouter = require("./routes/weekDiet");
const authRouter = require("./routes/auth");
const applicationRouter = require("./routes/application");
const studentsRouter = require("./routes/students");
const rollCallRouter = require("./routes/rollCall");
const statisticsRouter = require("./routes/statistics");

const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });
const { COOKIE_SECRET, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  clearExpired: true,
  checkExpirationInterval: 10000,
  expiration: 60 * 60 * 1000 * 2,
};

const sessionStore = new MySQLStore(options);

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
    name: "session-cookie",
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://3.39.123.237:4000"],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "../../frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use("/notice", noticeRouter);
app.use("/weekDiet", weekDietRouter);
app.use("/auth", authRouter);
app.use("/application", applicationRouter);
app.use("/students", studentsRouter);
app.use("/rollCall", rollCallRouter);
app.use("/statistics", statisticsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
