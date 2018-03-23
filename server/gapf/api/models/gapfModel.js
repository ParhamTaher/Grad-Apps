const mongoose = require('mongoose');

const gapfSchema = mongoose.Schema({
  faculty_id: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Gapf = mongoose.model('Gapf', gapfSchema);

module.exports = Gapf;
