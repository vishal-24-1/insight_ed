const { processWithGemini } = require('../services/geminiServices'); // Import Gemini service
const path = require('path'); // For file path management

exports.uploadFiles = async (req, res, next) => {
  try {
    console.log("Request received at /api/upload");

    // Log uploaded files
    console.log("Uploaded Files:", req.files);

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ message: "Please upload all three files (questionPaper, answerSheet, answerKey)." });
    }

    const [questionPaper, answerSheet, answerKey] = req.files.map((file) => ({
      path: file.path,
      originalName: file.originalname,
    }));

     // Log the payload being sent to the Gemini API
    console.log("Sending to Gemini API:", {
      questionPaper,
      answerSheet,
      answerKey,
      prompt: "Static prompt for file analysis",
    });

    // Static prompt example
    const insights = await processWithGemini({
      questionPaper,
      answerSheet,
      answerKey,
      prompt: "Static prompt for file analysis",
    });

    console.log("Insights generated:", insights);
    res.status(200).json({ insights });
  } catch (error) {
    console.error("Error in uploadFiles controller:", error.message);
    res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
};
