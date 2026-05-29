FROM node:22-alpine AS build
WORKDIR /app

# 1. Accept the arguments from GitHub Actions
ARG VITE_API_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_RAZORPAY_KEY_ID

# 2. Set them into the environment for Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
