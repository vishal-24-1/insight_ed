const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.processWithGemini = async ({ questionPaper, answerSheet, answerKey, prompt }) => {
  try {
    const formData = new FormData();
    formData.append('questionPaper', fs.createReadStream(questionPaper.path));
    formData.append('answerSheet', fs.createReadStream(answerSheet.path));
    formData.append('answerKey', fs.createReadStream(answerKey.path));
    formData.append('prompt', prompt);

    console.log("Sending request to Gemini API...");
    const response = await axios.post(process.env.GEMINI_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
    });

    console.log("Gemini API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in Gemini API Service:", error.response || error.message);
    throw new Error('Failed to process files with Gemini LLM.');
  }
};
