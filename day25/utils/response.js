function successResponse(data, filters = {}, total = null) {
  return {
    success: true,
    data,
    count: Array.isArray(data) ? data.length : (data ? 1 : 0),
    total: total ?? (Array.isArray(data) ? data.length : 1),
    filters
  };
}

function errorResponse(message, code = "SERVER_ERROR") {
  return {
    success: false,
    error: message,
    code,
    timestamp: new Date().toISOString()
  };
}

module.exports = { successResponse, errorResponse };
