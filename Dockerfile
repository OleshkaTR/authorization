# Use Node.js LTS
FROM node:18

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default Next.js port is 3000)
EXPOSE 3000

# Start in production mode
CMD ["npm", "start"]
