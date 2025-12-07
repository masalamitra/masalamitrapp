const { admin } = require('../firebase');

exports.signup = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email + password required' });
    const userRecord = await admin.auth().createUser({ email, password, displayName });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'customer' });
    return res.json({ uid: userRecord.uid, email: userRecord.email });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.setRole = async (req, res) => {
  try {
    const { uid, role } = req.body;
    if (!uid || !role) return res.status(400).json({ message: 'uid and role required' });
    const callerClaims = req.user && req.user.claims;
    if (!callerClaims || callerClaims.role !== 'superadmin') return res.status(403).json({ message: 'Only superadmin can set roles' });
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.json({ message: 'Role set' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.whoami = async (req, res) => {
  return res.json({ uid: req.user.uid, email: req.user.email, role: req.user.role });
};
