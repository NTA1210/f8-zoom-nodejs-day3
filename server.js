const express = require("express");
const appRoute = require("./src/routes");
const json = require("./src/middlewares/json.middleware");
const response = require("./src/middlewares/response.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const notFound = require("./src/middlewares/notFound.middleware");
const createRateLimiter = require("./src/middlewares/rateLimiter");
require("dotenv").config();
require("./src/config/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(json);
app.use(response);
app.use(createRateLimiter({}));

app.use("/api", appRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});
