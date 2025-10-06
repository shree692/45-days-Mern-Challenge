const { errorResponse } = require("../utils/response");

function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(500).json(errorResponse("Internal Server Error", "INTERNAL_ERROR"));
}

module.exports = errorHandler;
