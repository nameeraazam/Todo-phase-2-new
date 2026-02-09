import subprocess
import threading
import time
import os
from flask import Flask, request, jsonify
import requests
import sys

# Create Flask app
app = Flask(__name__)

# Global variable to store the Express.js server process
express_process = None

def start_express_server():
    """Start the Express.js server in the background"""
    global express_process
    
    # Install Node.js dependencies
    print("Installing Node.js dependencies...")
    result = subprocess.run(["npm", "install"], cwd=".", capture_output=True, text=True)
    if result.returncode != 0:
        print(f"npm install failed: {result.stderr}")
        return
    
    # Determine the port - Hugging Face sets a PORT environment variable
    port = int(os.environ.get('PORT', 3000))
    
    # Create a simple server.js runner
    runner_script = f'''const server = require('./server.js');
const port = {port};
server.listen(port, () => {{
    console.log(`Server running on port ${{port}}`);
}});
'''
    
    with open('runner.js', 'w') as f:
        f.write(runner_script)
    
    # Start the Express.js server
    express_process = subprocess.Popen([
        "node", "runner.js"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    # Wait for the process and handle its output
    stdout, stderr = express_process.communicate()
    print(f"Server stdout: {stdout}")
    print(f"Server stderr: {stderr}")

@app.route('/')
def home():
    return "Todo Backend API is running! Use /api/todos for API endpoints."

# Proxy all API routes to the Express.js server
@app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_api(path):
    # Determine the port where Express.js is running
    express_port = 5000  # Default port from server.js
    
    # Construct the target URL
    target_url = f"http://localhost:{express_port}/api/{path}"
    
    # Forward the request to the Express.js server
    try:
        if request.method == 'GET':
            resp = requests.get(target_url, params=request.args)
        elif request.method == 'POST':
            resp = requests.post(target_url, json=request.get_json())
        elif request.method == 'PUT':
            resp = requests.put(target_url, json=request.get_json())
        elif request.method == 'DELETE':
            resp = requests.delete(target_url)
        
        # Return the response from Express.js
        return resp.content, resp.status_code, dict(resp.headers.items())
    except Exception as e:
        return jsonify({"error": "Backend service unavailable", "details": str(e)}), 503

# Start Express.js server in a background thread when the app starts
def run_express_in_background():
    # Small delay to allow Flask to start
    time.sleep(5)  # Increased delay to ensure Express.js starts
    start_express_server()

if __name__ == "__main__":
    # Start Express.js in a background thread
    express_thread = threading.Thread(target=run_express_in_background, daemon=True)
    express_thread.start()
    
    # Run Flask app on the port specified by Hugging Face
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port, debug=False)