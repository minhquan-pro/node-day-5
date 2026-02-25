require("dotenv").config();
require("module-alias/register");

const express = require("express");
const app = express();
const port = 3000;

const rootRoute = require("@/routes");
const responseFormat = require("@/middlewares/responseFormat");
const notFound = require("@/middlewares/notFound");
const errorHandler = require("@/middlewares/errorHandle");

app.use("/api", rootRoute);
app.use(express.json());
app.use(responseFormat);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
