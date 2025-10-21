// fix-tribute.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mentor-tribute';
const TributesSchema = new mongoose.Schema({}, { strict: false, collection: 'tributes' });
const Tribute = mongoose.model('Tribute', TributesSchema);

async function run() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB');

  const bad = await Tribute.findOne({ mentee: 'Dr. Elaine Carter' }).lean();
  if (!bad) {
    console.log('No document found for mentee \"Dr. Elaine Carter\". Exiting.');
    await mongoose.disconnect();
    return;
  }
  console.log('Found document:', bad);

  const clean = {
    mentee: 'Dr. Elaine Carter',
    mentor: bad.mentor || 'Unknown',
    location: bad.location || 'Diagnostic Imaging',
    message: bad.message || 'Her mentorship transformed my career and confidence.',
    createdAt: bad.createdAt || new Date()
  };

  await Tribute.deleteOne({ _id: bad._id });
  const inserted = await Tribute.create(clean);
  console.log('Replaced malformed document with clean document:', inserted);

  await mongoose.disconnect();
  console.log('Done, disconnected.');
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
