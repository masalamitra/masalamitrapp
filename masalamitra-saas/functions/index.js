const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { functions } = require('./firebase');

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '10mb' }));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 300 });
app.use(limiter);

// Mount routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/stores', require('./routes/store.routes'));
app.use('/orders', require('./routes/order.routes'));
app.use('/delivery', require('./routes/delivery.routes'));
app.use('/razorpay', require('./routes/razorpay.routes'));
app.use('/openai', require('./routes/openai.routes'));
app.use('/ads', require('./routes/ads.routes'));
app.use('/affiliate', require('./routes/affiliate.routes'));
app.use('/admin', require('./routes/admin.routes'));

// health & status
app.get('/health', (req,res)=>res.json({status:'ok', ts:Date.now()}));
app.get('/status', (req,res)=>res.json({ uptime: process.uptime(), ts: Date.now() }));

// export as Firebase Function
exports.api = functions.https.onRequest(app);
