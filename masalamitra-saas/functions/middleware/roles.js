// functions/middleware/roles.js
module.exports = function(allowed = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Auth required' });
    const role = req.user.claims && (req.user.claims.role || req.user.claims.custom_role) || null;
    if (!role) return res.status(403).json({ message: 'Role not set' });
    if (!allowed.includes(role)) return res.status(403).json({ message: 'Forbidden: insufficient role' });
    req.user.role = role;
    next();
  };
};
