FROM node:22-alpine AS build
WORKDIR /app

# Accept the argument from GitHub
ARG VITE_API_URL
# Set it into the environment for Vite
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
