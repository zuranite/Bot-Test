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
    librsvg2-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN pip install

# Copy rest of the project
COPY . .

# Optional: expose a port if needed
# EXPOSE 3000

# Run the bot
CMD ["node", "src/index.js"]  # Change to your actual entry file
