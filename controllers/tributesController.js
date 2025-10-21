const Tribute = require('../models/Tribute');

exports.createTribute = async (req, res) => {
  try {
    const { mentee, mentor, location, message } = req.body;
    if (!mentee || !mentor || !message) return res.status(400).json({ error: 'mentee, mentor and message are required' });
    const tribute = await Tribute.create({ mentee, mentor, location, message });
    res.status(201).json(tribute);
  } catch (err) {
    console.error('Error creating tribute:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTributes = async (req, res) => {
  try {
    const tributes = await Tribute.find().sort({ createdAt: -1 }).limit(100);
    res.json(tributes);
  } catch (err) {
    console.error('Error fetching tributes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
