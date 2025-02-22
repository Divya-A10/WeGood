rom flask import Flask, request, jsonify
from deepface import DeepFace
from transformers import pipeline
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load NLP Model
nlp_model = pipeline("sentiment-analysis")

# Function to analyze text
def analyze_text(text):
    result = nlp_model(text)
    return result[0]["label"]

# Function to analyze facial expression
def analyze_face(image_path):
    result = DeepFace.analyze(img_path=image_path, actions=['emotion'], enforce_detection=False)
    return result[0]['dominant_emotion']

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.form.get("text")
    image = request.files.get("image")

    response = {"text_analysis": None, "face_analysis": None, "mental_health_score": None}

    if text:
        response["text_analysis"] = analyze_text(text)

    if image:
        image_path = "temp.jpg"
        image.save(image_path)
        response["face_analysis"] = analyze_face(image_path)
        os.remove(image_path)  # Clean up image file

    # Combine results into a basic mental health score
    if response["text_analysis"] == "NEGATIVE" and response["face_analysis"] in ["sad", "angry", "fear"]:
        response["mental_health_score"] = "High Risk"
    else:
        response["mental_health_score"] = "Low Risk"

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
