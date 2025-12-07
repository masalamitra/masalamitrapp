const Razorpay = require('razorpay');
const { admin } = require('../firebase');
const razor = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency='INR', receipt } = req.body;
    if (!amount) return res.status(400).json({ message: 'amount required' });
    const order = await razor.orders.create({ amount: Math.round(amount*100), currency, receipt: receipt || `rcpt_${Date.now()}` });
    return res.json(order);
  } catch (err) { console.error(err); return res.status(500).json({ message: err.message }); }
};

exports.webhook = async (req, res) => {
  console.log('razorpay webhook', req.body);
  return res.json({ ok: true });
};
