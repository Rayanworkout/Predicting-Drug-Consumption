import os
import subprocess

from flask import Flask, request, jsonify

from dotenv import load_dotenv

load_dotenv()

# Function to verify the signature
# To ensure that the payload was sent from GitHub
from validate_hash import verify_signature

app = Flask(__name__)


@app.route("/build", methods=["POST"])
def build():
    """Endpoint to receive github webhook
    and trigger build process"""

    # Check if branch is main
    # If not, do nothing

    json_body = request.json
    branch = json_body["ref"].split("/")[-1]

    if branch != "main":
        return jsonify({"status": "success", "message": "Not main branch"})

    secret_header = request.headers.get("X-Hub-Signature-256")
    payload = request.data
    secret_key = os.getenv("GITHUB_WEBHOOK_SECRET")

    if verify_signature(
        payload_body=payload,
        signature_header=secret_header,
        secret_token=secret_key,
    ):

        script_path = "../../deploy.sh"

        try:
            subprocess.run([script_path], check=True, shell=True)
            print("Bash script executed successfully")

        except subprocess.CalledProcessError as e:
            print(f"Error executing the bash script: {e}")

        return jsonify({"status": "success", "message": "Build process triggered"})

    else:
        return jsonify({"status": "error", "message": "Invalid signature"})


if __name__ == "__main__":
    app.run(host="0.0.0.0")
