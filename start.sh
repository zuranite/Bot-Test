#!/bin/bash

# Run the Node.js app in the background
node . &

# Run the Python script in the background
python automate.py &

docker logs sha256:4ec26fed7e444a34edbe5c49ab0f19763a94fe0d90e0e0d6a2a99853ea72b855

# Wait indefinitely (this keeps the container running)
wait
