const mongoose = require('mongoose');

const previousScoresSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  winningCards: {
    type: [],
    required: true,
  },
  playedAt: {
    type: Date,
    required: true,
  },
});

const PreviousScores = mongoose.model('PreviousScores', previousScoresSchema);

module.exports = PreviousScores;