const { admin } = require('../firebase');
const db = admin.firestore();

exports.createOrder = async (req, res) => {
  try {
    const { storeId, items, total, address, affiliateCode } = req.body;
    if (!storeId || !items || items.length === 0) return res.status(400).json({ message: 'Invalid order' });
    const orderRef = db.collection('orders').doc();
    const data = { storeId, items, total, address, affiliateCode: affiliateCode||null, status:'created', customerId: req.user.uid, createdAt: admin.firestore.FieldValue.serverTimestamp() };
    await orderRef.set(data);
    return res.json({ id: orderRef.id, ...data });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('orders').doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Order not found' });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.vendorAccept = async (req, res) => {
  try {
    const { id } = req.params;
    const orderRef = db.collection('orders').doc(id);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) return res.status(404).json({ message: 'Order not found' });
    const orderData = orderDoc.data();
    const storeDoc = await db.collection('stores').doc(orderData.storeId).get();
    if (!storeDoc.exists) return res.status(404).json({ message: 'Store not found' });
    if (storeDoc.data().ownerId !== req.user.uid && req.user.role !== 'superadmin') return res.status(403).json({ message: 'Not allowed' });
    await orderRef.update({ status: 'accepted', acceptedAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ message: 'Accepted' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.assignDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryUid } = req.body;
    if (!deliveryUid) return res.status(400).json({ message: 'deliveryUid required' });
    const orderRef = db.collection('orders').doc(id);
    await orderRef.update({ deliveryUid, status: 'assigned', assignedAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ message: 'Assigned' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params; const { status } = req.body;
    const allowed = ['packing','dispatched','delivered','cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const orderRef = db.collection('orders').doc(id);
    await orderRef.update({ status, statusAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ message: 'Status updated' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};
