const { admin } = require('../firebase');
const db = admin.firestore();

exports.createStore = async (req, res) => {
  try {
    const { name, slug, description, theme } = req.body;
    if (!name || !slug) return res.status(400).json({ message: 'name and slug required' });
    const storeRef = db.collection('stores').doc();
    const data = { name, slug, description: description||'', ownerId: req.user.uid, theme: theme||'default', createdAt: admin.firestore.FieldValue.serverTimestamp(), active: true };
    await storeRef.set(data);
    return res.json({ id: storeRef.id, ...data });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.getStorePublic = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('stores').doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Store not found' });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.listStores = async (req, res) => {
  try {
    const snapshot = await db.collection('stores').where('active','==',true).limit(50).get();
    const items = snapshot.docs.map(d=>({ id: d.id, ...d.data() }));
    return res.json(items);
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};
