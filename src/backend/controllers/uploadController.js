exports.uploadFiles = async (req, res, next) => {
  try {
    console.log("Files Received:", req.files); // Log uploaded files
    console.log("Request Body:", req.body); // Log request body

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ message: 'Please upload all three files.' });
    }

    const [questionPaper, answerSheet, answerKey] = req.files.map((file) => ({
      path: file.path,
      originalName: file.originalname,
    }));

    console.log("Processing files with Gemini API...");
    const insights = await processWithGemini({
      questionPaper,
      answerSheet,
      answerKey,
      prompt: "Your static prompt here",
    });

    console.log("Gemini API Response:", insights);
    res.status(200).json({ insights });
  } catch (error) {
    console.error("Error in uploadFiles Controller:", error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
