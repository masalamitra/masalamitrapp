const { admin } = require('../firebase');
const db = admin.firestore();

exports.createAffiliate = async (req, res) => {
  try {
    const { code, percent } = req.body;
    if (!code || !percent) return res.status(400).json({ message: 'code and percent required' });
    await db.collection('affiliateCodes').add({ code, percent, owner: req.user.uid, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ message: 'Affiliate created' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.getEarnings = async (req, res) => {
  try {
    // placeholder: in real app calculate from orders table
    return res.json({ total: 0, breakdown: [] });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};
