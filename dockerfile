# Use Node.js base image
FROM node:16

# Copy .env file
COPY .env .env

# Install Python
RUN apt-get update && apt-get install -y python3

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend code
COPY . .

# Expose backend port (make sure this matches your backend app port)
EXPOSE 4000

# Start backend server
CMD ["npm", "start"]
