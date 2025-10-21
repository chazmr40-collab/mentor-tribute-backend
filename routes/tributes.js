const express = require('express');
const router = express.Router();
const Tribute = require('../models/Tribute'); // adjust path if your model lives elsewhere

router.post('/', async (req, res) => {
  try {
    const { mentee, mentor, location, message } = req.body;

    // validation
    if (!mentee || !mentor || !message) {
      return res.status(400).json({ error: 'mentee, mentor and message are required' });
    }

    const tribute = new Tribute({ mentee, mentor, location, message });
    const saved = await tribute.save();

    // log and respond
    console.log(`Tribute saved: id=${saved._id} mentee=${saved.mentee} mentor=${saved.mentor}`);
    return res.status(201).json({
      mentee: saved.mentee,
      mentor: saved.mentor,
      location: saved.location,
      message: saved.message,
      _id: saved._id,
      createdAt: saved.createdAt
    });
  } catch (err) {
    console.error('Error saving tribute:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


