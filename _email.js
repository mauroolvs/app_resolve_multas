const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

// @route    POST api/emails
// @desc     Add new email
// @access   Public
router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    let existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(200).json({ msg: 'Email subscribed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/emails
// @desc     Get all subscribed emails
// @access   Private (or Public, based on your needs)
router.get('/', async (req, res) => {
  try {
    const emails = await Email.find().sort({ date: -1 });
    res.json(emails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
