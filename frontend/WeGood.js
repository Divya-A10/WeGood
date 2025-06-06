async function sendMessage(userMessage) {
    const chatOutput = document.getElementById("chat-output");
    if (!userMessage) return;
  
    // Display user message
    chatOutput.innerHTML += `<p class='user'><strong>You:</strong> ${userMessage}</p>`;
  
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      const botMessage = data.response || "Sorry, I couldn't process that.";
  
      // Display bot reply
      chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> ${botMessage}</p>`;
    } catch (error) {
      console.error("Error talking to chatbot backend:", error);
      chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> Error connecting to chatbot.</p>`;
    }
  }
  
  // Bind sendMessage to UI events (button click, enter key)
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("chat-input");
    const sendButton = document.querySelector(".send-btn");
  
    sendButton.addEventListener("click", () => {
      sendMessage(inputField.value);
      inputField.value = "";
    });
  
    inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage(inputField.value);
        inputField.value = "";
      }
    });
  });
  

// Handle credentials form submission
document.getElementById("credentials-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from reloading the page
    const name = document.getElementById("name").value; // Get the name input value
    document.getElementById("user-name").innerText = name; // Display the name in the UI
    alert("Credentials saved! Welcome, " + name); // Show a welcome alert
});
// Handle quiz form submission
document.getElementById("quiz-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form reload

    // Collect quiz answers
    const quizAnswers = {
        q1: document.querySelector('input[name="q1"]:checked').value,
        q2: document.querySelector('input[name="q2"]:checked').value,
        // Collect other answers similarly
    };
    try {
        // Send quiz answers to the backend for mood analysis
        const response = await axios.post('http://localhost:5000/analyze-mood', quizAnswers);

        const mood = response.data.mood; // Extract mood from the response
        alert("Your diagnosis: " + mood); // Display diagnosis

        // Call the Spotify API to get mood-based music recommendations
        getMoodPlaylist(mood).then(playlist => {
            console.log('Mood Playlist:', playlist);
            // Display the playlist in the UI (you can update the UI here)
        }).catch(error => {
            console.error('Error fetching playlist:', error);
        });

    } catch (error) {
        console.error("Error analyzing mood:", error);
    }
});

// Analyze mood based on quiz answers
function analyzeMood(answers) {
    // Simulate mood analysis based on answers
    let mood = "Happy"; // Example, you will analyze based on answers

    // Display diagnosis
    alert("Your diagnosis: " + mood);

    // Recommend services based on mood
    recommendServices(mood);
}

// Recommend services based on mood
function recommendServices(mood) {
    const servicesContainer = document.getElementById("services");
    if (mood === "Sad") {
        servicesContainer.innerHTML += "<p>We recommend trying Breathing Exercises for Stress Relief.</p>";
    } else if (mood === "Anxious") {
        servicesContainer.innerHTML += "<p>We recommend using Affirmations for relaxation.</p>";
    }
}

// Fetch a YouTube video for breathing exercises
function getBreathingExercise() {
    const youtubeURL = "https://www.youtube.com/embed/your-breathing-exercise-video";
    window.open(youtubeURL, "_blank");
}

// Send a message using Gemini API (Chatbot functionality)
async function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    chatOutput.innerHTML += `<p class='user'><strong>You:</strong> ${userMessage}</p>`;
    inputField.value = "";

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=YOUR_GEMINI_API_KEY", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: { text: userMessage } })
        });

        const data = await response.json();
        const botMessage = data.candidates?.[0]?.output || "Sorry, I couldn't process that.";

        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> ${botMessage}</p>`;
    } catch (error) {
        console.error("Error connecting to Gemini API:", error);
        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> Error connecting to AI.</p>`;
    }
}

// Spotify API integration (example of how you might use it)
async function getMoodPlaylist(mood) {
    try {
        const response = await fetch(`/api/spotify/mood-music/${mood}`);
        if (!response.ok) {
            throw new Error(`Error fetching playlist: ${response.statusText}`);
        }
        const data = await response.json();
        return data.playlists; // Expect an array of playlists
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return [];
    }
}