"""
Hugging Face Space wrapper for the Todo API backend
This file allows the Express.js backend to run in a Hugging Face Space environment
"""

import subprocess
import threading
import time
import os
from pyngrok import ngrok
import gradio as gr

# Set up the Express.js server
def start_backend():
    # Install dependencies if not already installed
    subprocess.run(["npm", "install"], cwd=".")
    
    # Start the Express.js server
    server_process = subprocess.Popen(["npm", "start"])
    return server_process

# Start the backend server in a separate thread
def run_server():
    server_process = start_backend()
    
    # Keep the process alive
    try:
        server_process.wait()
    except KeyboardInterrupt:
        server_process.terminate()

if __name__ == "__main__":
    # Start the server in a thread
    server_thread = threading.Thread(target=run_server)
    server_thread.start()
    
    # Optionally expose via ngrok for testing
    if os.getenv("USE_NGROK") == "true":
        public_url = ngrok.connect(5000)
        print(f"Public URL: {public_url}")
    
    # Keep the main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Shutting down...")