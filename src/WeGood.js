// app.js
document.getElementById("credentials-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    document.getElementById("user-name").innerText = name;
    alert("Credentials saved! Welcome, " + name);
});

document.getElementById("quiz-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const quizAnswers = {
        q1: document.querySelector('input[name="q1"]:checked').value,
        // collect all other answers similarly
    };

    // Call OpenAI API for mood analysis
    analyzeMood(quizAnswers);
});

function analyzeMood(answers) {
    // Simulate mood analysis (e.g., Angry, Sad, Happy, Depressed, Anxious)
    let mood = "Happy"; // Example, you will analyze based on answers

    // Display diagnosis
    alert("Your diagnosis: " + mood);
    
    // Recommend services based on mood
    recommendServices(mood);
}

function recommendServices(mood) {
    const servicesContainer = document.getElementById("services");
    if (mood === "Sad") {
        servicesContainer.innerHTML += "<p>We recommend trying Breathing Exercises for Stress Relief.</p>";
    } else if (mood === "Anxious") {
        servicesContainer.innerHTML += "<p>We recommend using Affirmations for relaxation.</p>";
    }
}

function getBreathingExercise() {
    // Fetch a YouTube video based on user mood
    const youtubeURL = "https://www.youtube.com/embed/your-breathing-exercise-video";
    window.open(youtubeURL, "_blank");
}

function sendMessage() {
    const userMessage = document.getElementById("chat-input").value;
    if (userMessage) {
        // Call OpenAI API or a simple response mechanism
        const response = "Totoro: " + "This is a friendly response from Totoro!";
        document.getElementById("chat-output").innerText = response;
    }
}
