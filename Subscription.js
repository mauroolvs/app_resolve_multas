const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
