const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

router.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide both name and email' });
  }

  try {
    const newSubscription = new Subscription({ name, email });
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
