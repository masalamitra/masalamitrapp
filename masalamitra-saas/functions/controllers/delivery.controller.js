const { admin } = require('../firebase');
const db = admin.firestore();

exports.assignCourier = async (req, res) => {
  try {
    const { orderId, courierId } = req.body;
    if (!orderId || !courierId) return res.status(400).json({ message: 'orderId & courierId required' });
    const orderRef = db.collection('orders').doc(orderId);
    await orderRef.update({ deliveryUid: courierId, status: 'assigned', assignedAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ message: 'Courier assigned' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.uploadProof = async (req, res) => {
  try {
    const { orderId, proofUrl } = req.body;
    if (!orderId || !proofUrl) return res.status(400).json({ message: 'orderId & proofUrl required' });
    await db.collection('deliveryProofs').add({ orderId, proofUrl, uploadedAt: admin.firestore.FieldValue.serverTimestamp(), uploadedBy: req.user.uid });
    return res.json({ message: 'Proof saved' });
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.listTasks = async (req, res) => {
  try {
    const snapshot = await db.collection('orders').where('deliveryUid', '==', req.user.uid).where('status', 'in', ['assigned','dispatched']).get();
    const items = snapshot.docs.map(d=>({ id:d.id, ...d.data() }));
    return res.json(items);
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};
