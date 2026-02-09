FROM python:3.9-slim

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python requirements and install them
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Start the application
CMD ["python", "app.py"]