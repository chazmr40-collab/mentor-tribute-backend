const mongoose = require('mongoose');

const TributeSchema = new mongoose.Schema({
  mentee: { type: String, required: true },
  mentor: { type: String, required: true },
  location: { type: String },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tribute', TributeSchema);
