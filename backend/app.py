from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
from flask import send_from_directory
app = Flask(__name__)
@app.route('/')
def serve_frontend():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('../frontend', path)

app = Flask(__name__)
CORS(app)

# Load NLP Model
nlp_model = pipeline("sentiment-analysis")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get("q1", "") + " " + data.get("q2", "")
    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    result = nlp_model(text)
    sentiment = result[0]["label"]
    return jsonify({"text_analysis": sentiment})

if __name__ == '__main__':
    app.run(debug=True)

# Function to analyze text
def analyze_text(text):
    try:
        result = nlp_model(text)
        sentiment = result[0]["label"]
        if sentiment == "NEGATIVE":
            return "High Risk"
        elif sentiment == "POSITIVE":
            return "Low Risk"
        else:
            return "Neutral"
    except Exception as e:
        print(f"Error analyzing text: {e}")
        return "Error"

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.form.get("text")

    if not text:
        return jsonify({"error": "No text provided. Please include a 'text' field in your request."}), 400

    text_result = analyze_text(text)

    return jsonify({
        "text_analysis": text_result,
        "mental_health_score": text_result
    })

if __name__ == '__main__':
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")