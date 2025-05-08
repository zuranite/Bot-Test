# Use Node.js 20 base image
FROM node:20

# Install required system packages for node-canvas
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    python3-setuptools \
    python3-dev \
    python3-pip \
    python3-venv \
    librsvg2-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Virtual ENV
RUN python3 - venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY requirements.txt ./
RUN which python3 && which pip
RUN npm install
RUN pip install -r requirements.txt

# Copy rest of the project
COPY . .

# Optional: expose a port if needed
EXPOSE 3000

# Run the bot
CMD node . && python automate.py # Change to your actual entry file
