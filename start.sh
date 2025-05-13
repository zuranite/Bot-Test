#!/bin/bash

# Run the Node.js app in the background
node . &

# Run the Python script in the background
python automate.py &



# Wait indefinitely (this keeps the container running)
wait
