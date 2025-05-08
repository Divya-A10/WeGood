const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// API route for chatbot interaction
router.post("/chat", async (req, res) => {
    try {
      const message = req.body.message || req.body.userMessage;
      if (!message) {
        return res.status(400).json({ error: "No message provided." });
      }
  
      const prompt = `You are an empathetic mental health chatbot. Respond with care and emotional support. User said: ${message}`;
      const result = await model.generateContent(prompt);
      const botMessage = result?.response?.text() || "Sorry, I couldn't process that.";
  
      res.json({ botMessage });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Something went wrong." });
    }
  });

// Frontend integration for chatbot interaction
router.post("/frontend-chat", async (req, res) => {
  try {
    const { userMessage } = req.body;
    const prompt = `You are an empathetic mental health chatbot. Respond with care and emotional support. User said: ${userMessage}`;
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage }) // or { message }
      });
    const botMessage = response?.response?.text() || "Sorry, I couldn't process that.";
    res.json({ botMessage });
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    res.status(500).json({ error: "Error connecting to API." });
  }
});
module.exports = router;