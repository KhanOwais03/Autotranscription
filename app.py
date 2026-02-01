import os
import whisper
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from huggingface_hub import InferenceClient # Use the client for API calls

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# Add FFmpeg bin folder to the system PATH so Whisper can find it
ffmpeg_path = r"C:\Users\owais\Downloads\owais\ffmpeg-8.0.1-essentials_build\bin"
os.environ["PATH"] += os.pathsep + ffmpeg_path

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 1. Load Whisper Locally (This is fine)
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")

# 2. Use InferenceClient for Hugging Face API (Instead of pipeline)
client = InferenceClient(model="facebook/bart-large-cnn", token=HF_TOKEN)

@app.route("/api/upload-transcribe", methods=["POST"])
def upload_transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        # Transcribe locally
        result = whisper_model.transcribe(filepath)
        return jsonify({"transcript": result["text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/summarise", methods=["POST"])
def summarise():
    data = request.get_json()
    transcript = data.get("transcript")
    
    if not transcript:
        return jsonify({"error": "No transcript provided"}), 400

    try:
        print(f"Sending to HF API: {transcript[:50]}...")
        
        # Use BART for better results; it's more stable on the API than T5
        client = InferenceClient(model="facebook/bart-large-cnn", token=HF_TOKEN)
        
        # We wrap this in a way that handles the "Model Loading" state
        response = client.summarization(transcript[:4000]) 
        
        summary_text = response.summary_text
        print("Success!")
        return jsonify({"summary": summary_text})

    except Exception as e:
        # This prints the REAL error to your terminal window
        print(f"CRITICAL ERROR: {str(e)}") 
        return jsonify({"error": str(e)}), 500.

if __name__ == "__main__":
    app.run(debug=True)