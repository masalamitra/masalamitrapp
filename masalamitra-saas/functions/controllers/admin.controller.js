const { admin } = require('../firebase');
const db = admin.firestore();

exports.stats = async (req, res) => {
  try {
    const stores = await db.collection('stores').get();
    const orders = await db.collection('orders').get();
    return res.json({ stats: { stores: stores.size, orders: orders.size } });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.listUsers = async (req, res) => {
  try {
    // list up to 100 users (demo)
    const list = await admin.auth().listUsers(100);
    const items = list.users.map(u => ({ uid: u.uid, email: u.email, customClaims: u.customClaims }));
    return res.json(items);
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};
