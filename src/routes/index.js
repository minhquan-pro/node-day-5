const fs = require("fs");

const express = require("express");
const router = express();

const routeFileSuffix = ".route.js";

fs.readdirSync(__dirname)
	.filter((filename) => filename.endsWith(routeFileSuffix))
	.forEach((routeModule) => {
		const routeName = routeModule.replace(routeFileSuffix, "").trim();
		router.use(`/${routeName}`, require(`./${routeModule}`));
	});

module.exports = router;
