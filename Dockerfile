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
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY requirements.txt ./
RUN which python3 && which pip
RUN python3 --version
RUN npm install
RUN pip --no-cache-dir install -r requirements.txt

# Copy rest of the project
COPY . .

# Make the shell script executable
RUN chmod +x start.sh

<<<<<<< HEAD
# Run the shell script to start both Node.js and Python processes
CMD ["./start.sh"]
=======
# Run the bot
CMD node . & python automate.py 

RUN docker ps
# Change to your actual entry file

RUN docker run -d --memory="512m" sha256:09e15e03e3a590c054a46175a065d8bdeac20d24cbd9578fa619544f69db5ae6

>>>>>>> f1ce239ad82fc5330da14913acc718d6e59d1fb2
