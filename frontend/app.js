// Handle credentials form submission
document.getElementById("credentials-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    document.getElementById("user-name").innerText = name;
    alert("Credentials saved! Welcome, " + name);
});

// Handle quiz form submission
document.getElementById("quiz-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const quizAnswers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        // Add more questions as needed...
    };

    if (!quizAnswers.q1 || !quizAnswers.q2) {
        alert("Please answer all questions.");
        return;
    }

    try {
        // Send to backend (Flask or Express)
        const response = await fetch("http://localhost:5000/analyze-mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizAnswers),
        });

        const data = await response.json();
        const mood = data.mood;

        alert("Your diagnosis: " + mood);

        // Fetch playlist
        const playlist = await getMoodPlaylist(mood);
        console.log("Mood Playlist:", playlist);

        // Optionally update UI with playlist
    } catch (error) {
        console.error("Error analyzing mood:", error);
    }
});

// Recommend services based on mood
function recommendServices(mood) {
    const servicesContainer = document.getElementById("services");
    servicesContainer.innerHTML = ""; // Clear previous content

    if (mood === "Sad") {
        servicesContainer.innerHTML = "<p>Try Breathing Exercises for Stress Relief.</p>";
    } else if (mood === "Anxious") {
        servicesContainer.innerHTML = "<p>Use Affirmations for relaxation.</p>";
    }
}

// YouTube breathing exercise
function getBreathingExercise() {
    const youtubeURL = "https://youtu.be/wfDTp2GogaQ";
    window.open(youtubeURL, "_blank");
}

// Gemini Chatbot Integration
async function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    chatOutput.innerHTML += `<p class='user'><strong>You:</strong> ${userMessage}</p>`;
    inputField.value = "";

    try {
        const response = await fetch("http://localhost:3000/api/chat", { // Use your own backend route
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const botMessage = data.response || "Sorry, I couldn't process that.";
        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> ${botMessage}</p>`;
    } catch (error) {
        console.error("Error connecting to AI:", error);
        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> Error connecting to chatbot.</p>`;
    }
}

// Mocked Spotify API integration
async function getMoodPlaylist(mood) {
    try {
        const playlists = {
            happy: ["Happy Song 1", "Happy Song 2", "Happy Song 3"],
            sad: ["Sad Song 1", "Sad Song 2", "Sad Song 3"],
            anxious: ["Calm Song 1", "Calm Song 2", "Calm Song 3"],
        };

        return playlists[mood.toLowerCase()] || ["Default Song"];
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return [];
    }
}
