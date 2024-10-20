# Base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 8000

# Define environment variables
ENV PORT=8000
ENV DATABASE_URL="mongodb://mongo:27017"
ENV database_name="ManufacturingManagmentDb"

# Start the app
CMD ["npm", "start"]
