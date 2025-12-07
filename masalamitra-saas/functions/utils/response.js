exports.ok = (res, data) => res.json({ success: true, data });
exports.err = (res, status=500, message='Server error') => res.status(status).json({ success:false, message });
