"""
Hugging Face Space wrapper for the Todo API backend
This file allows the Express.js backend to run in a Hugging Face Space environment
"""

import subprocess
import threading
import time
import os
import logging
from flask import Flask

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a simple Flask app that will proxy to the Express.js server
flask_app = Flask(__name__)

@flask_app.route('/')
def home():
    return "Todo Backend API is running! Use /api/todos for API endpoints."

@flask_app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_api(path):
    """Proxy API requests to the Express.js server"""
    import requests
    
    express_port = os.environ.get('PORT', 5000)
    express_url = f"http://localhost:{express_port}/api/{path}"
    
    # Get the original request data
    import flask
    data = flask.request.get_json() if flask.request.is_json else None
    headers = dict(flask.request.headers)
    
    # Forward the request to the Express.js server
    try:
        if flask.request.method == 'GET':
            resp = requests.get(express_url, headers=headers)
        elif flask.request.method == 'POST':
            resp = requests.post(express_url, json=data, headers=headers)
        elif flask.request.method == 'PUT':
            resp = requests.put(express_url, json=data, headers=headers)
        elif flask.request.method == 'DELETE':
            resp = requests.delete(express_url, headers=headers)
        
        # Return the response from Express.js
        return resp.content, resp.status_code, dict(resp.headers)
    except Exception as e:
        logger.error(f"Error proxying request: {e}")
        return {"error": "Backend service unavailable"}, 503

def start_express_server():
    """Start the Express.js server in a subprocess"""
    # Install dependencies if not already installed
    logger.info("Installing npm dependencies...")
    result = subprocess.run(["npm", "install"], cwd=".", capture_output=True, text=True)
    if result.returncode != 0:
        logger.error(f"npm install failed: {result.stderr}")
        return
    
    logger.info("Starting Express.js server...")
    # Start the Express.js server
    server_process = subprocess.Popen([
        "node", "-e", 
        """
        const app = require('./server.js');
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Express server listening on port \${port}`);
        });
        """
    ])
    
    try:
        server_process.wait()
    except KeyboardInterrupt:
        server_process.terminate()

if __name__ == "__main__":
    # Start the Express.js server in a separate thread
    express_thread = threading.Thread(target=start_express_server, daemon=True)
    express_thread.start()
    
    # Small delay to allow Express server to start
    time.sleep(3)
    
    # Run the Flask app (which will serve as the main entry point for Hugging Face)
    port = int(os.environ.get('PORT', 7860))  # Hugging Face typically uses port 7860
    flask_app.run(host='0.0.0.0', port=port, debug=False)