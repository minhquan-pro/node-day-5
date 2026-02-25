const errorHandle = (err, req, res, _) => {
	res.error(String(err) ?? "Server Error");
};

module.exports = errorHandle;
