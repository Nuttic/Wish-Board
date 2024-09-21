require("dotenv").config();
const express = require("express");

const serverConfig = require('./config/serverConfig');
const indexRouter = require("./routes/index.routes");

const app = express();
serverConfig(app);

const PORT = process.env.PORT || 4000;

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`running on port http://localhost:${PORT}`);
});
