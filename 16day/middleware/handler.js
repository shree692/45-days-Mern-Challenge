module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success:false, message:'Validation Error', errors: Object.values(err.errors).map(e=>e.message) });
  }
  res.status(err.status || 500).json({ success:false, message: err.message || 'Server error' });
};