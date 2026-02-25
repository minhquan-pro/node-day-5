const errorHandle = (err, req, res, _) => {
	res.error(err ?? "Server Error");
};

module.exports = errorHandle;
