async function sendMessage(userMessage) {
    const chatOutput = document.getElementById("chat-output");
    if (!userMessage) return;

    chatOutput.innerHTML += `<p class='user'><strong>You:</strong> ${userMessage}</p>`;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=AIzaSyBH17s6V26nUnApygAECYeHWIsc7aD2XOM", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: { text: userMessage } })
        });

        const data = await response.json();
        const botMessage = data?.candidates?.[0]?.output || "Sorry, I couldn't process that.";
        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> ${botMessage}</p>`;
    } catch (error) {
        console.error("Error fetching response from Gemini API:", error);
        chatOutput.innerHTML += `<p class='bot'><strong>Totoro:</strong> Error connecting to API.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("chat-input");
    const sendButton = document.querySelector(".send-btn");
    
    sendButton.addEventListener("click", () => {
        sendMessage(inputField.value);
        inputField.value = "";
    });
    
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage(inputField.value);
            inputField.value = "";
        }
    });
});

