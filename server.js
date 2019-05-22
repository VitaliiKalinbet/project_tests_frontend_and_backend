const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
mongoose.Promise = global.Promise;

const passport = require("passport");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const config = require("./server/config/config");
const DB = config.db_url;
const server_port = config.port;

const userRoutes = require("./server/routes/userRoutes");
const testRoutes = require("./server/routes/testRoutes");
const moduleRoutes = require("./server/routes/moduleRoutes");
const resultsRoutes = require("./server/routes/resultsRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    key: "keys",
    saveUninitialized: false,
    resave: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

require("./config/passport-config");
app.use(passport.initialize({ userProperty: "payload" }));
app.use(passport.session());

app.use(cors({ origin: "*" }));
app.use("/", express.static("build"));
app.use("/tests", express.static("build"));
app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/results", resultsRoutes);

app.use((req, res) => res.status(404).json({ err: "404" }));
app.use((err, req, res) => {
  console.log(err.stack);
  res.status(500).json({ err: "500" });
});

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(
    () => console.log("Database is connected"),
    err => console.log("Can not connect to the database" + err)
  );

app.listen(server_port, () =>
  console.log("Server is running on ", server_port)
);
