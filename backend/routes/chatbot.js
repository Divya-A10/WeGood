const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// API route for chatbot interaction
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = `You are an empathetic mental health chatbot. Respond with care and emotional support. User said: ${message}`;
    const response = await model.generateContent(prompt);
    res.json({ response: response.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
