# 1. Use the official Node.js image as our base operating system
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only package.json first (this makes future builds faster)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your server code into the container
COPY . .

# 6. Expose the port your Express server runs on
EXPOSE 5000

# 7. The command to start the server
CMD ["npm", "start"]
