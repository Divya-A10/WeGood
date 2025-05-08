require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const chatbotRoutes = require("./routes/chatbot");
const spotifyRoutes = require("./routes/spotify");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Gemini API
const { Schema } = mongoose;

const app = express();
const PORT = 3000;

// Routes
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/spotify", spotifyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));
app.use(express.static(__dirname));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "WeGood.html"));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mentalhealtDB', {
  
})
.then(() => console.log("✅ MongoDB Connected!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  moodHistory: [{ date: Date, moodScore: Number }],
  preferences: {
    musicGenre: String,
    relaxationVideo: String,
  },
  lastMoodUpdate: Date,
});
const User = mongoose.model("User", userSchema);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Chatbot Integration 
app.post("/chat", async (req, res) => {
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

// Spotify API Route
app.post("/get-spotify-data", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    res.status(500).send("Error fetching Spotify data");
  }
});

// YouTube API Route
app.get("/youtube-search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).send("Error fetching YouTube data");
  }
});

// Mood-based Music & Video Recommendations
app.get("/mood-music/:mood", async (req, res) => {
  const { mood } = req.params;
  try {
    const playlistMap = {
      Happy: "37i9dQZF1DXdPec7aLTmlC",
      Neutral: "37i9dQZF1DX4WYpdgoIcn6",
      Stressed: "37i9dQZF1DWZqd5JICZI0u",
      Depressed: "37i9dQZF1DX3YSRoSdA634",
    };
    const playlistId = playlistMap[mood] || "37i9dQZF1DX4WYpdgoIcn6";

    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;
    const spotifyResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const youtubeResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: { part: "snippet", q: `${mood} relaxation video`, key: process.env.YOUTUBE_API_KEY },
    });

    res.status(200).send({ music: spotifyResponse.data, video: youtubeResponse.data.items[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching external APIs");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
