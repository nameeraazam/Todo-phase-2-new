FROM python:3.9-slim

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Install Node.js dependencies
RUN npm install --production

# Expose port (Hugging Face typically uses port 7860)
EXPOSE 7860

# Start the application
CMD ["python", "app.py"]