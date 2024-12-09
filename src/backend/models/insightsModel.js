const mongoose = require('mongoose');

// Define Insights Schema
const insightsSchema = new mongoose.Schema(
  {
    questionPaper: {
      type: String,
      required: true,
    },
    answerSheet: {
      type: String,
      required: true,
    },
    answerKey: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    insights: {
      type: mongoose.Schema.Types.Mixed, // Can hold any JSON structure
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Compile Schema into a Model
const Insights = mongoose.model('Insights', insightsSchema);

module.exports = Insights;
