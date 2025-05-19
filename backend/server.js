require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const chatbotRoutes = require("./routes/chatbot");
const spotifyRoutes = require("./routes/spotify");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));
app.use(express.static(__dirname));

// Routes
// Make sure chatbotRoutes and spotifyRoutes are express.Router instances
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/spotify", spotifyRoutes);

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "WeGood.html"));
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mentalhealtDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
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

// Fallback route for undefined API routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
