FROM node:lts-alpine

WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source
COPY server/ ./

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]